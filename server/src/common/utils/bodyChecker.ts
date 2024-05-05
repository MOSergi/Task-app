import { Request } from "express";
import { ExceptionThrower } from "./ExceptionThrower";

export const bodyRequiredChecker = (req : Request, paramsToSearch : string[]) : any =>{

    if (!req.body || Object.keys(req.body).length === 0){
        new ExceptionThrower({
            status : 400,
            message : 'For this request, body is required'
        });
    }

    const body = req.body;

    const parsedBody = Object.keys(body);

    for (const iterator of paramsToSearch) {
        if (!parsedBody.includes(iterator)){
            new ExceptionThrower({
                status : 400,
                message : `Body property ${iterator} are required`
            });
        }
    }

    return body;
}