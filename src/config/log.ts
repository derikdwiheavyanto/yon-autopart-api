import pino from "pino";
import { config } from ".";


export const log = pino({
    level: config.isProduction ? "info" : "debug",
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