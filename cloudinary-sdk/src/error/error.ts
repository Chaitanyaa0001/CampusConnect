/** Real Error instance, so callers can use `instanceof Error` and read `message`. */
export class CloudinaryError extends Error {
  constructor(message: string, public httpCode?: number) {
    super(message);
    this.name = "CloudinaryError";
  }
}