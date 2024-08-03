import { TaskRepository } from "../repository/task.repository";
import { GetTaskParams } from "./interfaces/GetTaskParams";
import { TaskReadService as TaskReadServiceI } from "./interfaces/TaskReadService";

export class TaskReadService implements TaskReadServiceI {
    private readonly taskRepository : TaskRepository;
    
    constructor(taskRepository : TaskRepository){
        this.taskRepository = taskRepository;
    }

    //pending implement validations
    async read(params : GetTaskParams){
        return [];
    }
}