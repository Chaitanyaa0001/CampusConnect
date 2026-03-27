import { catchAsync } from "../error/tryCatchAsync";
import { Request,Response} from "express";
import { refreshTokenService } from "../services/refreshToken.service";

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
    const refreshtoken = req.cookies.refreshToken;

    if (!refreshtoken) {
        return res.status(401).json({ message: "Refresh token missing" });
    }

    const { accessToken } = await refreshTokenService(refreshtoken);

    return res.json({
        accessToken
    });
});