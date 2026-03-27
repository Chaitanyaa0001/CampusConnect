import { catchAsync } from "../error/tryCatchAsync";
import { Request, Response } from "express";
import { signinService } from "../services/SignIn.service";
export const signinController  = catchAsync(async (req:Request, res:Response)=>{
    const { email, password } = req.body;
    // extract tokens from sign in service 
    const {accessToken,refreshToken} = await signinService(email,password);
    // retun access and refresh token 

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    return res.status(200).json({ message: "Login successful", accessToken});


})     