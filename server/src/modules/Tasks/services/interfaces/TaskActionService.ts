import { ActionService } from "../../../../common/interfaces/ActionService";
import { Task } from "../../model/Task.interface";
import { CreateTaskParams } from "./CreateTaskParams";

export interface TaskActionService extends ActionService<Task, CreateTaskParams>{};