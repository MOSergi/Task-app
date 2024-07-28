import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { passwordValidator } from "../../../common/utils/passwordValidator";
import { UsersRepository } from "../repository/users.repository";
import { CreateUserParams } from "./interfaces/CreateUserParams";
import { UpdateUserParams } from "./interfaces/UpdateUserParams";
import { UsersActionService as UsersActionServiceI } from "./interfaces/UsersActionService";
import { UsersReadService } from "./users.read.service";
import bcrypt from "bcryptjs";

export class UsersActionService implements UsersActionServiceI {

    private readonly usersRepository : UsersRepository;
    private readonly usersReadService : UsersReadService

    constructor(userRepository : UsersRepository, usersReadService : UsersReadService){
        this.usersRepository = userRepository;
        this.usersReadService = usersReadService;
    }

    async create(params: CreateUserParams) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(params.email)){
            new ExceptionThrower({
                status : 400,
                message : 'Invalid email'
            })
        }

        passwordValidator(params.password);

        const searchedUser = await this.usersReadService.getUserByEmail(params.email);

        if (searchedUser){
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

    async updateUserById(userId : number, params : UpdateUserParams){
        const user = await this.usersReadService.readById(userId);

        if (!user){
            new ExceptionThrower({
                status : 409,
                message : 'User provided doesnt exists'
            })
        }

        const valuesToUpdate : UpdateUserParams = {};

        if (params.name){
            valuesToUpdate.name = params.name;
        }

        if (params.password){
            passwordValidator(params.password);
            valuesToUpdate.password = bcrypt.hashSync(params.password, 10)
        }

        await this.usersRepository.updateUser(userId, valuesToUpdate);

        return await this.usersReadService.readById(userId);
    }
}