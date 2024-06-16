import { UsersRepository } from "../../modules/Users/repository/users.repository";
import { UsersActionService } from "../../modules/Users/services/users.action.service";
import { UsersReadService } from "../../modules/Users/services/users.read.service";

const usersRepository = new UsersRepository();
const usersReadService = new UsersReadService(usersRepository);
const usersActionService = new UsersActionService(usersRepository, usersReadService);

export const CustomDependencyContainer = {
    usersActionService : usersActionService,
}