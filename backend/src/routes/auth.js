import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import User from "../models/User.js";
import AuthToken from "../models/AuthToken.js";
import { requireAuth } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";
import { writeAudit } from "../utils/audit.js";
import { hashToken, issueAuthToken } from "../utils/authTokens.js";

const router = Router();
const passwordRules = body("password").isLength({ min: 8, max: 128 }).withMessage("Password must be 8-128 characters");
const registrationCredentials = [
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  passwordRules,
  body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),
  body("privacyConsent").isBoolean().toBoolean().equals("true").withMessage("Privacy consent is required")
];
const loginCredentials = [
  body("identifier").optional().trim().isLength({ min: 2, max: 120 }),
  body("email").optional().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body().custom((_, { req }) => Boolean(req.body.identifier || req.body.email)).withMessage("Email or student ID is required"),
  passwordRules
];

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

function setSession(res, user) {
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
  res.cookie("campusconnect_token", token, cookieOptions());
}

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters"),
    ...registrationCredentials,
    body("studentId").trim().isLength({ min: 2, max: 30 }).withMessage("Student ID is required"),
    body("department").optional().trim().isLength({ max: 100 })
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const exists = await User.exists({ $or: [{ email: req.body.email }, { studentId: req.body.studentId }] });
      if (exists) return res.status(409).json({ message: "An account with that email already exists" });
      const passwordHash = await bcrypt.hash(req.body.password, 12);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash,
        studentId: req.body.studentId,
        department: req.body.department
      });
      const verificationToken = await issueAuthToken(user, "email_verification", 24 * 60 * 60 * 1000);
      setSession(res, user);
      await writeAudit(req, { action: "register", entity: "User", entityId: user._id });
      res.status(201).json({
        user: user.toSafeObject(),
        ...(process.env.NODE_ENV === "production" ? {} : { verificationToken })
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginCredentials, handleValidation, async (req, res, next) => {
  try {
    const identifier = (req.body.identifier || req.body.email || "").trim();
    const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { studentId: identifier }] }).select("+passwordHash");
    const valid = user && user.isActive && (await bcrypt.compare(req.body.password, user.passwordHash));
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });
    setSession(res, user);
    await writeAudit(req, { action: "login", entity: "User", entityId: user._id });
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("A valid email is required").normalizeEmail()],
  handleValidation,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email, isActive: true });
      const response = { message: "If an account exists, password reset instructions are available." };
      if (user && process.env.NODE_ENV !== "production") {
        response.resetToken = await issueAuthToken(user, "password_reset", 60 * 60 * 1000);
      } else if (user) {
        await issueAuthToken(user, "password_reset", 60 * 60 * 1000);
      }
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/reset-password",
  [
    body("token").trim().isLength({ min: 32, max: 128 }),
    passwordRules,
    body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match")
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const authToken = await AuthToken.findOne({
        purpose: "password_reset",
        tokenHash: hashToken(req.body.token),
        usedAt: { $exists: false },
        expiresAt: { $gt: new Date() }
      }).select("+tokenHash");
      if (!authToken) return res.status(400).json({ message: "Reset token is invalid or expired" });
      const user = await User.findById(authToken.user).select("+passwordHash");
      if (!user) return res.status(400).json({ message: "Reset token is invalid or expired" });
      user.passwordHash = await bcrypt.hash(req.body.password, 12);
      await user.save();
      authToken.usedAt = new Date();
      await authToken.save();
      res.json({ message: "Password reset successfully. You can now sign in." });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/verify-email", [body("token").trim().isLength({ min: 32, max: 128 })], handleValidation, async (req, res, next) => {
  try {
    const authToken = await AuthToken.findOne({
      purpose: "email_verification",
      tokenHash: hashToken(req.body.token),
      usedAt: { $exists: false },
      expiresAt: { $gt: new Date() }
    }).select("+tokenHash");
    if (!authToken) return res.status(400).json({ message: "Verification token is invalid or expired" });
    await User.findByIdAndUpdate(authToken.user, { emailVerified: true });
    authToken.usedAt = new Date();
    await authToken.save();
    res.json({ message: "Email verified successfully." });
  } catch (error) {
    next(error);
  }
});

router.post("/resend-verification", [body("email").isEmail().normalizeEmail()], handleValidation, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email, isActive: true });
    const response = { message: "If the account needs verification, a verification token is available." };
    if (user && !user.emailVerified && process.env.NODE_ENV !== "production") {
      response.verificationToken = await issueAuthToken(user, "email_verification", 24 * 60 * 60 * 1000);
    } else if (user && !user.emailVerified) {
      await issueAuthToken(user, "email_verification", 24 * 60 * 60 * 1000);
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("campusconnect_token", cookieOptions());
  res.status(204).send();
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user.toSafeObject() });
});

export default router;
