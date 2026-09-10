export function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  console.error(error);
  if (error.code === 11000) return res.status(409).json({ message: "A record with that value already exists" });
  if (error.name === "ValidationError") return res.status(422).json({ message: error.message });
  res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
  });
}
