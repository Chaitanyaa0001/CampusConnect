// Use require to avoid missing type declaration for 'rsa-pem-to-jwk'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rsaPemToJwk = require("rsa-pem-to-jwk") as any;
import { PUBLIC_KEY } from "../config/keys";

export const getJWKS = () => {
  const jwk = rsaPemToJwk(PUBLIC_KEY, { use: "sig" }, "public");

  return {
    keys: [
      {
        ...jwk,
        kid: "auth-key-1",   
        alg: "RS256",
        use: "sig",
      },
    ],
  };
};