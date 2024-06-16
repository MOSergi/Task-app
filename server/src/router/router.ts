import { Router } from "express";
import usersRouter from "../modules/Users/router/users.router";
import authRouter from "../modules/Auth/router/auth.router";

const appRouter = Router();

appRouter.use('/users', usersRouter),
appRouter.use('/auth', authRouter)

export default appRouter;