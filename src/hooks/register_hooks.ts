import { FastifyInstance } from "fastify";
import { onRequestLogging, onResponseLogging } from "./logger";
import { AppInstance } from "../app";


export default async function registerHooks(server: AppInstance) {
    server.addHook('onRequest', onRequestLogging)
    server.addHook('onResponse', onResponseLogging)
}