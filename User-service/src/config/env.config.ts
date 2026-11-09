import dotenv from "dotenv";
dotenv.config();

const required = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key} environment variable`);
  return v;
};

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  CLIENT_URL: required("CLIENT_URL"), // used for CORS, no trailing slash
  // cloudinary
  CLOUDINARY_CLOUD_NAME: required("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: required("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: required("CLOUDINARY_API_SECRET"),
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER ,
};