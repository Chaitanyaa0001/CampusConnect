import { v2 as cloudinary } from "cloudinary";
import type { CloudinaryClient, CloudinaryConfig } from "../types/type.js";

// The SDK never reads env or files itself: the service passes its config in.
// NOTE: cloudinary.config() is global to the process, so one process = one Cloudinary account.
export const createCloudinaryClient = (config: CloudinaryConfig): CloudinaryClient => {
  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    throw new Error("Cloudinary config is incomplete");
  }
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  });
  return cloudinary;
};