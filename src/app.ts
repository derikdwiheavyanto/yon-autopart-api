import Fastify from 'fastify'
import dotenv from 'dotenv'
import catalogRouteUser from './modules/catalog/catalog.user.routes'
import catalogRouteAdmin from './modules/catalog/catalog.admin.routes'
import { onRequestLogging, onResponseLogging } from './hook/logger'
import pino from 'pino'
import cors from '@fastify/cors'
import fastifyExpress from '@fastify/express'
import errorHandler from './error_handler/error'

dotenv.config()


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

    // Middleware
    // server.register(fastifyExpress)
    
    //register
    server.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
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