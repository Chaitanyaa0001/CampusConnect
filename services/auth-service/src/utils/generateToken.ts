import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/tokenPayload';
import { PRIVATE_KEY, PUBLIC_KEY } from '../config/keys';
import { AppError } from '../error/AppError';

//  generating access token with 15 minutes expiry
export const generateAccessToken = (tokenPayload: TokenPayload) => {
    
    try {
        return jwt.sign(tokenPayload,PRIVATE_KEY,{
            algorithm: 'RS256',
            expiresIn: '15m'
        })
    } catch (err) {
        console.log("AccessToken generation error ");
        throw new AppError(" Generate Token error", 500)
    }
};
// generating refresh token with 7 days expiry
export const generateRefreshToken = (tokenPayload: TokenPayload) => {
    try {
        return jwt.sign(tokenPayload,PRIVATE_KEY,{
            algorithm: 'RS256',
            expiresIn: '7d'
        })
    } catch (err) {
        console.log("RefreshToken generation error ");
        throw new AppError(" Generate Token error", 500)
    }
}
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, PUBLIC_KEY) as TokenPayload;
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};




