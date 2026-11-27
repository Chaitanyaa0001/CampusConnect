import { randomUUID } from "node:crypto";
import { createCloudinaryClient, uploadImage, deleteImage } from "cloudinary-sdk";
import type { CloudinaryClient, CloudinaryImage } from "cloudinary-sdk";
import { env } from "../config/env.config.js";

// The ONLY file in this service that knows about Cloudinary. The rest calls storeImage/removeImage,
// so moving to S3 later means changing this file only.
// The client is created lazily, so STORAGE_DRIVER=fake (load tests) needs no Cloudinary credentials.
let client: CloudinaryClient | undefined;
const getClient = () =>
  (client ??= createCloudinaryClient({
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  }));

const fake = env.STORAGE_DRIVER === "fake";

// No publicId on purpose: an item card can have its own image, and each upload gets a unique id.
// (publicId = userId would make a second post overwrite the first post's image.)
export const storeImage = (buffer: Buffer): Promise<CloudinaryImage> =>
  fake
    ? Promise.resolve({
        public_id: `fake/${randomUUID()}`,
        secure_url: `https://example.invalid/${randomUUID()}.webp`,
      })
    : uploadImage(getClient(), buffer, env.CLOUDINARY_FOLDER, { maxWidth: 1280, maxHeight: 1280 });

export const removeImage = (publicId: string): Promise<void> =>
  fake ? Promise.resolve() : deleteImage(getClient(), publicId);