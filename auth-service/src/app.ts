import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authWrapper.route";
import jwksRoutes from "./routes/jwks.route";
import { env } from "./config/env.config";
import {globalErrorHandler} from "./error/errorHandler";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/api/v1/health", (_req, res) => res.status(200).json({ status: "ok" })); // was "/api/v1/health`" (stray backtick)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jwks", jwksRoutes);

app.use((_req, res) => res.status(404).json({ success: false, message: "Not found" }));
app.use(globalErrorHandler); // must be LAST

export default app;