import express from "express";
import { env } from "./config/env.config";
import app from "./app";
import "auth-sdk";
import { connectRabbitMQ } from './lib/rabbitmq';
import { prisma } from './utils/prisma.client';

async function startServer() {
    try {
        await prisma.$connect();
        await connectRabbitMQ();

        app.listen(env.PORT, () => {
            console.log(`lost and found Service is running on port ${env.PORT}`);
        });
        
    } catch (error) {
        console.error("Failed to start lost and found service:", error);
        process.exit(1);
    }
}
startServer();
