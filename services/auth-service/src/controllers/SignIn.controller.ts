import { catchAsync } from "../error/tryCatchAsync";
import { Request, Response } from "express";
import { signinService } from "../services/SignIn.service";
import { publishEvent } from "../events/publisher";
import { ROUTING_KEY } from "../events/routingKey";
export const signinController  = catchAsync(async (req:Request, res:Response)=>{
    const { email, password } = req.body;
    // extract tokens from sign in service 
    const { user, accessToken, refreshToken } = await signinService(email,password);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return res.status(200).json({ message: "Login successful", accessToken});
})