import requestDecorator from "./request_decorator";
import { AppInstance } from "../app";
import corsPlugin from "./cors"
import jwt from "./jwt";
import multipart from "./multipart";
import swagger from "./swagger";


export default async function registerPlugins(server: AppInstance) {
    await server.register(requestDecorator)
    await server.register(multipart)
    await server.register(swagger)
    await server.register(corsPlugin)
    await server.register(jwt)
}