import { Router } from "express";

import signupRoute from "./signup.route";
import signinRoute from "./signin.route";
import logoutRoute from "./logout.route";
import refreshRoute from "./refresh.route";
import verifyEmailRoute from "./verifyEmailController.route";
import resendVerificationRoute from "./resend-verification.route";

const router = Router();

router.use(signupRoute);
router.use(signinRoute);
router.use(logoutRoute);
router.use(refreshRoute);
router.use(verifyEmailRoute);
router.use(resendVerificationRoute);

export default router;