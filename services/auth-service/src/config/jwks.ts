import rsaPemToJwk from "rsa-pem-to-jwk";
import { KEY_ID, PUBLIC_KEY } from "./keys";

const jwk = rsaPemToJwk(
  PUBLIC_KEY,
  {
    'use': "sig",
    'kid': KEY_ID,
    'alg': "RS256",
  },
  'public'    // <-- explicitly specify this is a public key
);

if (!jwk) {
  throw new Error("Failed to generate JWK");
}

export const JWKS = {
  keys: [jwk],
};