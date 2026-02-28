import { AppError } from "./AppError";


export class AlreadyUserError extends AppError{
    constructor(message:string = "User Already Exist"){
        super(message,409)
        this.error = "Conflict"
    }
}