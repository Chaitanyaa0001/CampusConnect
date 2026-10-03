import { Express, Router } from "express";
import { signupController } from "../controllers/Signup.controller";

const router  = Router();
router.post("/signup", signupController);
export default router;


