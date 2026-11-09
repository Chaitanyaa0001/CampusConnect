import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { CloudinaryError } from "../error/error.js";
import type { CloudinaryClient, CloudinaryImage, UploadImageOptions } from "../types/type.js";

/** Upload an image. Pass `publicId` to make it replace the previous one for that owner. */
export const uploadImage = (client: CloudinaryClient,data: Uint8Array,folder: string,options: UploadImageOptions = {}): Promise<CloudinaryImage> =>
  new Promise((resolve, reject) => {
    const {
      publicId,
      allowedFormats = ["jpg", "png", "webp"],
      maxWidth,
      maxHeight,
      timeoutMs = 20_000,
    } = options;

    if (!data || data.length === 0) {
        throw new CloudinaryError("Image buffer cannot be empty");
    }
    const stream = client.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        allowed_formats: allowedFormats,
        timeout: timeoutMs,
        ...(publicId ? { public_id: publicId, overwrite: true, invalidate: true } : {}),
        ...(maxWidth || maxHeight
          ? { transformation: [{ width: maxWidth, height: maxHeight, crop: "limit", quality: "auto" }] }
          : {}),
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(new CloudinaryError(error?.message ?? "Cloudinary upload failed", error?.http_code));
        }
        resolve({ public_id: result.public_id, secure_url: result.secure_url });
      }
    );

    // Cloudinary's UploadStream type does not declare end(), although the object is a real
    // writable stream at runtime. A narrow cast is the fix.
    (stream as unknown as { end: (chunk: Uint8Array) => void }).end(data);
  });

/** Delete an image. "not found" counts as success: the image is gone either way. */
export const deleteImage = async (client: CloudinaryClient, publicId: string): Promise<void> => {
  const res = await client.uploader.destroy(publicId, { invalidate: true });
  if (res.result !== "ok" && res.result !== "not found") {
    throw new CloudinaryError(`Cloudinary delete failed: ${res.result}`);
  }
};