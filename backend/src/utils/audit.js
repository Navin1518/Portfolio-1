import AuditLog from "../models/AuditLog.js";

export function writeAudit(req, details) {
  return AuditLog.create({ ...details, actor: req.user?._id, ipAddress: req.ip }).catch((error) => {
    console.error("Unable to write audit log", error);
  });
}
