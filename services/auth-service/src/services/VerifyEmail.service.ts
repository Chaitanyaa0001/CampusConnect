import crypto from 'crypto';
import { prisma } from '../config/prisma';
import { hashToken } from '../utils/hashPass';
import { AppError } from '../error/AppError';

export const verifyEmailService = async (token:string) => {
    const hashed = await  hashToken(token);

    const user = await prisma.user.findFirst({
        where:{
            verificationToken : hashed,
            verificationTokenExpiry : {
                gt : new Date()
            }
        }
    })
    if(!user){
        throw new AppError("Invalid or expired token", 400);
    }

    await prisma.user.update({
        where:{
            id: user.id,
        },
        data:{
            isVerified: true,
            verificationToken : null,
            verificationTokenExpiry : null
        }
    })


    return {message: "email verification successful ladle "}; 
}