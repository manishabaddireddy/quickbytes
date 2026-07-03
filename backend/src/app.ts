import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

// CORS — reads from .env so it works in both dev and production
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

// Global error handler — prevents stack traces leaking in production
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;