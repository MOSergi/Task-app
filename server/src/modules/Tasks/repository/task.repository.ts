import { Conditions, MysqlBaseRepository } from "../../../common/repositories/MysqlBaseRepository";
import Task from "../model/Task"; "../model/Task";
import { Task as TaskI } from "../model/Task.interface";
import { CreateTaskParams } from "../services/interfaces/CreateTaskParams";

export class TaskRepository extends MysqlBaseRepository<typeof Task, TaskI> {
    constructor(){
        super(Task);
    }

    async createTask(params : CreateTaskParams){
        return await this.create(params);
    }

    async readTasks(params : Conditions){
        return await this.findAll(params);
    }
}