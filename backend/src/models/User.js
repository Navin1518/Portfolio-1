import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["student", "authority", "library", "admin"],
      default: "student"
    },
    studentId: { type: String, trim: true, maxlength: 30 },
    department: { type: String, trim: true, maxlength: 100 },
    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    studentId: this.studentId,
    department: this.department,
    emailVerified: this.emailVerified
  };
};

userSchema.index({ studentId: 1 }, { unique: true, sparse: true });

export default mongoose.model("User", userSchema);
