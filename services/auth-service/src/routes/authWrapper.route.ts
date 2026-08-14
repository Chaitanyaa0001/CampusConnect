import { Router } from "express";

import signupRoute from "./signup.route";
import signinRoute from "./signin.route";
import logoutRoute from "./logout.route";
import refreshRoute from "./refresh.route";
import { verifyEmailController } from "../controllers/verifyEmail.controller";

const router = Router();

router.use(signupRoute);
router.use(signinRoute);
router.use(logoutRoute);
router.use(refreshRoute);
router.get("/verify-email", verifyEmailController);

export default router;