import rsaPemToJwk from "rsa-pem-to-jwk";
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