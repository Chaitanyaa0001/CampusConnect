import app from './app'

import {env} from './config/env.config'



async function startServer() {
  try {


    app.listen(env.PORT, () => {
      console.log(`Auth service running on port  ${env.PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

startServer();
