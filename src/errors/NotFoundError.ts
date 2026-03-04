import { AppError } from "./AppError"

export class NotFoundError extends AppError{
    constructor(message:string = "Error Not Found"){
        super(message,404)
        this.name = new.target.name 
        this.error = "Error Not Found"

    }
}