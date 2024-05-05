import { Request, Response } from "express";
import { UsersActionService } from "../services/users.action.service";
import { bodyRequiredChecker } from "../../../common/utils/bodyChecker";

export class UsersActionController {
    private readonly usersActionService : UsersActionService;
    
    constructor(){
        this.usersActionService = new UsersActionService();
    }

    async createUsers(req : Request, res : Response){
        const values = bodyRequiredChecker(req, ['name', 'email', 'password']);

        await this.usersActionService.create({
            email : values.email,
            name : values.name,
            password : values.password
        });

        res.status(201).json({
            statusCode : 201,
            message : 'User created sucessfully',
            createdUser : values
        })
    }
}