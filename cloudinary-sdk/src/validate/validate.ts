// Check the real bytes: the mimetype a client sends can be faked.
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const RIFF = [0x52, 0x49, 0x46, 0x46];
const WEBP = [0x57, 0x45, 0x42, 0x50];

const startsWith = (d: Uint8Array, sig: number[], offset = 0) =>
  d.length >= offset + sig.length && sig.every((b, i) => d[offset + i] === b);

/** True for real JPEG, PNG or WebP data. */
export const isSupportedImage = (data: Uint8Array): boolean =>
  startsWith(data, [0xff, 0xd8, 0xff]) ||
  startsWith(data, PNG) ||
  (startsWith(data, RIFF) && startsWith(data, WEBP, 8));