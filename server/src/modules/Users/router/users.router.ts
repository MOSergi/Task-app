import { Router } from "express";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { UsersActionController } from "../controller/users.action.controller";

const usersRouter = Router();

const usersActionController = new UsersActionController();

usersRouter.post('/', asyncHandler(usersActionController.createUsers.bind(usersActionController)));

export default usersRouter;