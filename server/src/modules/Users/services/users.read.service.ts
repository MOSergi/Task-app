import { UsersRepository } from "../repository/users.repository";
import { UserReadService as UserReadServiceI } from "./interfaces/UserReadService";

export class UsersReadService implements UserReadServiceI {
    private usersRepository : UsersRepository;
    
    constructor(usersRepository : UsersRepository){
        this.usersRepository = usersRepository;
    }

    async getUserByEmail(email : string) {
        const user = await this.usersRepository.getUsers({
            condition : {
                where : {
                    email
                }
            }
        });

        if (user.length === 0){
            return null;
        }


        return user[0];
    }

    async readById(id: number) {
        const user = await this.usersRepository.getUsers({
            condition : {
                where : {
                    id
                }
            }
        })

        if (!user){
            return null;
        }

        return user[0];
    }
}