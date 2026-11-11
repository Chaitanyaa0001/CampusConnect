import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { IdParam } from "../validator/validator.js";
import { deleteRideService } from "../services/deleteRide.service.js";

// the owner check happens in the service, using the userId from the token.
export const deleteRideController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const { id } = getValid<IdParam>(res, "params");
  await deleteRideService(id, userId);
  return res.status(200).json({ success: true, message: "Ride deleted" });
});