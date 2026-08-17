import { createServer } from "node:http";

import app from "./app.js";
import { env } from "./config/env.config.js";
import { initSocketServer } from "./lib/socket.js";
import { initPrivateChatServer } from "./lib/private-chat.socket.js";

const httpServer = createServer(app);

initSocketServer(httpServer);
initPrivateChatServer(httpServer);

httpServer.listen(env.PORT, () => {
    console.log(`Chat service running on port ${env.PORT}`);
});