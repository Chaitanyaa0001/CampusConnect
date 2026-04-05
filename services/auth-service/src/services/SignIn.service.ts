

import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import { comparePassword, hashToken } from "../utils/hashPass";

export const signinService = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        throw new AppError("Invalid email or password", 400);
    }
    // match pass word 
    const match  = await comparePassword(password, user.password);
    if(!match){
        throw new AppError("Invalid credentials", 400);
    }
    // check if user is verified or not 
    if(!user.isVerified){
        throw new AppError("Please verify your email before signing in", 400);
    }
    // generate tokens 
    const accessToken = generateAccessToken({
        userId : user.id,
        email : user.email
    });
    const refreshToken = generateRefreshToken({
        userId : user.id,
        email : user.email
    });
    // hashtoken 
    const hashtoken  = await hashToken(refreshToken);
    // create session 
    await prisma.session.create({
        data:{
            userId : user.id,
            tokenHash : hashtoken,
            expiresAt : new Date(Date.now() + 7*24*60*60*1000) // 7 days expiry
        }
    })

    return  {accessToken, refreshToken, user};
}