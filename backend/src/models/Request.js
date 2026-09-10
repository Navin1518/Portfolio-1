import mongoose from "mongoose";

export const REQUEST_STATUSES = ["submitted", "under_review", "in_progress", "resolved", "rejected"];
export const REQUEST_PRIORITIES = ["low", "medium", "high", "urgent"];

const requestSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, unique: true, sparse: true, index: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    type: { type: String, enum: ["complaint", "suggestion"], default: "complaint" },
    category: {
      type: String,
      enum: ["complaint", "suggestion", "library", "facility", "academic", "other"],
      default: "complaint"
    },
    location: { type: String, trim: true, maxlength: 160 },
    anonymous: { type: Boolean, default: false },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: String, trim: true, maxlength: 100 },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: REQUEST_STATUSES, default: "submitted" },
    priority: { type: String, enum: REQUEST_PRIORITIES, default: "medium" },
    resolution: { type: String, trim: true, maxlength: 3000 },
    resolutionNote: { type: String, trim: true, maxlength: 3000 },
    resolvedAt: Date
  },
  { timestamps: true }
);

requestSchema.pre("validate", function addCompatibleFields(next) {
  if (!this.ticketNumber) {
    const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    this.ticketNumber = `CC-${date}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }
  if (!this.type) this.type = this.category === "suggestion" ? "suggestion" : "complaint";
  if (this.type === "suggestion" && (!this.category || this.category === "complaint")) this.category = "suggestion";
  if (!this.student) this.student = this.submittedBy;
  if (!this.resolution && this.resolutionNote) this.resolution = this.resolutionNote;
  if (!this.resolutionNote && this.resolution) this.resolutionNote = this.resolution;
  next();
});

requestSchema.index({ submittedBy: 1, createdAt: -1 });
requestSchema.index({ status: 1, category: 1, createdAt: -1 });

export default mongoose.model("Request", requestSchema);
