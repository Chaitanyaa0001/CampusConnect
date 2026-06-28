import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { hashToken } from '../utils/hashPass';
import { AppError } from '../error/AppError';
import { publishEvent } from '../events/publisher';
import { ROUTING_KEY } from '../events/routingKey';

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
    // update user 
  const updateduser =  await prisma.user.update({
        where:{
            id: user.id,
        },
        data:{
            isVerified: true,
            verificationToken : null,
            verificationTokenExpiry : null
        }
    })

    // user verified successfully, publish event for user data in user service
    await publishEvent(ROUTING_KEY.USER_CREATED_KEY, {
        userId: updateduser.id,
        email: updateduser.email,
        username: updateduser.username
    });
    
    return {message: "email verification successful ladle "};
} 
