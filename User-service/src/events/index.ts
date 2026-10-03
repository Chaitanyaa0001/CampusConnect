import { startUserProfileConsumer } from "./consumers/userProfile.consumer.js";
import { startCarpoolConsumer } from "./consumers/carPool.consumer.js";
import { startProjectsConsumer } from "./consumers/projects.consumer.js";
import { startLostAndFoundConsumer } from "./consumers/lostandFound.consumer.js";

export const startConsumers = async () => {
    await startUserProfileConsumer();
    await startLostAndFoundConsumer();
    await startProjectsConsumer();
    await startCarpoolConsumer();
    
    
    console.log("All User Service consumers started");
};