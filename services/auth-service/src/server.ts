import app from './app'
import { env } from './config/env.config'

app.listen(env.PORT, () => {
  console.log(`Auth service running on ports ${env.PORT}`);
});
