import { Router } from "express";

import getProjectroute from "./getAllProjects.route.js";
import getProjectByMeRoute from "./getProjectsbyMe.route.js";
import createProjectroute from "./postProjects.route.js";
import getProjectByIDRoute from "./getProjectsByID.route.js";   


const router = Router();

router.use(getProjectroute);
router.use(getProjectByMeRoute);
router.use(createProjectroute);
router.use(getProjectByIDRoute);


export default router;