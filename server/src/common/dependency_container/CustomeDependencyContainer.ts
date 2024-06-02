import { UsersRepository } from "../../modules/Users/repositorie/users.repository";
import { UsersActionService } from "../../modules/Users/services/users.action.service";

export const CustomDependencyContainer = {
    usersActionService : new UsersActionService(
        new UsersRepository()
    )
}