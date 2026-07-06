import { Router } from "express";

import getCarpoolroute from "./getAllCarpools.route";
import createCarpoolroute from "./postCarpool.route";


const router = Router();

router.use(getCarpoolroute);
router.use(createCarpoolroute);


export default router;