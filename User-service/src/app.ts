import express from "express";
import cors from "cors";
import helmet from "helmet";
import "auth-sdk"; 
import { env } from "./config/env.config.js";
import profileRoute from "./routes/profile.route.js";
import { prisma } from "./lib/prisma.js";
import { globalErrorHandler } from "./error/errorHandler.js";

const app: express.Application = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL })); // Bearer tokens, no cookies, so no `credentials`
app.use(express.json({ limit: "10kb" }));

// liveness: the process is up
app.get("/api/v1/health", (_req, res) => res.status(200).json({ status: "ok" }));
// readiness: the database answers (use this one for ECS / load balancer checks)
app.get("/api/v1/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ status: "ready" });
  } catch {
    return res.status(503).json({ status: "not ready" });
  }
});

// was /api/profile: now consistent with the auth service (/api/v1/...). Update nginx and the client.
app.use("/api/v1/profile", profileRoute);

app.use((_req, res) => res.status(404).json({ success: false, message: "Not found" }));
app.use(globalErrorHandler); // must be LAST

export default app;