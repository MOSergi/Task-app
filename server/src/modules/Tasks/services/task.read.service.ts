import { Op } from "sequelize";
import User from "../../Users/model/User";
import { TaskRepository } from "../repository/task.repository";
import { GetTaskParams } from "./interfaces/GetTaskParams";
import { TaskReadService as TaskReadServiceI } from "./interfaces/TaskReadService";

export class TaskReadService implements TaskReadServiceI {
    private readonly taskRepository : TaskRepository;
    
    constructor(taskRepository : TaskRepository){
        this.taskRepository = taskRepository;
    }

    
    async read(params : GetTaskParams){
        let filters : any = {};

        if (params.filters){
            if (params.filters.title){
                filters.title = {
                    [Op.substring] : params.filters.title
                } ;
            }

            if (params.filters.description){
                filters.description = {
                    [Op.substring] : params.filters.description
                } 
            }

            if (params.filters.completed){
                filters.completed = params.filters.completed
            }
        }

        const results = await this.taskRepository.readTasks({
            condition : {
                where : {
                    ...filters,
                    userId : params.userId
                }
            },
            includeModel : {
                model : User,
                required : true
            },
            limit : params.limit ? Number(params.limit) : 50,
            offset : params.offset ? Number(params.offset) : 0
        });

        return results;
    }

    async readTaskById(taskId : number){
        return await this.taskRepository.readTaskById(taskId);
    }
}