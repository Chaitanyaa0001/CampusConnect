import { Express,Router } from "express";

import { resendSchema ,validateSchema } from "../validator/auth.vaidator";
import { authLimiter } from "../middleware/rateLimit";
import { resendVerificationController } from "../controllers/resendVerification.controller";
const router =  Router();

router.post("/resend-verification", authLimiter,validateSchema(resendSchema), resendVerificationController);

export default router;