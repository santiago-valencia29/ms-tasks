import { Schema, Document, model } from "mongoose";

export interface ITask extends Document {
  user: string;
  name: string;
  description?: string;
  state: string;
  priority: string;
  dueDate: string;
}

const taskSchema = new Schema<ITask>({
  user: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  state: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: String, required: true },
}, { timestamps: true });

const Task = model<ITask>("Task", taskSchema);

export default Task;

