import { startUserProfileConsumer } from "./consumers/userProfile.consumer.js";
import { startCounterConsumers } from "./consumers/counters.consumer.js";

export const startConsumers = async () => {
  await startUserProfileConsumer();
  await startCounterConsumers();
  console.log("All User Service consumers started");
};