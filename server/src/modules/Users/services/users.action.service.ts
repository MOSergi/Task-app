import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { UsersRepository } from "../repositorie/users.repository";
import { CreateUserParams } from "./interfaces/CreateUserParams";
import { UsersActionService as UsersActionServiceI } from "./interfaces/UsersActionService";

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

        //Here we need to see if there is a user with that email and make a hash of the password

        await this.usersRepository.createUser({...params});
    }
}