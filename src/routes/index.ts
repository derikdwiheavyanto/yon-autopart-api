import AuthRoutes from "../modules/auth/routes/auth.route";
import catalogRouteUser from "../modules/catalog/routes/catalog.user.route";
import catalogRouteAdmin from "../modules/catalog/routes/catalog.admin.route";
import { AppInstance } from "../app";
import { authMiddleware } from "../middleware/auth.middleware";


export default async function registerRoute(server: AppInstance) {
    await server.register(AuthRoutes, { prefix: "/api/auth" })
    await server.register(catalogRouteUser, { prefix: "/api" })
    await server.register(async function (admin) {
        admin.addHook('onRequest', authMiddleware)
        await admin.register(catalogRouteAdmin)
    }, { prefix: "/api/admin/catalog" })
}