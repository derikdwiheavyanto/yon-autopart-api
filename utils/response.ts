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

function zodErrorFormater(error: ZodError): { statusCode: number, errorFormat: {} } {
    const flaten = z.flattenError(error)
    const fieldError = flaten.fieldErrors


    return {
        statusCode: 400,
        errorFormat: errorFormater(400, "bad request", fieldError)
    }
}

export { responseSchema, responseFormater, errorFormater, responseErrorSchema, zodErrorFormater }