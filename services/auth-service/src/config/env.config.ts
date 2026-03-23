import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: (process.env.DATABASE_URL)?? (() => { throw new Error("Missing Postgress URL environment variable") })(),
    emailSecret : process.env.EMAIL_SECRET ?? (() => { throw new Error("Missing EMAIL_SECRET environment variable") })()
} 