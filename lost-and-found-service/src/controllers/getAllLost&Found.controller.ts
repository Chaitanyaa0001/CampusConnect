import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync.js";
import { getValid } from "../validator/validator.js";
import type { ListItemsQuery } from "../validator/validator.js";
import { listItemsService } from "../services/getAllLostAndFound.service.js";

export const listItemsController = catchAsync(async (_req: Request, res: Response) => {
  const result = await listItemsService(getValid<ListItemsQuery>(res, "query"));
  return res.status(200).json({ success: true, data: result.items, nextCursor: result.nextCursor });
});