import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: (process.env.PORT)?? (() => { throw new Error("Missing PORT environment variable") })(),
    DATABASE_URL: (process.env.DATABASE_URL)?? (() => { throw new Error("Missing Postgress URL environment variable") })(),
    RABBITMQ_URL: (process.env.RABBITMQ_URL)?? (() => { throw new Error("Missing RABBITMQ_URL environment variable") })(),
    CLOUDINARY_CLOUD_NAME: (process.env.CLOUDINARY_CLOUD_NAME)?? (() => { throw new Error("Missing CLOUDINARY_CLOUD_NAME environment variable") })(),
    CLOUDINARY_API_KEY: (process.env.CLOUDINARY_API_KEY)?? (() => { throw new Error("Missing CLOUDINARY_API_KEY environment variable") })(),
    CLOUDINARY_API_SECRET: (process.env.CLOUDINARY_API_SECRET)?? (() => { throw new Error("Missing CLOUDINARY_API_SECRET environment variable") })(),
    CLOUDINARY_FOLDER_NAME: (process.env.CLOUDINARY_FOLDER_NAME)?? (() => { throw new Error("Missing CLOUDINARY_FOLDER_NAME environment variable") })(),
}
