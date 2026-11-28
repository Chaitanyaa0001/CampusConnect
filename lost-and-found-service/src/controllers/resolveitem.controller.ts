import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { IdParam } from "../validator/validator.js";
import { resolveItemService } from "../services/resolveitem.service.js";

export const resolveItemController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const { id } = getValid<IdParam>(res, "params");
  const item = await resolveItemService(id, userId);
  return res.status(200).json({ success: true, message: "Item marked as resolved", data: item });
});