import { Express, Router } from "express";
import {refreshTokenController} from "../controllers/refreshToken.controller";
import { refreshLimiter } from "../middleware/rateLimit";

const router  = Router();

router.post("/refresh", refreshLimiter, refreshTokenController);

export default router;
