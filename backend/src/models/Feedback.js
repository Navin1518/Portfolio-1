import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 2000 }
  },
  { timestamps: true }
);

feedbackSchema.index({ request: 1, submittedBy: 1 }, { unique: true });

export default mongoose.model("Feedback", feedbackSchema);
