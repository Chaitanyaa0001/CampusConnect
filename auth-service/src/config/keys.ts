import * as  fs from 'fs';

export const PRIVATE_KEY =fs.readFileSync('/run/secrets/private_key', 'utf-8');
export const PUBLIC_KEY = fs.readFileSync('/run/secrets/public_key', 'utf-8');
export const KEY_ID = "auth-key-1";