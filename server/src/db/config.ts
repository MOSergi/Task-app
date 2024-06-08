import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize({
    host: process.env.ENVIROMENT_MODE === 'Dev' ? 'localhost': 'mysql-task-container',
    database : process.env.MYSQL_DATABASE,
    port: 3306,
    username : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    dialect : "mysql",
    logging : false
});

export default sequelizeConnection;