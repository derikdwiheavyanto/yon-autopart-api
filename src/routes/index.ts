import { FastifyInstance } from "fastify";
import AuthRoutes from "../modules/auth/routes/auth.route";
import catalogRouteUser from "../modules/catalog/routes/catalog.user.route";
import catalogRouteAdmin from "../modules/catalog/routes/catalog.admin.route";
import { AppInstance } from "../app";


export default async function registerRoute(server: AppInstance) {
    await server.register(AuthRoutes, { prefix: "/api/auth" })
    await server.register(catalogRouteUser, { prefix: "/api/catalog" })
    await server.register(catalogRouteAdmin, { prefix: "/api/admin/catalog" })
}