import { Request, Response } from "express";
import { JWKS } from "../config/jwks";

export const getJWKS = (req: Request,res: Response) => {
    
    res.status(200).json(JWKS);

};