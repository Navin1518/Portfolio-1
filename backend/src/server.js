import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number(process.env.PORT || 5000);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required. Copy .env.example to .env and configure it.");
}

try {
  await connectDatabase();
  app.listen(port, () => console.log(`CampusConnect API listening on http://localhost:${port}`));
} catch (error) {
  console.error("Unable to start API", error);
  process.exitCode = 1;
}
