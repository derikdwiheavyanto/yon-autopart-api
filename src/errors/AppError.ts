export class AppError extends Error{
    public statusCode:number;
    public error:string;

    constructor(message:string,statusCode:number){
        super(message)
        this.statusCode = statusCode
        this.name = new.target.name 
        this.error = "AppError"
    }
    
}