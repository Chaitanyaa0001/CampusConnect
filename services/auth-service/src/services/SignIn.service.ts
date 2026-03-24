

import { prisma } from "../config/prisma";
import { AppError } from "../error/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import { comparePassword } from "../utils/hashPass";

export const signinService = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        throw new AppError("Invalid email or password", 400);
    }

    const match  = await comparePassword(password, user.password);
    if(!match){
        throw new AppError("Invalid credentials", 400);
    }
    if(!user.isVerified){
        throw new AppError("Please verify your email before signing in", 400);
    }
    const accessToken = generateAccessToken({userId : user.id, email : user.email});
    const refreshToken = generateRefreshToken({userId : user.id, email : user.email});

    await   

    

}