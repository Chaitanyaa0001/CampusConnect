import type { Server as HttpServer } from "node:http";

import { authenticateSocket, type TokenPayload } from "auth-sdk";
import { Server, type Socket } from "socket.io";

import { prisma } from "../utils/prima.client.js";

type PublicMessagePayload = {
    content?: string;
    message?: string;
};

export type ChatSocket = Socket & {
    data: {
        user?: TokenPayload;
    };
};

const PUBLIC_CHAT_ROOM = "public";
const PUBLIC_CHAT_HISTORY_LIMIT = 50;
const PUBLIC_CHAT_MESSAGE_MAX_LENGTH = 1_000;

let io: Server | undefined;

const toPublicMessage = (message: {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}) => ({
    id: message.id,
    userId: message.userId,
    content: message.content,
    message: message.content,
    createdAt: message.createdAt.toISOString(),
});

const normalizePublicMessage = (payload: PublicMessagePayload) => {
    const content = (payload?.content ?? payload?.message ?? "").trim();

    if (!content) {
        return undefined;
    }

    return content.slice(0, PUBLIC_CHAT_MESSAGE_MAX_LENGTH);
};

export const initSocketServer = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    const publicNamespace = io.of("/public-chat");
    publicNamespace.use(authenticateSocket);

    publicNamespace.on("connection", async (socket: ChatSocket) => {
        const user = socket.data.user;

        if (!user?.userId) {
            socket.disconnect(true);
            return;
        }

        socket.join(PUBLIC_CHAT_ROOM);
        socket.emit("public:joined", { room: PUBLIC_CHAT_ROOM, user });

        try {
            const messages = await prisma.message.findMany({
                orderBy: { createdAt: "desc" },
                take: PUBLIC_CHAT_HISTORY_LIMIT,
            });

            socket.emit("public:history", messages.reverse().map(toPublicMessage));
        } catch (error) {
            console.error("Failed to load public chat history:", error);
            socket.emit("public:error", { message: "Unable to load chat history" });
        }

        socket.on("public:message", async (payload: PublicMessagePayload, ack?: (response: unknown) => void) => {
            const content = normalizePublicMessage(payload);

            if (!content) {
                ack?.({ ok: false, error: "Message cannot be empty" });
                return;
            }

            try {
                const savedMessage = await prisma.message.create({
                    data: {
                        userId: user.userId,
                        content,
                    },
                });
                const outgoingMessage = {
                    ...toPublicMessage(savedMessage),
                    sender: {
                        userId: user.userId,
                        email: user.email,
                        username: user.username,
                    },
                };

                publicNamespace.to(PUBLIC_CHAT_ROOM).emit("public:message", outgoingMessage);
                ack?.({ ok: true, message: outgoingMessage });
            } catch (error) {
                console.error("Failed to save public chat message:", error);
                socket.emit("public:error", { message: "Unable to send message" });
                ack?.({ ok: false, error: "Unable to send message" });
            }
        });

        socket.on("disconnect", () => {
            console.log(`Public chat disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getSocketServer = () => {
    if (!io) {
        throw new Error("Socket server not initialized");
    }

    return io;
};
