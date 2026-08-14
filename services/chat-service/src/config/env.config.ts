import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 4000,
    RABBITMQ_URL: process.env.RABBITMQ_URL ?? (() => { throw new Error("Missing RABBITMQ_URL environment variable") })(),
};
