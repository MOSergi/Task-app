import { ActionService } from "../../../../common/interfaces/ActionService";
import { Task } from "../../model/Task.interface";
import { CreateTaskParams } from "./CreateTaskParams";
import { UpdateTaskParams } from "./UpdateTaskParams";

export interface TaskActionService extends ActionService<Task, CreateTaskParams, UpdateTaskParams>{
    deleteByIdWithOwnerCheck(userId : number, taskId : number) : Promise<void>
};