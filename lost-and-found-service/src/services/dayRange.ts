import { env } from "../config/env.config.js";


export const dayRange = (date: string) => {
    const start = new Date(`${date}T00:00:00${env.CAMPUS_TZ_OFFSET}`);
    return { start, end: new Date(start.getTime() + 24 * 60 * 60 * 1000) };
};