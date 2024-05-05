import { CreateUserParams } from "./CreateUserParams";

export interface UsersActionService {
    create : (params : CreateUserParams)=> Promise<void>
}