import { Router } from "express";

const authRouter = Router();

authRouter.post('/login', ()=>{
    console.log('login');
})

export default authRouter;