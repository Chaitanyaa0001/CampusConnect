import { catchAsync } from "../error/tryCatchAsync";
import { Request, Response } from "express";
import { signinService } from "../services/SignIn.service";
export const signinController  = catchAsync(async (req:Request, res:Response)=>{
    const { email, password } = req.body;
    // extract tokens from sign in service 
    const {accessToken,refreshToken} = await signinService(email,password);
    // retun access and refresh token 
    res.status(200).json({message: "login successful", accessToken,refreshToken});

})