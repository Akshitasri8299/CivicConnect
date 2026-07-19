import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

// Fail fast with a clear message if critical env vars are missing,
// rather than crashing later with a confusing error.
const requiredEnvVars = ["JWT_SECRET", "MONGO_URI"];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error(
    `Startup failed: missing required environment variable(s): ${missingVars.join(", ")}.\n` +
      `Copy .env.example to .env and fill these in before starting the server.`
  );
  process.exit(1);
}

const app = express();

// CLIENT_ORIGIN defaults to Vite's default dev port so the app works out of the box.
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);
// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler as a final safety net so unexpected errors
// never crash the process or leak a raw stack trace to the client.
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "An unexpected server error occurred" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CivicConnect backend running on http://localhost:${PORT}`);
  });
});
