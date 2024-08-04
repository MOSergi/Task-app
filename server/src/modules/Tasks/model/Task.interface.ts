import { User } from "../../Users/model/User.interface";

export interface Task {
    id : number,
    title : string,
    description : string,
    completed : number,
    User: User,
    userId: number 
}