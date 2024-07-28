import { ActionService } from "../../../../common/interfaces/ActionService";
import User from "../../model/User";
import { CreateUserParams } from "./CreateUserParams";

export interface UsersActionService extends ActionService<typeof User, CreateUserParams> {}