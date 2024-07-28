import { ReadService } from "../../../../common/interfaces/ReadService";
import User from "../../model/User";

export interface UserReadService extends ReadService<typeof User, any> {
    getUserByEmail : (email : string)=> Promise<typeof User[]>
}