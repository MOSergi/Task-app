import { DataTypes } from "sequelize";
import sequelizeConnection from "../../../db/config";

export const Task = sequelizeConnection.define('Task', 
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
        },
        description: {
            type : DataTypes.STRING,
        },
        completed : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        user : {
            type : DataTypes.INTEGER,
            field : 'userId'
        }
    },
    {
        timestamps : false
    }
)
