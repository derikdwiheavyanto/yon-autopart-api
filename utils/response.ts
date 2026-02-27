import { ZodError,z } from "zod"


function responseFormater(statusCode: number, message: string, data: any) {
    return {
        status_code: statusCode,
        message: message,
        data: data
    }
}

function errorFormater(statusCode: number, typeError:string,message: any) {
    return {
        status_code: statusCode,
        error: typeError,
        message: message
    }
}

function zodErrorFormater(error:ZodError):{statusCode:number,errorFormat:{}}{
    const flaten = z.flattenError(error)
    const fieldError = flaten.fieldErrors


    return {
        statusCode: 400,
        errorFormat: errorFormater(400,"bad request",fieldError)
    }
}

export { responseFormater, errorFormater,zodErrorFormater }