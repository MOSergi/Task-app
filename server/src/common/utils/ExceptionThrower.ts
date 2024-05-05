interface ExceptionThrowerParams {
    status : number,
    message : string
}

export class ExceptionThrower {
    constructor(params : ExceptionThrowerParams){
        throw params;
    }
}