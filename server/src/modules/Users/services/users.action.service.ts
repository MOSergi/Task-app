import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { UsersRepository } from "../repository/users.repository";
import { CreateUserParams } from "./interfaces/CreateUserParams";
import { UsersActionService as UsersActionServiceI } from "./interfaces/UsersActionService";
import bcrypt from "bcryptjs";

export class UsersActionService implements UsersActionServiceI {

    private readonly usersRepository : UsersRepository;

    constructor(userRepository : UsersRepository){
        this.usersRepository = userRepository;
    }

    async create(params: CreateUserParams) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(params.email)){
            new ExceptionThrower({
                status : 400,
                message : 'Invalid email'
            })
        }

        if (params.password.length < 8){
            new ExceptionThrower({
                status : 400,
                message : 'Password is to short'
            })
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

        if (!strongPasswordRegex.test(params.password)){
            new ExceptionThrower({
                status : 400,
                message : 'Password is to weak. Password must contain number, letters and Capital Letters'
            })
        }

        const searchedUser = await this.getUserByEmail(params.email);

        if (searchedUser.length !== 0){
            new ExceptionThrower({
                status : 409,
                message : 'Invalid email. Try other'
            })
        }

        const encrypTedPassword = bcrypt.hashSync(params.password, 10);

        await this.usersRepository.createUser({
            email : params.email,
            name : params.name,
            password : encrypTedPassword
        });
    }

    async getUserByEmail(email : string){
        const user = await this.usersRepository.getUsers({
            condition : {
                where : {
                    email
                }
            }
        });

        return user;
    }
}