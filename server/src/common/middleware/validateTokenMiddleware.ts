import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ExceptionThrower } from "../utils/ExceptionThrower";

interface RequestWithUserData extends Request {
    userData?: {
        id : number
        email : string,
    }
}

export const validateTokenMiddleware = (req : RequestWithUserData, res : Response, next : NextFunction)=>{
    const requestToken = req.headers['authorization'];

    if (!requestToken){
        new ExceptionThrower({
            status : 409,
            message : 'Token not provided'
        })
    }

    const token = requestToken?.split(' ')[1];

    if (!token){
        new ExceptionThrower({
            status : 500,
            message : 'Unexpected error'
        });
    }

    jwt.verify(token!, process.env.JWT_SECRET as string, (err, decoded)=>{
        if (err){
            new ExceptionThrower({
                status : 401,
                message : 'Token is invalid or expired'
            })
        }

        const tokenData = decoded as any;

        req.userData = {
            id : tokenData.id,
            email : tokenData.email,
        };
    })

    next();
}