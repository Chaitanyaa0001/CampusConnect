import {uploadImage,deleteImage,} from "cloudinary-sdk";
import {Express} from "express";
import { prisma } from "../utils/prisma.client.js";
importScriptsmport {Multer} from "multer";
import { cloudinary } from "../config/cloudinary.config.js";
import { env } from "../config/env.config.js";
import {ICreateLostAndFoundInput,} from "../interface/interface.js";

export const postLostAndFoundService = async ( data: ICreateLostAndFoundInput,userId: string, file?: Express.Multer.File) => {
    let uploadedImage:
        | {
            public_id: string;
            secure_url: string;
        }
        | undefined;
    // Upload image if provided
    if (file) {
        uploadedImage = await uploadImage(
            cloudinary,
            file.buffer,
            env.CLOUDINARY_FOLDER_NAME
        );
    }
    try {
        const lostAndFound =
            await prisma.lostAndFound.create({
                data: {
                    userId,
                    itemName:
                        data.itemName,
                    type:
                        data.type,

                    location:
                        data.location,
                    date:
                        new Date(data.date),
                    description:
                        data.description,
                    tags:
                        data.tags,
                    imagePublicId:
                        uploadedImage?.public_id,
                    imageUrl:
                        uploadedImage?.secure_url,
                },
            });
        return lostAndFound;
    } catch (error) {
        // If DB creation fails,
        // remove uploaded image from Cloudinary
        if (uploadedImage) {
            await deleteImage(
                cloudinary,
                uploadedImage.public_id
            );
        }
        throw error;
    }
};