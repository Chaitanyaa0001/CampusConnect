import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { CreateItemInput } from "../validator/validator.js";
import { createItemService } from "../services/postLostAndFound.service.js";

// userId comes from the verified token, never from the body.
export const createItemController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const item = await createItemService(getValid<CreateItemInput>(res, "body"), userId, req.file);
  return res.status(201).json({ success: true, message: "Item posted successfully", data: item });
});