import { Router } from "express";
import { AuthActionController } from "../controllers/auth.action.controller";
import { CustomDependencyContainer } from "../../../common/dependency_container/CustomeDependencyContainer";
import { asyncHandler } from "../../../common/utils/asyncHandler";

const authRouter = Router();
const authActionController = new AuthActionController(CustomDependencyContainer.authActionService);


authRouter.post('/login', asyncHandler(authActionController.login.bind(authActionController)));

export default authRouter;