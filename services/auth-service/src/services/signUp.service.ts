import prisma from "../config/prisma";
import { AppError } from "../error/AppError";
import { catchAsync } from "../error/tryCatchAsync";
import { comparePassword, hashPassword } from "../utils/hashPass";


export const signupService = async (email: string, username: string,  password: string) => {

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email,
            username : username
        }
    })
    if (existingUser){
        throw new AppError("User already exists", 400);
    } 

    const hashed = await  hashPassword(password);

    const newUser = await prisma.user.create({
        data:{
            email : email,
            username: username,
            password : hashed
        }
    });

    return newUser;
};