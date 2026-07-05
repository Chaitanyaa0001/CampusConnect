import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: (process.env.PORT)?? (() => { throw new Error("Missing PORT environment variable") })(),
    DATABASE_URL: (process.env.DATABASE_URL)?? (() => { throw new Error("Missing Postgress URL environment variable") })(),
}