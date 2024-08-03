import { Response } from "express";
import { TaskActionService } from "../services/task.action.service";
import { bodyRequiredChecker } from "../../../common/utils/bodyChecker";
import { RequestWithUserData } from "../../../common/middleware/validateTokenMiddleware";

export class TasksActionController {
    private readonly taskActionService : TaskActionService;

    constructor(taskActionService : TaskActionService){
        this.taskActionService = taskActionService;
    }

    async createTask(req : RequestWithUserData, res : Response){
        const userId = req.userData!.id;
        const bodyValues = bodyRequiredChecker(req, ['title', 'description']);

        const { title, description } = bodyValues;

        const params = {
            userId,
            title,
            description
        }

        await this.taskActionService.create(params);

        res.status(201).json({
            statusCode : 201,
            message : 'Task created',
            createParams : {
                assignedToUser : userId,
                title,
                description
            }
        })
    }
}