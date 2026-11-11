import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { MyRidesQuery } from "../validator/validator.js";
import { getMyRidesService } from "../services/getRidebyme.service.js";

// userId comes from the verified token, so a user can only ever list their own rides.
export const getMyRidesController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const result = await getMyRidesService(userId, getValid<MyRidesQuery>(res, "query"));
  return res.status(200).json({ success: true, data: result.items, nextCursor: result.nextCursor });
});