import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { TaskRepository } from "../repository/task.repository";
import { CreateTaskParams } from "./interfaces/CreateTaskParams";
import { TaskActionService as TaskActionServiceI } from "./interfaces/TaskActionService";

export class TaskActionService implements TaskActionServiceI {
    private readonly taskRepository : TaskRepository;
    
    constructor(taskRepository : TaskRepository){
        this.taskRepository = taskRepository;
    }

    async create(params : CreateTaskParams){
        try {
            const creationParams = {
                title : params.title,
                description : params.description,
                completed : false,
                userId : params.userId
            }

            await this.taskRepository.createTask(creationParams);
        } catch (err){
            console.error(err);
            new ExceptionThrower({
                message : 'Error during task creation. Posible save error',
                status : 409
            });
        }
    }
}