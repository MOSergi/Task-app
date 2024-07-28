import { Request, Response } from "express";
import { UsersActionService } from "../services/users.action.service";
import { bodyOptionalChecker, bodyRequiredChecker } from "../../../common/utils/bodyChecker";
import { urlParamChecker } from "../../../common/utils/urlParamChecker";

export class UsersActionController {
    private readonly usersActionService : UsersActionService;
    
    constructor(usersActionService : UsersActionService){
        this.usersActionService = usersActionService;
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

    async updateUserById(req : Request, res : Response){
        const userId = urlParamChecker("number", req.params.userId ? req.params.userId as string : undefined);

        const values = bodyOptionalChecker(req, ['name', 'password']);

        const updatedUser = await this.usersActionService.updateUserById(Number(userId), {
            name : values.name,
            password : values.password
        });

        res.status(200).json({
            statusCode : 200,
            message : 'User updated sucessfully',
            updatedProperties : Object.keys(values),
            updatedUser
        })
    }
}