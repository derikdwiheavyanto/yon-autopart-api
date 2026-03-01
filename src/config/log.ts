import pino from "pino";


export const log = pino({
    level: "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname,reqId",
            singleLine: true
        }
    }
})