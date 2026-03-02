import { time } from "node:console";
import pino from "pino";
import { any } from "zod";


export const log = pino({
    level: "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname,reqId",
            singleLine: false,
        },

    }
})