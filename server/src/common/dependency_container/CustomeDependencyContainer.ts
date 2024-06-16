import { UsersRepository } from "../../modules/Users/repository/users.repository";
import { UsersActionService } from "../../modules/Users/services/users.action.service";
import { UsersReadService } from "../../modules/Users/services/users.read.service";

export const CustomDependencyContainer = {
    usersActionService : new UsersActionService(
        new UsersRepository(),
        new UsersReadService(
            new UsersRepository()
        )
    ),
}