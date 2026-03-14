import { AppError } from "../AppError"


export class StatusTranstionError extends AppError{
    constructor(message:string = "Invalid Status Transiton"){
        super(message,400)
        this.error = "Bad Request"
    }
}