import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { CreateRideInput } from "../validator/validator.js";
import { createRideService } from "../services/postRide.service.js";

// userId comes from the verified token, never from the body.
export const createRideController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const ride = await createRideService(getValid<CreateRideInput>(res, "body"), userId);
  return res.status(201).json({ success: true, message: "Ride created successfully", data: ride });
});