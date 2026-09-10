import mongoose from "mongoose";

const authTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    purpose: { type: String, enum: ["password_reset", "email_verification"], required: true },
    tokenHash: { type: String, required: true, unique: true, select: false },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    usedAt: Date
  },
  { timestamps: true }
);

authTokenSchema.index({ user: 1, purpose: 1, createdAt: -1 });

export default mongoose.model("AuthToken", authTokenSchema);
