// import type { Server as HttpServer } from "node:http";

// import { Server, type Namespace, type Socket } from "socket.io";

// import { authenticateSocket } from "../middleware/authenticate-socket.js";
// import type { TokenPayload } from "auth-sdk";

// export type ChatSocket = Socket & {
//     data: {
//         user?: TokenPayload;
//     };
// };

// let io: Server | undefined;

// const getDmRoomName = (userIdA: string, userIdB: string) => {
//     return [userIdA, userIdB].sort().join(":");
// };

// const allowedFeedRooms = new Set(["public", "carpool", "project", "lost-found", "car-rental"]);

// const registerAuthenticatedNamespace = (namespace: Namespace) => {
//     namespace.use(authenticateSocket);
//     return namespace;
// };

// export const initSocketServer = (server: HttpServer) => {
//     io = new Server(server, {
//         cors: {
//             origin: true,
//             credentials: true,
//         },
//     });

//     const publicNamespace = registerAuthenticatedNamespace(io.of("/public-chat"));
//     const dmNamespace = registerAuthenticatedNamespace(io.of("/dm"));
//     const feedNamespace = registerAuthenticatedNamespace(io.of("/feeds"));

//     publicNamespace.on("connection", (socket: ChatSocket) => {
//         socket.join("public");

//         socket.on("public:message", (payload: { message?: string }) => {
//             const message = payload?.message?.trim();

//             if (!message) {
//                 return;
//             }

//             io?.of("/public-chat").to("public").emit("public:message", {
//                 message,
//                 sender: socket.data.user,
//                 createdAt: new Date().toISOString(),
//             });
//         });
//     });

//     feedNamespace.on("connection", (socket: ChatSocket) => {
//         socket.on("feed:join", (payload: { room?: string }) => {
//             const room = payload?.room;

//             if (!room || !allowedFeedRooms.has(room)) {
//                 return;
//             }

//             socket.join(room);
//             socket.emit("feed:joined", { room });
//         });

//         socket.on("feed:message", (payload: { room?: string; message?: string }) => {
//             const room = payload?.room;
//             const message = payload?.message?.trim();

//             if (!room || !allowedFeedRooms.has(room) || !message) {
//                 return;
//             }

//             feedNamespace.to(room).emit("feed:message", {
//                 room,
//                 message,
//                 sender: socket.data.user,
//                 createdAt: new Date().toISOString(),
//             });
//         });
//     });

//     dmNamespace.on("connection", (socket: ChatSocket) => {
//         socket.on("dm:join", (payload: { otherUserId?: string }) => {
//             const userId = socket.data.user?.userId;
//             const otherUserId = payload?.otherUserId;

//             if (!userId || !otherUserId) {
//                 return;
//             }

//             const room = getDmRoomName(userId, otherUserId);
//             socket.join(room);
//             socket.emit("dm:joined", { room });
//         });

//         socket.on("dm:message", (payload: { otherUserId?: string; message?: string }) => {
//             const userId = socket.data.user?.userId;
//             const otherUserId = payload?.otherUserId;
//             const message = payload?.message?.trim();

//             if (!userId || !otherUserId || !message) {
//                 return;
//             }

//             const room = getDmRoomName(userId, otherUserId);
//             io?.of("/dm").to(room).emit("dm:message", {
//                 room,
//                 message,
//                 sender: socket.data.user,
//                 createdAt: new Date().toISOString(),
//             });
//         });
//     });

//     return io;
// };

// export const getSocketServer = () => {
//     if (!io) {
//         throw new Error("Socket server not initialized");
//     }

//     return io;
// };

// export const emitBookingNotification = (payload: {
//     rideId: string;
//     rideOwnerId: string;
//     bookerId: string;
//     bookerName?: string;
//     rideTitle?: string;
// }) => {
//     const socketServer = getSocketServer();
//     const room = getDmRoomName(payload.rideOwnerId, payload.bookerId);

//     socketServer.of("/dm").to(room).emit("booking:created", {
//         ...payload,
//         createdAt: new Date().toISOString(),
//     });
// };

// export const emitServiceFeed = (room: "carpool" | "project" | "lost-found" | "car-rental", payload: {
//     title: string;
//     description?: string;
//     actor?: TokenPayload;
//     sourceId?: string;
// }) => {
//     const socketServer = getSocketServer();

//     socketServer.of("/feeds").to(room).emit("feed:event", {
//         room,
//         ...payload,
//         createdAt: new Date().toISOString(),
//     });
// };
