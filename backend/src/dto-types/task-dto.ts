import {TaskStatus} from "../enums/task-status";

export type TaskDto = {
    id: number;
    task: string;
    status: TaskStatus
}