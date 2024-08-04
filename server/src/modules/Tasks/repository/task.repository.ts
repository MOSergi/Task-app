import { Conditions, MysqlBaseRepository } from "../../../common/repositories/MysqlBaseRepository";
import Task from "../model/Task"; "../model/Task";
import { Task as TaskI } from "../model/Task.interface";
import { CreateTaskParams } from "../services/interfaces/CreateTaskParams";
import { UpdateTaskParams } from "../services/interfaces/UpdateTaskParams";

export class TaskRepository extends MysqlBaseRepository<typeof Task, TaskI> {
    constructor(){
        super(Task);
    }

    async createTask(params : Omit<CreateTaskParams, "userId">){
        return await this.create(params);
    }

    async readTasks(params : Conditions){
        return await this.findAll(params);
    }

    async updateTaskById(taskId : number, params : Omit<UpdateTaskParams, "userId">){
        console.log(params);
        await this.update(taskId, params);
    }

    async readTaskById(taskId : number){
        return await this.findById(taskId);
    }
}