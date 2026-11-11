import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { IdParam } from "../validator/validator.js";
import { getRideByIdService } from "../services/getRidebyId.service.js";

export const getRideByIdController = catchAsync(async (_req: Request, res: Response) => {
  const { id } = getValid<IdParam>(res, "params");
  const ride = await getRideByIdService(id);
  return res.status(200).json({ success: true, data: ride });
});