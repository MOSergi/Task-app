import { Response } from "express";
import { RequestWithUserData } from "../../../common/middleware/validateTokenMiddleware";
import { TaskReadService } from "../services/task.read.service";
import { getQueryFiltersAndPagination } from "../../../common/utils/getQueryFiltersAndPagination";

export class TaskReadController {
    private readonly taskReadService : TaskReadService;

    constructor(taskReadService : TaskReadService){
        this.taskReadService = taskReadService;
    }

    async readTasks(req : RequestWithUserData, res : Response){
        const [filters, limit, offset] = getQueryFiltersAndPagination(req);

        const data = await this.taskReadService.read({
            filters,
            limit,
            offset
        });

        res.status(200).json({
            statusCode : 200,
            message : 'All tasks',
            data
        })
    }
}