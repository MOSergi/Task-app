import { ExceptionThrower } from "../../../common/utils/ExceptionThrower";
import { TaskRepository } from "../repository/task.repository";
import { CreateTaskParams } from "./interfaces/CreateTaskParams";
import { TaskActionService as TaskActionServiceI } from "./interfaces/TaskActionService";
import { UpdateTaskParams } from "./interfaces/UpdateTaskParams";
import { TaskReadService } from "./task.read.service";

export class TaskActionService implements TaskActionServiceI {
    private readonly taskRepository : TaskRepository;
    private readonly taskReadService : TaskReadService;
    
    constructor(taskRepository : TaskRepository, taskReadService : TaskReadService){
        this.taskRepository = taskRepository;
        this.taskReadService = taskReadService;
    }

    async create(params : CreateTaskParams){
        try {
            const creationParams = {
                title : params.title,
                description : params.description,
                completed : 0,
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

    async updateById(id: number, params: UpdateTaskParams){
        const task = await this.taskReadService.read({
            userId : params.userId
        });

        if(task.length === 0){
            new ExceptionThrower({
                status : 409,
                message : 'Invalid task to update. You are not the owner of the task'
            })
        }

        const updateValues : any = {};

        if (params.completed !== undefined){
            updateValues.completed = params.completed; 
        }

        if (params.title){
            updateValues.title = params.title; 
        }

        if (params.description){
            updateValues.description = params.description; 
        }

        await this.taskRepository.updateTaskById(id, updateValues);

        const updatedTask = await this.taskReadService.readTaskById(id);

        return updatedTask!;
    }
}