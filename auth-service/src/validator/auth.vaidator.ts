import {z} from "zod";   
import {Request, Response,NextFunction} from "express";

import {AppError} from "../error/AppError";

const email = z.string().trim();
export const  signupSchema = z.object({
  email,
  username : z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password : z.string().trim().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")

})

export const signinSchema = z.object({
  email,
  password : z.string().trim().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
})

export const resendSchema = z.object({ email });

export const verifyEmailSchema = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/, "Invalid token") });

export const validateSchema =(schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorMessages = result.error.issues.map((err) => err.message);
    return next( new AppError( `Validation error: ${errorMessages.join(", ")}`,400));
  }
  req.body = result.data;
  next();
};