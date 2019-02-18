export class BaseException implements Error {
    name: string;
    message: string;
    stack?: string;
    myerror = true;

    constructor(msg: string = null) {
        this.message = msg || this.message;
    }
}