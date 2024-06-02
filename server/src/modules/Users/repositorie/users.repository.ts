import { MysqlBaseRepository } from "../../../common/repositories/MysqlBaseRepository";
import User from "../model/User";
import { CreateUserParams } from "../services/interfaces/CreateUserParams";

export class UsersRepository extends MysqlBaseRepository<typeof User> {
    constructor(){
        super(User);
    }

    async createUser(params : CreateUserParams){
        await User.create({
            name : params.name,
            email : params.email,
            password : params.password
        });
    }
}