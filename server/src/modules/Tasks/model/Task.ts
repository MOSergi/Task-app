import { DataTypes } from "sequelize";
import sequelizeConnection from "../../../db/config";

const Task = sequelizeConnection.define('Task', 
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
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        userId : {
            type : DataTypes.INTEGER
        }
    },
    {
        timestamps : false
    }
)

export default Task;
