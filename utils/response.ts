import { ZodError, z } from "zod"


function responseFormater(statusCode: number, message: string, data: any) {
    return {
        status_code: statusCode,
        message: message,
        data: data
    }
}

function responseSchema<T extends z.ZodTypeAny>(
    statusCode: number,
    message: string,
    dataSchema: T
) {
    return z.object({
        status_code: z.literal(statusCode),
        message: z.literal(message),
        data: dataSchema
    })
}

function errorFormater(statusCode: number, typeError: string, message: any) {
    return {
        status_code: statusCode,
        error: typeError,
        message: message
    }
}

function responseErrorSchema(
    statusCode: number,
    error: string,
    message: any
): z.ZodTypeAny {
    return z.object({
        status_code: z.literal(statusCode),
        error: z.literal(error),
        message: z.literal(message)
    })
}

function zodErrorFormater(error: any): { statusCode: number, errorFormat: {} } {
    const formatted: Record<string, string[]> = {}

    if (!error.validation) {
        return {
            statusCode: 500,
            errorFormat: errorFormater(500, "Internal Server Error", "Unknown validation error")
        }
    }

    for (const err of error.validation) {
        const field = err.instancePath.replace("/", "")

        if (!formatted[field]) {
            formatted[field] = []
        }

        formatted[field].push(err.message ?? "")
    }

    return {
        statusCode: 400,
        errorFormat: errorFormater(400, "Bad Request", formatted)
    }
}

export { responseSchema, responseFormater, errorFormater, responseErrorSchema, zodErrorFormater }