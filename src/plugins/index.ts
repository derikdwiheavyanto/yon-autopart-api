import requestDecorator from "./decorator";
import { AppInstance } from "../app";
import corsPlugin from "./cors"
import jwt from "./jwt";
import multipart from "./multipart";
import swagger from "./swagger";
import _static from "./static";


export default async function registerPlugins(server: AppInstance) {
    await server.register(requestDecorator)
    await server.register(multipart)
    await server.register(swagger)
    await server.register(corsPlugin)
    await server.register(jwt)
    await server.register(_static)
}