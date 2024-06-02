import { Router } from "express";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { UsersActionController } from "../controller/users.action.controller";
import { CustomDependencyContainer } from "../../../common/dependenci_container/CustomeDependencyContainer";

const usersRouter = Router();

const usersActionController = new UsersActionController(CustomDependencyContainer.usersActionService);

usersRouter.post('/', asyncHandler(usersActionController.createUsers.bind(usersActionController)));

export default usersRouter;