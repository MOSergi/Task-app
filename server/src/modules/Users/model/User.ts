import { DataTypes } from "sequelize";
import { dbConnectionConfig } from "../../../db/config";

const User = dbConnectionConfig().define('User', {
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

User.sync();
export default User;