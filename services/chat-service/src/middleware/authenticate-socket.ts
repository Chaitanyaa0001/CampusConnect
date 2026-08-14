// import jwt from "jsonwebtoken";
// import type { Socket } from "socket.io";

// import { AUTH_CONFIG, getKey } from "auth-sdk";
// import type { TokenPayload } from "auth-sdk";

// export const authenticateSocket = (socket: Socket, next: (error?: Error) => void) => {
//     const token = socket.handshake.auth?.token as string | undefined;

//     if (!token) {
//         next(new Error("Unauthorized"));
//         return;
//     }

//     jwt.verify(
//         token,
//         getKey,
//         {
//             algorithms: ["RS256"],
//             issuer: AUTH_CONFIG.issuer,
//             audience: AUTH_CONFIG.audience,
//         },
//         (error, decoded) => {
//             if (error) {
//                 next(new Error("Invalid or expired token"));
//                 return;
//             }

//             socket.data.user = decoded as TokenPayload;
//             next();
//         },
//     );
// };
