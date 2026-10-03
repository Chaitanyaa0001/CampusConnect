import { Router } from "express";
import getAllLostAndFoundRoute from "./getAllLostAndFound.route.js";
import getLostAndFoundByMeRoute from "./getLostAndFoundbyMe.route.js";
import postLostAndFoundRoute from "./postLostAndFound.route.js";
import getLostAndFoundByIDRoute from "./getLostAndFoundByID.route.js";


const router = Router();

router.use(getAllLostAndFoundRoute);
router.use(getLostAndFoundByMeRoute);
router.use(postLostAndFoundRoute);
router.use(getLostAndFoundByIDRoute);


export default router;