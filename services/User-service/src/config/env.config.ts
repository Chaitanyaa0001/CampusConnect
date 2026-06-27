import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: (process.env.DATABASE_URL)?? (() => { throw new Error("Missing Postgress URL environment variable") })(),
    // emailSecret : (process.env.EMAIL_SECRET) ?? (() => { throw new Error("Missing EMAIL_SECRET environment variable") })(),
    // BREVO_API_KEY : (process.env.BREVO_API_KEY) ?? (() => { throw new Error("Missing BREVO_API_KEY environment variable") })(),
    // MAIL_FROM_NAME : (process.env.MAIL_FROM_NAME) ?? (() => { throw new Error("Missing MAIL_FROM_NAME environment variable") })(),
    // MAIL_FROM_EMAIL : (process.env.MAIL_FROM_EMAIL) ?? (() => { throw new Error("Missing MAIL_FROM_EMAIL environment variable") })(),
    // CLIENT_URL : (process.env.CLIENT_URL) ?? (() => { throw new Error("Missing CLIENT_URL environment variable") })(),
    RABBITMQ_URL : (process.env.RABBITMQ_URL) ?? (() => { throw new Error("Missing RABBITMQ_URL environment variable") })(),
} 