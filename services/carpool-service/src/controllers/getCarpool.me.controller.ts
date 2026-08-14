import { Request, Response } from "express";

import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import { getCarpoolByMeService } from "../services/getRidebyme.service";

export const getcarpoolbyme = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId;

	if (!userId) {
		throw new AppError("User not authenticated", 401);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;

	const rides = await getCarpoolByMeService(userId, page, limit);

	return res.status(200).json({
		success: true,
		data: rides,
	});
});