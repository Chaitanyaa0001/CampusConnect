import { Express, Router } from "express";
import { signupController } from "../controllers/Signup.controller";
import { signupSchema } from "../validator/auth.vaidator";
import { authLimiter } from "../middleware/rateLimit";
import { validateSchema} from "..//validator/auth.vaidator";

const router  = Router();
router.post("/signup", authLimiter, validateSchema(signupSchema), signupController);
export default router;
    

