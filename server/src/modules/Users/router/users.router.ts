import { Router } from "express";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { UsersActionController } from "../controller/users.action.controller";
import { CustomDependencyContainer } from "../../../common/dependency_container/CustomeDependencyContainer";
import { validateTokenMiddleware } from "../../../common/middleware/validateTokenMiddleware";

const usersRouter = Router();

const usersActionController = new UsersActionController(CustomDependencyContainer.usersActionService);

usersRouter.post('/', asyncHandler(usersActionController.createUsers.bind(usersActionController)));
usersRouter.put('/:userId', validateTokenMiddleware, asyncHandler(usersActionController.updateUserById.bind(usersActionController)));

export default usersRouter;