import { Request, Response } from "express";
import { requireUser } from "auth-sdk";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { MyItemsQuery } from "../validator/validator.js";
import { getMyItemsService } from "../services/getLostAndFoundbyme.service.js";

// userId comes from the verified token, so a user can only ever list their own posts.
export const getMyItemsController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = requireUser(req);
  const result = await getMyItemsService(userId, getValid<MyItemsQuery>(res, "query"));
  return res.status(200).json({ success: true, data: result.items, nextCursor: result.nextCursor });
});