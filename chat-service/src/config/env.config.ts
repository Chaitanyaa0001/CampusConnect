import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3005,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
    PUBLIC_CHAT_ROOM: process.env.PUBLIC_CHAT_ROOM || "public",
    PUBLIC_CHAT_HISTORY_LIMIT: Number(process.env.PUBLIC_CHAT_HISTORY_LIMIT) || 50,
    PUBLIC_CHAT_MESSAGE_MAX_LENGTH: Number(process.env.PUBLIC_CHAT_MESSAGE_MAX_LENGTH) || 1_000,
    DM_CHAT_HISTORY_LIMIT: Number(process.env.DM_CHAT_HISTORY_LIMIT) || 50,
    DM_CHAT_MESSAGE_MAX_LENGTH: Number(process.env.DM_CHAT_MESSAGE_MAX_LENGTH) || 1_000,
};
