import { Express, Router } from "express";
import {refreshTokenController} from "../controllers/refreshToken.controller";

const router  = Router();

router.post("/refresh", refreshTokenController);

export default router;
