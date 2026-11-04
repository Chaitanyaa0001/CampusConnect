import { Express, Router } from "express";
import { verifyEmailController } from "../controllers/verifyEmail.controller";

const router  = Router();
router.get("/verify-email", verifyEmailController);
 

export default router;