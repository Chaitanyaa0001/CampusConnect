import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { ListRidesQuery } from "../validator/validator.js";
import { listRidesService } from "../services/listrides.service.js";

export const listRidesController = catchAsync(async (_req: Request, res: Response) => {
  const result = await listRidesService(getValid<ListRidesQuery>(res, "query"));
  return res.status(200).json({ success: true, data: result });
});