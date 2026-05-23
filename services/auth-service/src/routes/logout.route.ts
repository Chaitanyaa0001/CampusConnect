import { Express,Router } from "express";
import { signupController } from "../controllers/Signup.controller";


const router =  Router();
router.post("/logout", signupController);

export default router;