import express from 'express';
import * as  dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: (process.env.DATABASE_URL)?? (() => { throw new Error("Missing Postgress URL environment variable") })(),
    CLIENT_URL : (process.env.CLIENT_URL) ?? (() => { throw new Error("Missing CLIENT_URL environment variable") })(),
    RABBITMQ_URL : (process.env.RABBITMQ_URL) ?? (() => { throw new Error("Missing RABBITMQ_URL environment variable") })(),
} 

// model User {
//   id           String @id
//   email        String @unique
//   username     String @unique
//   firstName    String?
//   lastName     String?
//   bio          String?
//   profilePhoto String?
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
// }