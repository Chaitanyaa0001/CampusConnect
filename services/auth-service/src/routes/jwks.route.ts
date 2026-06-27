import { Router } from "express";
import { getJWKS } from "../controllers/jwks.controller";

const router = Router();

router.get("/", getJWKS);

export default router;