import { v2 as cloudinary } from "cloudinary";

import type {
    UploadApiErrorResponse,
    UploadApiResponse,
} from "cloudinary";


export interface CloudinaryConfig {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}


export interface CloudinaryImage {
    public_id: string;
    secure_url: string;
}


export const createCloudinaryClient = (
    config: CloudinaryConfig
) => {

    cloudinary.config({
        cloud_name: config.cloudName,
        api_key: config.apiKey,
        api_secret: config.apiSecret,
        secure: true,
    });

    return cloudinary;
};


/**
 * Upload a new image
 */
export const uploadImage = (cloudinaryClient: typeof cloudinary,data: Uint8Array,folder: string): Promise<CloudinaryImage> => {
    return new Promise((resolve, reject) => {
        const stream =cloudinaryClient.uploader.upload_stream(
                {
                    folder,
                    resource_type: "image",
                },
                (
                    error: UploadApiErrorResponse | undefined,
                    result: UploadApiResponse | undefined
                ) => {
                    if (error || !result) {
                        reject(
                            error ??
                            new Error("Cloudinary upload failed")
                        );
                        return;
                    }
                    resolve({
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    });
                }
            );
        (
            stream as unknown as {
                end: (data: Uint8Array) => void;
            }
        ).end(data);
    });
};

/**
 * Delete an existing image
 */
export const deleteImage = async (
    cloudinaryClient: typeof cloudinary,
    publicId: string
): Promise<void> => {

    await cloudinaryClient.uploader.destroy(
        publicId
    );
};


/**
 * Replace an existing image
 *
 * 1. Upload new image
 * 2. Delete old image
 *
 * If upload fails, old image remains untouched.
 */
export const updateImage = async (cloudinaryClient: typeof cloudinary,data: Uint8Array,folder: string,oldPublicId?: string): Promise<CloudinaryImage> => {
    // Upload new image first
    const newImage = await uploadImage(cloudinaryClient,data,folder);
    try {
        // Delete old image only after
        // new image has been uploaded successfully
        if (oldPublicId) {
            await deleteImage(cloudinaryClient,oldPublicId);
        }
    } catch (error) {
        // If deleting the old image fails,
        // remove the newly uploaded image
        // so we don't leave an orphan image.
        try {
            await deleteImage(cloudinaryClient,
                newImage.public_id
            );
        } catch {

        }
        throw error;
    }
    return newImage;
};