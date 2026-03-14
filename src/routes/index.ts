import AuthRoutes from "../modules/auth/routes/auth.route";
import catalogRouteUser from "../modules/catalog/routes/catalog.user.route";
import catalogRouteAdmin from "../modules/catalog/routes/catalog.admin.route";
import { AppInstance } from "../app";
import { authMiddleware } from "../middleware/auth.middleware";
import { orderRouter } from "../modules/order/routes/order.user.route";
import { orderRouterAdmin } from "../modules/order/routes/order.admin.route";


export default async function registerRoute(server: AppInstance) {
    server.register(async (server) => {
        // Register route for auth api
        await server.register(AuthRoutes, { prefix: "/auth" })

        // Register route for public api
        await server.register(async function (user) {
            await user.register(catalogRouteUser)
            await user.register(orderRouter, { prefix: "/order" })
        })

        // Register route for admin api
        await server.register(async function (admin) {
            admin.addHook('onRequest', authMiddleware) // this is to implement authMiddleware (JWT Token)
            await admin.register(orderRouterAdmin, { prefix: '/order' })
            await admin.register(catalogRouteAdmin, { prefix: '/catalog' })
        }, { prefix: "/admin" })
    }, { prefix: "/api" })
}