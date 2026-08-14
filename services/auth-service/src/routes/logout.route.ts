import { Express,Router } from "express";
import { logoutController } from "../controllers/logout.controller";


const router =  Router();
router.post("/logout", logoutController);

export default router;