import { ReadService } from "../../../../common/interfaces/ReadService";
import { User } from "../../model/User.interface";

export interface UserReadService extends ReadService<User, any> {
    getUserByEmail : (email : string)=> Promise<User | null>
}