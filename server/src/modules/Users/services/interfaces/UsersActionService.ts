import { ActionService } from "../../../../common/interfaces/ActionService";
import { User } from "../../model/User.interface";
import { CreateUserParams } from "./CreateUserParams";

export interface UsersActionService extends ActionService<User, CreateUserParams> {}