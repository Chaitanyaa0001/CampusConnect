import { start } from 'node:repl';

import app from './app.js';



async function startServer() {
  try {
    console.log("DATABASE_URL =", env.DATABASE_URL);
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    
    app.listen(env.PORT, () => {
      console.log(`Auth service running on port  ${env.PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
} 

startServer();
