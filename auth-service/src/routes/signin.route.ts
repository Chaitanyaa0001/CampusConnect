import { Router } from "express";
import { signinController } from "../controllers/SignIn.controller";
import { signinSchema, validateSchema } from "../validator/auth.vaidator";
import { authLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/signin", authLimiter, validateSchema(signinSchema), signinController);

export default router;