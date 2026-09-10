import { Router } from "express";
import { param } from "express-validator";
import Message from "../models/Message.js";
import Request from "../models/Request.js";
import { requireAuth } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = Router();
router.use(requireAuth);

function canView(request, user) {
  if (user.role === "admin") return true;
  const assignedId = request.assignedTo?._id || request.assignedTo;
  if (assignedId?.toString() === user._id.toString()) return true;
  if (user.role === "library") return request.category === "library";
  return Boolean(user.role === "authority" && user.department && request.department === user.department);
}

router.get("/request/:requestId", param("requestId").isMongoId(), handleValidation, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (req.user.role === "student" && request.submittedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only view your own request messages" });
    }
    if (req.user.role !== "student" && !canView(request, req.user)) {
      return res.status(403).json({ message: "This request is outside your assigned visibility" });
    }
    const messages = await Message.find({ request: request._id }).populate("sender", "name role").sort({ createdAt: 1 });
    res.json({ messages });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/read", param("id").isMongoId(), handleValidation, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { $addToSet: { readBy: req.user._id } }, { new: true });
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message });
  } catch (error) {
    next(error);
  }
});

export default router;
