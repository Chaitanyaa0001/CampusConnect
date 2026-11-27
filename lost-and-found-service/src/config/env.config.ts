import dotenv from "dotenv";
dotenv.config();

const required = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key} environment variable`);
  return v;
};

// dates in filters ("items on 2026-11-10") are read in the campus time zone, not the server's
const tz = process.env.CAMPUS_TZ_OFFSET ?? "+05:30";
if (!/^[+-]\d{2}:\d{2}$/.test(tz)) throw new Error("CAMPUS_TZ_OFFSET must look like +05:30");

// "fake" = no Cloudinary calls (load tests). Refused in production.
const driver = process.env.STORAGE_DRIVER ?? "cloudinary";
if (driver !== "cloudinary" && driver !== "fake") throw new Error("STORAGE_DRIVER must be cloudinary or fake");
if (driver === "fake" && process.env.NODE_ENV === "production") {
  throw new Error("STORAGE_DRIVER=fake must not be used in production");
}
const cloud = (key: string) => (driver === "cloudinary" ? required(key) : process.env[key] ?? "");

export const env = {
  PORT: Number(required("PORT")),
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  CLIENT_URL: required("CLIENT_URL"), // used for CORS, no trailing slash
  CAMPUS_TZ_OFFSET: tz,
  STORAGE_DRIVER: driver as "cloudinary" | "fake",
  CLOUDINARY_CLOUD_NAME: cloud("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: cloud("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: cloud("CLOUDINARY_API_SECRET"),
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER ?? "campusconnect/lost-found",
};