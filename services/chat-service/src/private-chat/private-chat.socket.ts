import type { Server as HttpServer } from "node:http";

import { authenticateSocket, type TokenPayload } from "auth-sdk";
import { Server, type Socket } from "socket.io";

import { prisma } from "../utils/prima.client.js";

type PrivateChatSocket = Socket & {
    data: {
        user?: TokenPayload;
    };
};

type StartPrivateChatPayload = {
    targetUserId?: string;
};

type SendPrivateMessagePayload = {
    conversationId?: string;
    content?: string;
};

const PRIVATE_CHAT_HISTORY_LIMIT = 50;
const PRIVATE_MESSAGE_MAX_LENGTH = 1_000;

const getConversationRoom = (conversationId: string) => {
    return `conversation:${conversationId}`;
};

const normalizeContent = (content?: string) => {
    if (typeof content !== "string") {
        return undefined;
    }
    const normalized = content.trim();
    if (!normalized) {
        return undefined;
    }
    return normalized.slice(0, PRIVATE_MESSAGE_MAX_LENGTH);
};
const toPrivateMessage = (message: {id: string;conversationId: string;userId: string;content: string;createdAt: Date;}) => ({id: message.id,conversationId: message.conversationId,userId: message.userId,content: message.content,createdAt: message.createdAt.toISOString(),});

