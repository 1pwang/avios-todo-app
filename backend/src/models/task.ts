import mongoose, { Document } from 'mongoose';
import { TaskStatus } from '../enums/task-status';

export interface TaskDocument extends Document {
    task: string;
    status: TaskStatus;
}

const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskStatus), required: true },
});

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
