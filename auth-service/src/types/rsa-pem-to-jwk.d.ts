declare module "rsa-pem-to-jwk" {
  interface JwkOptions {
    use?: string;
    kid?: string;
    alg?: string;
  }
  
  interface Jwk {
    kty: string;
    use?: string;
    kid?: string;
    alg?: string;
    n: string;
    e: string;
    [key: string]: any;
  }

  export default function rsaPemToJwk(
    pem: string,
    options?: JwkOptions,
    type?: "public" | "private"
  ): Jwk | null;
}