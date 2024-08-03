import { ReadService } from "../../../../common/interfaces/ReadService";
import { Task } from "../../model/Task.interface";
import { GetTaskParams } from "./GetTaskParams";

export interface TaskReadService extends ReadService<Task,GetTaskParams >{}