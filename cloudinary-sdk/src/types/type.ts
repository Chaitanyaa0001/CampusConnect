import type { v2 as cloudinary } from "cloudinary";

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

export type CloudinaryClient = typeof cloudinary;

export interface UploadImageOptions {
  /** Fixed id (for example the owner's user id). Uploading again with the same id OVERWRITES the image. */
  publicId?: string;
  /** Defaults to jpg, png and webp. Enforced by Cloudinary as well. */
  allowedFormats?: string[];
  /** Scale down (never up) so the stored image stays small. */
  maxWidth?: number;
  maxHeight?: number;
  /** Defaults to 20 seconds. */
  timeoutMs?: number;
}