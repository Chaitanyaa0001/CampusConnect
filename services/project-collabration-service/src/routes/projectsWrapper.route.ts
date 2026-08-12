import { Router } from "express";

import bookCarpoolroute from "./bookCarpool.route";
import getCarpoolroute from "./getAllCarpools.route";
import getCarpoolByMeRoute from "./getCarpoolbyID.route";
import createCarpoolroute from "./postCarpool.route";


const router = Router();

router.use(getCarpoolroute);
router.use(getCarpoolByMeRoute);
router.use(bookCarpoolroute);
router.use(createCarpoolroute);


export default router;