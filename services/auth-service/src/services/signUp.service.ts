
import { prisma } from "../config/prisma";
import { AppError } from "../error/AppError";
import {  hashPassword, hashToken } from "../utils/hashPass";
import crypto from 'crypto'


export const signupService = async (email: string, username: string,  password: string) => {

    // if user exists throw error ladle
    const existingUser = await prisma.user.findUnique({
        where:{email}
    })
    if (existingUser){
        throw new AppError("User already exists", 400);
    } 

    const hashed = await  hashPassword(password);
    // generate token for email verification 
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashtoken  = await hashToken(verificationToken);

    const newUser = await prisma.user.create({
        data:{
            email : email,
            username: username,
            password : hashed,
            isVerified : false,
            verificationToken : hashtoken,
            verificationTokenExpiry : new Date(Date.now() + 15 * 60 * 1000)
        }
    });
    return {user : newUser, verificationToken};
};