import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { IdParam } from "../validator/validator.js";
import { getItemByIdService } from "../services/getLostAndFoundbyId.service.js";

export const getItemByIdController = catchAsync(async (_req: Request, res: Response) => {
  const { id } = getValid<IdParam>(res, "params");
  const item = await getItemByIdService(id);
  return res.status(200).json({ success: true, data: item });
});