import { Router } from "express";
import { body, param, query } from "express-validator";
import Request, { REQUEST_PRIORITIES, REQUEST_STATUSES } from "../models/Request.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";
import { createNotification } from "../utils/notifications.js";
import { writeAudit } from "../utils/audit.js";

const router = Router();
const id = param("id").isMongoId().withMessage("Invalid request id");
const staff = ["authority", "library", "admin"];

function staffVisibilityFilter(user) {
  if (user.role === "admin") return {};
  if (user.role === "library") {
    return { $or: [{ assignedTo: user._id }, { category: "library" }] };
  }
  const filters = [{ assignedTo: user._id }];
  if (user.department) filters.push({ department: user.department });
  return { $or: filters };
}

function canStaffAccess(request, user) {
  if (user.role === "admin") return true;
  const assignedId = request.assignedTo?._id || request.assignedTo;
  if (assignedId?.toString() === user._id.toString()) return true;
  if (user.role === "library") return request.category === "library";
  return Boolean(user.department && request.department === user.department);
}

function safeRequest(request, user) {
  const result = request.toObject ? request.toObject() : { ...request };
  if (result.anonymous && user.role !== "student") {
    result.submittedBy = null;
    result.student = null;
  }
  return result;
}

router.use(requireAuth);

router.get("/", [query("status").optional().isIn(REQUEST_STATUSES)], handleValidation, async (req, res, next) => {
  try {
    const filter = req.user.role === "student" ? { $or: [{ submittedBy: req.user._id }, { student: req.user._id }] } : staffVisibilityFilter(req.user);
    if (req.query.status) filter.status = req.query.status;
    const requests = await Request.find(filter)
      .populate("submittedBy", "name email role")
      .populate("student", "name email role studentId department")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });
    res.json({ requests: requests.map((request) => safeRequest(request, req.user)) });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  [
    body("type").optional().isIn(["complaint", "suggestion"]),
    body("title").trim().isLength({ min: 3, max: 160 }).withMessage("Title must be 3-160 characters"),
    body("description").trim().isLength({ min: 10, max: 5000 }).withMessage("Description must be 10-5000 characters"),
    body("category").optional().isIn(["complaint", "suggestion", "library", "facility", "academic", "other"]),
    body("location").optional().trim().isLength({ max: 160 }),
    body("anonymous").optional().isBoolean().toBoolean(),
    body("priority").optional().isIn(REQUEST_PRIORITIES)
  ],
  handleValidation,
  allowRoles("student"),
  async (req, res, next) => {
    try {
      const request = await Request.create({
        ...req.body,
        submittedBy: req.user._id,
        student: req.user._id,
        department: req.user.department
      });
      await writeAudit(req, { action: "create", entity: "Request", entityId: request._id });
      res.status(201).json({ request });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", id, handleValidation, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("submittedBy", "name email role")
      .populate("student", "name email role studentId department")
      .populate("assignedTo", "name email role");
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (req.user.role === "student" && request.submittedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only view your own requests" });
    }
    if (req.user.role !== "student" && !canStaffAccess(request, req.user)) {
      return res.status(403).json({ message: "This request is outside your assigned visibility" });
    }
    const messages = await Message.find({ request: request._id }).populate("sender", "name role").sort({ createdAt: 1 });
    res.json({ request: safeRequest(request, req.user), messages });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  [id, body("status").optional().isIn(REQUEST_STATUSES), body("priority").optional().isIn(REQUEST_PRIORITIES), body("resolution").optional().trim().isLength({ max: 3000 }), body("resolutionNote").optional().trim().isLength({ max: 3000 }), body("assignedTo").optional().isMongoId()],
  handleValidation,
  allowRoles(...staff),
  async (req, res, next) => {
    try {
      const request = await Request.findById(req.params.id);
      if (!request) return res.status(404).json({ message: "Request not found" });
      if (!canStaffAccess(request, req.user)) return res.status(403).json({ message: "This request is outside your assigned visibility" });
      const updates = {};
      for (const key of ["status", "priority", "resolution", "resolutionNote", "assignedTo"]) if (req.body[key] !== undefined) updates[key] = req.body[key];
      if (updates.resolution && !updates.resolutionNote) updates.resolutionNote = updates.resolution;
      if (updates.resolutionNote && !updates.resolution) updates.resolution = updates.resolutionNote;
      if (updates.assignedTo) {
        const assignee = await User.findOne({ _id: updates.assignedTo, role: { $in: staff }, isActive: true });
        if (!assignee) return res.status(422).json({ message: "assignedTo must be an active authority, library user, or admin" });
      }
      if (updates.status === "resolved") updates.resolvedAt = new Date();
      Object.assign(request, updates);
      await request.save();
      await createNotification({
        recipient: request.submittedBy,
        type: "request",
        title: "Request updated",
        body: `Your request is now ${request.status.replace("_", " ")}.`,
        request: request._id
      });
      if (updates.assignedTo) {
        await createNotification({
          recipient: updates.assignedTo,
          type: "request",
          title: "Request assigned to you",
          body: `Ticket ${request.ticketNumber} is ready for review.`,
          request: request._id
        });
      }
      await writeAudit(req, { action: "update", entity: "Request", entityId: request._id, metadata: updates });
      res.json({ request: safeRequest(request, req.user) });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/messages", [id, body("body").trim().isLength({ min: 1, max: 3000 }).withMessage("Message cannot be empty")], handleValidation, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    const isOwner = request.submittedBy.toString() === req.user._id.toString();
    if (req.user.role === "student" && !isOwner) return res.status(403).json({ message: "You can only message your own requests" });
    if (req.user.role !== "student" && !canStaffAccess(request, req.user)) return res.status(403).json({ message: "This request is outside your assigned visibility" });
    const message = await Message.create({ request: request._id, sender: req.user._id, body: req.body.body });
    const recipient = isOwner ? request.assignedTo : request.submittedBy;
    if (recipient) await createNotification({ recipient, type: "message", title: "New request message", body: "A new message was added to your request.", request: request._id });
    res.status(201).json({ message: await message.populate("sender", "name role") });
  } catch (error) {
    next(error);
  }
});

export default router;
