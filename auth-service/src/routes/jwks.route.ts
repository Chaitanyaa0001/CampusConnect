import { Router } from "express";
import { getJWKS } from "../controllers/jwks.controller";
import { JWKS } from "../config/jwks";

const router = Router();

router.get("/", (_req, res) => {
  res.set("Cache-Control", "public, max-age=3600");
  res.json(JWKS);
});

export default router;