import { Router } from "express";
import usersRouter from "../modules/Users/router/users.router";

const appRouter = Router();

appRouter.use('/users', usersRouter)

export default appRouter;