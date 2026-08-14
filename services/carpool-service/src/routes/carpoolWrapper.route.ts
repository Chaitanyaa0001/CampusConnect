import { Router } from "express";

import getCarpoolroute from "./getAllCarpools.route.js";
import getCarpoolByMeRoute from "./getCarpoolbyMe.route.js";
import createCarpoolroute from "./postCarpool.route.js";
import getCarpoolByIDRoute from "./getCarpoolByID.route.js";   


const router = Router();

router.use(getCarpoolroute);
router.use(getCarpoolByMeRoute);
router.use(createCarpoolroute);
router.use(getCarpoolByIDRoute);


export default router;