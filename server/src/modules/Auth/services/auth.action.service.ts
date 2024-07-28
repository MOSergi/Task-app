import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { UsersReadService } from "../../Users/services/users.read.service";
import { LoginParams } from "../interface/LoginParams";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthActionService {
    private readonly usersReadService : UsersReadService
    
    constructor(usersReadSerice : UsersReadService){
        this.usersReadService = usersReadSerice;
    }

    async login(params : LoginParams){
        const user = await this.usersReadService.getUserByEmail(params.email);

        if (!user){
            new ExceptionThrower({
                status : 400,
                message : 'Email provided doesnt exists'
            })
        }

        const userPassword = user!.password;

        if (!bcrypt.compareSync(params.password, userPassword)){
            new ExceptionThrower({
                status : 401,
                message : 'Incorrect password'
            })
        }

        const token = jwt.sign({
            id : user?.id,
            email : user?.email
        }, process.env.JWT_SECRET as string, {
            expiresIn : '2h'
        });

        return token;
    }
}