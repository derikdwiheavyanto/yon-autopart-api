import Fastify from 'fastify'
import dotenv from 'dotenv'
dotenv.config()
import { onRequestLogging, onResponseLogging } from './hook/logger'
import pino from 'pino'
import cors from '@fastify/cors'
import errorHandler from './error_handler/error_handler'
import catalogRouteUser from './modules/catalog/routes/catalog.user.route'
import catalogRouteAdmin from './modules/catalog/routes/catalog.admin.route'
import fastifyJwt from '@fastify/jwt'
import AuthRoutes from './modules/auth/routes/auth.route'


//pino config logging
const log = pino({
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

const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify({
    loggerInstance: isProduction ? undefined : log,
    disableRequestLogging: true,
})



async function start() {
    //Decorate
    server.decorateRequest('startTime', 0)
    server.decorateRequest('isError', false)

    //Hook
    server.addHook('onRequest', onRequestLogging)
    server.addHook('onResponse', onResponseLogging)

    //errorHanlder
    server.setErrorHandler(errorHandler)


    //register
    server.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
    server.register(fastifyJwt, { secret: "supersecret" })

    // register route
    server.register(AuthRoutes, {prefix:"/api/auth"})
    server.register(catalogRouteUser, { prefix: "/api/catalog" })
    server.register(catalogRouteAdmin, { prefix: "/api/admin/catalog" })
    


    //fastify listen
    server.listen({
        port: Number(process.env.PORT) || 3333,
        host: process.env.HOST || "0.0.0.0"
    }, function (err, address) {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
    })
}

start()