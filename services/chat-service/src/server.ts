import { createServer } from "node:http";

import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectRabbitMQ } from "./lib/rabbitmq.js";
import { initSocketServer } from "./lib/socket.js";

async function startServer() {
    try {
        const server = createServer(app);

        initSocketServer(server);
        await connectRabbitMQ();

        server.listen(env.PORT, () => {
            console.log(`Chat service is running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start chat service:", error);
        process.exit(1);
    }
}

startServer();
