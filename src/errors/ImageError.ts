import { AppError } from "./AppError"

export class ImageError extends AppError{
    constructor(message:string = "Only images allowed"){
        super(message,400)
        this.name = new.target.name 
        this.error = "bad request"

    }
}