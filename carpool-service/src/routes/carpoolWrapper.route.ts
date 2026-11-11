import { Router } from "express";
import { authenticate } from "auth-sdk";
import {createRideSchema,idParamSchema,listRidesQuerySchema,myRidesQuerySchema,validate,} from "../validator/validator.js";
import { createRideLimiter } from "../middleware/ratelimit.js";
import { createRideController } from "../controllers/createRide.controller.js";
import { listRidesController } from "../controllers/getAllrides.controller.js";
import { getMyRidesController } from "../controllers/getCarpool.me.controller.js";
import { getRideByIdController } from "../controllers/getCarpoolbyId.controller.js";
import { deleteRideController } from "../controllers/deleteRide.controller.js";

const router = Router();

router.use(authenticate); // every carpool route needs a logged-in user

router.post("/", createRideLimiter, validate(createRideSchema, "body"), createRideController);
router.get("/", validate(listRidesQuerySchema, "query"), listRidesController);

// "/me" MUST stay above "/:id", otherwise "me" would be read as a ride id
router.get("/me", validate(myRidesQuerySchema, "query"), getMyRidesController);

router.get("/:id", validate(idParamSchema, "params"), getRideByIdController);
router.delete("/:id", validate(idParamSchema, "params"), deleteRideController);

export default router;