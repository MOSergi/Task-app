import { AuthActionService } from "../../modules/Auth/services/auth.action.service";
import { TaskRepository } from "../../modules/Tasks/repository/task.repository";
import { TaskActionService } from "../../modules/Tasks/services/task.action.service";
import { TaskReadService } from "../../modules/Tasks/services/task.read.service";
import { UsersRepository } from "../../modules/Users/repository/users.repository";
import { UsersActionService } from "../../modules/Users/services/users.action.service";
import { UsersReadService } from "../../modules/Users/services/users.read.service";

//users
const usersRepository = new UsersRepository();
const usersReadService = new UsersReadService(usersRepository);
const usersActionService = new UsersActionService(usersRepository, usersReadService);

//auth
const authActionService = new AuthActionService(usersReadService);

//task
const taskRepository = new TaskRepository();
const taskReadSerive = new TaskReadService(taskRepository);
const taskActionService = new TaskActionService(taskRepository, taskReadSerive);

export const CustomDependencyContainer = {
    usersActionService : usersActionService,
    authActionService : authActionService,
    taskActionService : taskActionService,
    taskReadSerive : taskReadSerive
}