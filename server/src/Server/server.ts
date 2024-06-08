import express, { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import sequelizeConnection from "../db/config";
import appRouter from "../router/router";

export class Server {

    private app : Application = express();
    private corsOptions : CorsOptions = {
        origin : ['http://localhost:5173', 'https://mosergitech.com']
    };

    public async startApp(){
        this.config();
        await this.dbConnection();
        this.middlewares();
        this.routes();
        this.app.use(this.errorHandler);
    }

    private config(){
        this.app.set('PORT', process.env.APP_PORT || 8082);
    }

    private async dbConnection(){
        try {
            await sequelizeConnection.query('SELECT 1 + 1 AS WORKS');
        } catch (error){
            throw error;
        }
    }

    private middlewares(){
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
    }

    private routes(){
        this.app.use('/task-app/api/v1', appRouter);
    }

    private errorHandler(err: any, _req : Request, res: Response, next: NextFunction){
        if (res.headersSent){
            return next(err);
        }

        if (err.status && err.message){
            res.status(err.status).json({
                statusCode : err.status,
                message : err.message
            })
        } else if (err.errors[0].type === 'Validation error'){
            console.log(err);
            res.status(409).json({
                field : err.errors[0].path,
                message : err.errors[0].message
            })
        } else {
            console.log(err)
            res.status(500).json({
                statuscode : 500,
                message : 'Unexpected error'
            })
        }
    }

    public listen(){
        this.app.listen(this.app.get('PORT'), ()=>{
            console.log(`App listen in port ${this.app.get('PORT')}`);
        });
    }
}