import { FastifyError, FastifyReply, FastifyRequest } from "fastify"



// 🎨 ANSI Colors
const colors = {
    green: (t: string) => `\x1b[32m${t}\x1b[0m`,
    yellow: (t: string) => `\x1b[33m${t}\x1b[0m`,
    red: (t: string) => `\x1b[31m${t}\x1b[0m`,
    cyan: (t: string) => `\x1b[36m${t}\x1b[0m`,
    blue: (t: string) => `\x1b[34m${t}\x1b[0m`,
    gray: (t: string) => `\x1b[90m${t}\x1b[0m`,
}

function colorStatus(status: number) {
    if (status >= 500) return colors.red(String(status))
    if (status >= 400) return colors.red(String(status))
    if (status >= 300) return colors.yellow(String(status))
    if (status >= 200) return colors.green(String(status))
    return colors.cyan(String(status))
}

function colorMethod(method: string) {
    switch (method) {
        case "GET":
            return colors.green(method)
        case "POST":
            return colors.blue(method)
        case "PUT":
            return colors.yellow(method)
        case "DELETE":
            return colors.red(method)
        default:
            return colors.cyan(method)
    }
}


async function onRequestLogging(
    request: FastifyRequest,
    reply: FastifyReply
) {
    request.setDecorator<number>('startTime',Date.now()) 
}

async function onResponseLogging(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const startTime = request.getDecorator<number>('startTime')
    const isError = request.getDecorator<boolean>('isError')
    if (isError) return

    const duration = Date.now() - (startTime ?? Date.now())

    const method = colorMethod(request.method).padEnd(6)
    const url = request.url.padEnd(25)
    const status = colorStatus(reply.statusCode)
    const time = colors.gray(`${duration}ms`)

    request.log.info(
        `${method} ${url} ${status} ${time}`
    )
}

async function onErrorLogging(
    request: FastifyRequest,
    reply: FastifyReply,
    error: FastifyError
) {
    const startTime = request.getDecorator<number>('startTime')
    request.setDecorator<boolean>('isError',true) 

    const duration =
        Date.now() - (startTime ?? Date.now())

    const method = colorMethod(request.method.padEnd(6))
    const url = request.url.padEnd(25)
    const status = colors.red(String(error.statusCode ?? 500))
    const time = colors.gray(`${duration}ms`)

    request.log.error(
        `${method} ${url} ${status} ${time}`
    )

    request.log.error(colors.red(`Message: ${error.name} ${error.message}`))

    //   if (process.env.NODE_ENV !== "production") {
    //     request.log.error(colors.gray(error.stack ?? ""))
    //   }
}

export { onRequestLogging, onResponseLogging, onErrorLogging }