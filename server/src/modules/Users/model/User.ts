import { DataTypes } from "sequelize";
import sequelizeConnection from "../../../db/config";
import { Task } from "../../Tasks/model/Task";

const User = sequelizeConnection.define('User', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
    },
    email : {
        type : DataTypes.STRING,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        validate : {
            min : 8
        }
    }
}, {
    timestamps : false
})

User.hasMany(Task, { foreignKey : 'userId' });
Task.belongsTo(User, { foreignKey : 'userId' });

export default User;