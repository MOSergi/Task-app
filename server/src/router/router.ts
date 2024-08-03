import { Router } from "express";
import usersRouter from "../modules/Users/router/users.router";
import authRouter from "../modules/Auth/router/auth.router";
import tasksRouter from "../modules/Tasks/router/tasks.router";

const appRouter = Router();

appRouter.use('/users', usersRouter),
appRouter.use('/auth', authRouter),
appRouter.use('/tasks', tasksRouter)

export default appRouter;