import { BaseRepository } from "../../../common/repositories/BaseRepository";
import User from "../model/User";
import { CreateUserParams } from "../services/interfaces/CreateUserParams";

export class UsersRepository extends BaseRepository<typeof User> {
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
}   