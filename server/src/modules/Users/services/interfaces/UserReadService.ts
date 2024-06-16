import User from "../../model/User";

export interface UserReadService {
    getUserByEmail : (email : string)=> Promise<typeof User[]> 
}