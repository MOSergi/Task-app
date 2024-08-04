import { Router } from "express";
import { TasksActionController } from "../controller/tasks.action.controller";
import { validateTokenMiddleware } from "../../../common/middleware/validateTokenMiddleware";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { CustomDependencyContainer } from "../../../common/dependency_container/CustomeDependencyContainer";
import { TaskReadController } from "../controller/task.read.controller";

const tasksRouter = Router();

//action
const tasksActionController = new TasksActionController(CustomDependencyContainer.taskActionService);
//read
const taskReadController = new TaskReadController(CustomDependencyContainer.taskReadSerive); 

tasksRouter.post('/', validateTokenMiddleware, asyncHandler(tasksActionController.createTask.bind(tasksActionController)));
tasksRouter.get('/', validateTokenMiddleware, asyncHandler(taskReadController.readTasks.bind(taskReadController)));
tasksRouter.put('/:taskId', validateTokenMiddleware, asyncHandler(tasksActionController.updateTaskById.bind(tasksActionController)));

export default tasksRouter;