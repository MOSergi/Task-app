import { Request, Response } from "express";
import { bodyRequiredChecker } from "../../../common/utils/bodyChecker";
import { AuthActionService } from "../services/auth.action.service";

export class AuthActionController {
    private readonly authActionService : AuthActionService
    
    constructor(authActionService : AuthActionService){
        this.authActionService = authActionService;
    }

    async login(req : Request, res : Response){
        const bodyValues = bodyRequiredChecker(req, ["email", "password"]);

        const { email, password } = bodyValues;

        const token = await this.authActionService.login({email, password});

        res.status(200).json({
            statusCode : 200,
            message : 'User auth success',
            token
        })
    }
}