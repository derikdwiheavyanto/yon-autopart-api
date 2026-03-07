

import dotenv from 'dotenv'
import { buildApp } from './app'
import registerPlugins from './plugins'
import registerRoute from './routes'
import registerHooks from './hooks/register_hooks'
import { config } from './config'
dotenv.config()

async function start() {
    // dont change this code
    const app = buildApp()
    await registerPlugins(app)
    await registerHooks(app)
    !config.isProduction && await registerRoute(app)
    // 

    //fastify listen
    app.listen({
        port: Number(config.port) || 3333,
        host: config.host || "0.0.0.0"
    }, function (err, address) {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
    })
}

start()