import { Router } from "express";
import { body, param, query } from "express-validator";
import User from "../models/User.js";
import Request from "../models/Request.js";
import AuditLog from "../models/AuditLog.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";
import { writeAudit } from "../utils/audit.js";

const router = Router();
router.use(requireAuth, allowRoles("admin"));

router.get("/stats", async (req, res, next) => {
  try {
    const [users, requests, openRequests, resolvedRequests] = await Promise.all([
      User.countDocuments(),
      Request.countDocuments(),
      Request.countDocuments({ status: { $nin: ["resolved", "rejected"] } }),
      Request.countDocuments({ status: "resolved" })
    ]);
    res.json({ stats: { users, requests, openRequests, resolvedRequests } });
  } catch (error) {
    next(error);
  }
});

router.get("/users", [query("role").optional().isIn(["student", "authority", "library", "admin"])], handleValidation, async (req, res, next) => {
  try {
    const users = await User.find(req.query.role ? { role: req.query.role } : {}).select("name email role studentId department isActive createdAt").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id/status", [param("id").isMongoId(), body("isActive").isBoolean().toBoolean()], handleValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.equals(req.user._id)) return res.status(400).json({ message: "You cannot deactivate your own account" });
    user.isActive = Boolean(req.body.isActive);
    await user.save();
    await writeAudit(req, { action: "change_status", entity: "User", entityId: user._id, metadata: { isActive: user.isActive } });
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id/role", [param("id").isMongoId(), body("role").isIn(["student", "authority", "library", "admin"])], handleValidation, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = req.body.role;
    await user.save();
    await writeAudit(req, { action: "change_role", entity: "User", entityId: user._id, metadata: { role: user.role } });
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
});

router.get("/audit-logs", async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate("actor", "name email role").sort({ createdAt: -1 }).limit(100);
    res.json({ logs });
  } catch (error) {
    next(error);
  }
});

export default router;
