import { Conditions, MysqlBaseRepository } from "../../../common/repositories/MysqlBaseRepository";
import User from "../model/User";
import { User as UserI } from "../model/User.interface";
import { CreateUserParams } from "../services/interfaces/CreateUserParams";

export class UsersRepository extends MysqlBaseRepository<typeof User, UserI> {
    constructor(){
        super(User);
    }

    async createUser(params : CreateUserParams){
        await this.create({
            name : params.name,
            email : params.email,
            password : params.password
        });
    }

    async getUsers(params : Conditions) {
        return await this.findAll(params);
    }
}