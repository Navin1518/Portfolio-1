import crypto from "node:crypto";
import AuthToken from "../models/AuthToken.js";

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function issueAuthToken(user, purpose, lifetimeMs) {
  const token = crypto.randomBytes(32).toString("hex");
  await AuthToken.deleteMany({ user: user._id, purpose, usedAt: { $exists: false } });
  await AuthToken.create({
    user: user._id,
    purpose,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + lifetimeMs)
  });
  return token;
}
