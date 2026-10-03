import cloudinary from '../config/cloudinary.config.js';
import type {UploadApiErrorResponse,UploadApiResponse,} from "cloudinary";

export const uploadImage = (buffer: Buffer,folder: string): Promise<{public_id: string;secure_url: string;}> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({folder,resource_type: "image",},
            ( error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    return reject(
                        error ?? new Error("Upload failed")
                    );
                }
                resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                });
            }
        );
        stream.end(buffer);
    });
};

export const deleteImage = async (publicId: string) => {

    await cloudinary.uploader.destroy(publicId);

};