import { Express,Router } from "express";
import { signinController } from "../controllers/SignIn.controller";

const router =  Router();
router.post("/signin", signinController);

export default router;