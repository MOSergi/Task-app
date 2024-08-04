import { Response } from "express";
import { TaskActionService } from "../services/task.action.service";
import { bodyOptionalChecker, bodyRequiredChecker } from "../../../common/utils/bodyChecker";
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

    async updateTaskById(req : RequestWithUserData, res : Response){
        const userId = req.userData!.id;
        const taskId = req.params.taskId;
        const bodyValues = bodyOptionalChecker(req, ["title", "description", "completed"]);

        const { title, description, completed } = bodyValues;

        const params = {
            userId,
            title,
            description,
            completed
        }

        const updatedTask = await this.taskActionService.updateById(Number(taskId), params);

        res.status(200).json({
            statusCode : 200,
            message : `Task ${taskId} was updated`,
            updatedTask
        })
    }

    async deleteTaskById(req : RequestWithUserData, res : Response){
        const userId = req.userData!.id;
        const taskId = req.params.taskId;

        await this.taskActionService.deleteByIdWithOwnerCheck(userId, Number(taskId));

        res.status(200).json({
            statusCode : 200,
            message : `Task ${taskId} was deleted`
        })
    }
}