export const initPrivateChatServer = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    const privateNamespace = io.of("/private-chat");

    privateNamespace.use(authenticateSocket);

    privateNamespace.on(
        "connection",
        (socket: PrivateChatSocket) => {
            const user = socket.data.user;

            if (!user?.userId) {
                socket.disconnect(true);
                return;
            }
            console.log(
                `Private chat connected: ${user.userId} (${socket.id})`,
            );

            /**
             * Start / get a private conversation
             */
            socket.on(
                "private:start",
                async (
                    payload: StartPrivateChatPayload,
                    ack?: (response: unknown) => void,
                ) => {
                    const currentUserId = user.userId;
                    const targetUserId = payload?.targetUserId?.trim();

                    if (!targetUserId) {
                        ack?.({
                            ok: false,
                            error: "Target user ID is required",
                        });
                        return;
                    }

                    if (targetUserId === currentUserId) {
                        ack?.({
                            ok: false,
                            error: "You cannot start a chat with yourself",
                        });
                        return;
                    }

                    try {
                        const [userOneId, userTwoId] = [
                            currentUserId,
                            targetUserId,
                        ].sort();

                        const conversation =
                            await prisma.conversation.upsert({
                                where: {
                                    userOneId_userTwoId: {
                                        userOneId,
                                        userTwoId,
                                    },
                                },
                                create: {
                                    userOneId,
                                    userTwoId,
                                },
                                update: {},
                            });

                        const room = getConversationRoom(
                            conversation.id,
                        );

                        socket.join(room);

                        ack?.({
                            ok: true,
                            conversation: {
                                id: conversation.id,
                                userOneId: conversation.userOneId,
                                userTwoId: conversation.userTwoId,
                            },
                        });
                    } catch (error) {
                        console.error(
                            "Failed to start private chat:",
                            error,
                        );

                        ack?.({
                            ok: false,
                            error: "Unable to start private chat",
                        });
                    }
                },
            );

            /**
             * Join an existing private conversation
             */
            socket.on(
                "private:join",
                async (
                    payload: { conversationId?: string },
                    ack?: (response: unknown) => void,
                ) => {
                    const conversationId =
                        payload?.conversationId?.trim();

                    if (!conversationId) {
                        ack?.({
                            ok: false,
                            error: "Conversation ID is required",
                        });
                        return;
                    }

                    try {
                        const conversation =
                            await prisma.conversation.findUnique({
                                where: {
                                    id: conversationId,
                                },
                            });

                        if (!conversation) {
                            ack?.({
                                ok: false,
                                error: "Conversation not found",
                            });
                            return;
                        }

                        const isParticipant =
                            conversation.userOneId === user.userId ||
                            conversation.userTwoId === user.userId;

                        if (!isParticipant) {
                            ack?.({
                                ok: false,
                                error: "You are not a participant in this conversation",
                            });
                            return;
                        }

                        const room =
                            getConversationRoom(conversation.id);

                        socket.join(room);

                        ack?.({
                            ok: true,
                            conversation: {
                                id: conversation.id,
                                userOneId: conversation.userOneId,
                                userTwoId: conversation.userTwoId,
                            },
                        });
                    } catch (error) {
                        console.error(
                            "Failed to join private chat:",
                            error,
                        );

                        ack?.({
                            ok: false,
                            error: "Unable to join private chat",
                        });
                    }
                },
            );

            /**
             * Load private chat history
             */
            socket.on(
                "private:history",
                async (
                    payload: { conversationId?: string },
                    ack?: (response: unknown) => void,
                ) => {
                    const conversationId =
                        payload?.conversationId?.trim();

                    if (!conversationId) {
                        ack?.({
                            ok: false,
                            error: "Conversation ID is required",
                        });
                        return;
                    }

                    try {
                        const conversation =
                            await prisma.conversation.findUnique({
                                where: {
                                    id: conversationId,
                                },
                            });

                        if (!conversation) {
                            ack?.({
                                ok: false,
                                error: "Conversation not found",
                            });
                            return;
                        }

                        const isParticipant =
                            conversation.userOneId === user.userId ||
                            conversation.userTwoId === user.userId;

                        if (!isParticipant) {
                            ack?.({
                                ok: false,
                                error: "Unauthorized",
                            });
                            return;
                        }

                        const messages =
                            await prisma.privateMessage.findMany({
                                where: {
                                    conversationId,
                                },
                                orderBy: {
                                    createdAt: "desc",
                                },
                                take: PRIVATE_CHAT_HISTORY_LIMIT,
                            });

                        ack?.({
                            ok: true,
                            messages: messages
                                .reverse()
                                .map(toPrivateMessage),
                        });
                    } catch (error) {
                        console.error(
                            "Failed to load private chat history:",
                            error,
                        );

                        ack?.({
                            ok: false,
                            error: "Unable to load chat history",
                        });
                    }
                },
            );

            /**
             * Send private message
             */
            socket.on(
                "private:message",
                async (
                    payload: SendPrivateMessagePayload,
                    ack?: (response: unknown) => void,
                ) => {
                    const conversationId =
                        payload?.conversationId?.trim();

                    const content = normalizeContent(
                        payload?.content,
                    );

                    if (!conversationId) {
                        ack?.({
                            ok: false,
                            error: "Conversation ID is required",
                        });
                        return;
                    }

                    if (!content) {
                        ack?.({
                            ok: false,
                            error: "Message cannot be empty",
                        });
                        return;
                    }

                    try {
                        const conversation =
                            await prisma.conversation.findUnique({
                                where: {
                                    id: conversationId,
                                },
                            });

                        if (!conversation) {
                            ack?.({
                                ok: false,
                                error: "Conversation not found",
                            });
                            return;
                        }

                        /**
                         * VERY IMPORTANT:
                         * Make sure the sender belongs
                         * to this conversation.
                         */
                        const isParticipant =
                            conversation.userOneId === user.userId ||
                            conversation.userTwoId === user.userId;

                        if (!isParticipant) {
                            ack?.({
                                ok: false,
                                error: "You are not a participant in this conversation",
                            });
                            return;
                        }

                        const savedMessage =
                            await prisma.privateMessage.create({
                                data: {
                                    conversationId,
                                    userId: user.userId,
                                    content,
                                },
                            });

                        const outgoingMessage = {
                            ...toPrivateMessage(savedMessage),
                            sender: {
                                userId: user.userId,
                                email: user.email,
                                username: user.username,
                            },
                        };

                        const room =
                            getConversationRoom(conversationId);

                        privateNamespace
                            .to(room)
                            .emit(
                                "private:message",
                                outgoingMessage,
                            );

                        ack?.({
                            ok: true,
                            message: outgoingMessage,
                        });
                    } catch (error) {
                        console.error(
                            "Failed to send private message:",
                            error,
                        );

                        ack?.({
                            ok: false,
                            error: "Unable to send message",
                        });
                    }
                },
            );

            socket.on("disconnect", () => {
                console.log(
                    `Private chat disconnected: ${socket.id}`,
                );
            });
        },
    );

    return io;
};