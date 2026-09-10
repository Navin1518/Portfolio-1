import { Router } from "express";
import { body, param } from "express-validator";
import Feedback from "../models/Feedback.js";
import Request from "../models/Request.js";
import { requireAuth } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = Router();
router.use(requireAuth);

router.post(
  "/:requestId",
  [param("requestId").isMongoId(), body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"), body("comment").optional().trim().isLength({ max: 2000 })],
  handleValidation,
  async (req, res, next) => {
    try {
      const request = await Request.findById(req.params.requestId);
      if (!request) return res.status(404).json({ message: "Request not found" });
      if (request.submittedBy.toString() !== req.user._id.toString() || request.status !== "resolved") {
        return res.status(403).json({ message: "Feedback is available after your request is resolved" });
      }
      const feedback = await Feedback.create({ request: request._id, submittedBy: req.user._id, rating: req.body.rating, comment: req.body.comment });
      res.status(201).json({ feedback });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/request/:requestId", param("requestId").isMongoId(), handleValidation, async (req, res, next) => {
  try {
    const feedback = await Feedback.findOne({ request: req.params.requestId, submittedBy: req.user._id });
    res.json({ feedback });
  } catch (error) {
    next(error);
  }
});

export default router;
