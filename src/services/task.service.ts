import Task, { ITask, ITask as TaskType } from "../models/task.model";

export class TaskService {

  static async createTask(task: ITask): Promise<TaskType> {
    try {
      const newTask = new Task({
        ...task,
      });

      await newTask.save();

      return newTask;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al crear la tarea: " + error.message);
      } else {
        throw new Error("Error al crear la tarea");
      }
    }
  }

  static async getTask(taskID: string): Promise<TaskType | null> {
    try {
      const task = await Task.findById(taskID).exec();
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al consultar la tarea: " + error.message);
      } else {
        throw new Error("Error al consultar la tarea");
      }
    }
  }

  static async updateTask(
    taskID: string,
    updatedTask: Partial<ITask>
  ): Promise<TaskType | null> {
    try {
      const task = await Task.findByIdAndUpdate(taskID, updatedTask, {
        new: true,
      }).exec();
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al actualizar la tarea: " + error.message);
      } else {
        throw new Error("Error al actualizar la tarea");
      }
    }
  }

  static async deleteTask(taskID: string): Promise<TaskType | null> {
    try {
      const task = await Task.findByIdAndDelete(taskID);
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al eliminar la tarea: " + error.message);
      } else {
        throw new Error("Error al eliminar la tarea");
      }
    }
  }

  static async getTasksPending(userID: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({ user: userID, state: "pendiente" })
        .sort({ createdAt: "desc" })
        .exec();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error al consultar las tareas pendientes: " + error.message
        );
      } else {
        throw new Error("Error al consultar las tareas pendientes");
      }
    }
  }

  static async getTasksComplete(userID: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({ user: userID, state: "completada" })
        .sort({ createdAt: "desc" })
        .exec();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error al consultar las tareas completadas: " + error.message
        );
      } else {
        throw new Error("Error al consultar las tareas completadas");
      }
    }
  }

  static async getTasksHigh(userID: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({
        user: userID,
        priority: "alta",
        state: "pendiente",
      })
        .sort({ createdAt: "desc" })
        .exec();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error al consultar las tareas de alta prioridad pendientes: " +
            error.message
        );
      } else {
        throw new Error(
          "Error al consultar las tareas de alta prioridad pendientes"
        );
      }
    }
  }

  static async getTasksMean(userID: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({
        user: userID,
        priority: "media",
        state: "pendiente",
      })
        .sort({ createdAt: "desc" })
        .exec();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error al consultar las tareas de prioridad media pendientes: " +
            error.message
        );
      } else {
        throw new Error(
          "Error al consultar las tareas de prioridad media pendientes"
        );
      }
    }
  }

  static async getTasksLow(userID: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({
        user: userID,
        priority: "baja",
        state: "pendiente",
      })
        .sort({ createdAt: "desc" })
        .exec();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Error al consultar las tareas de baja prioridad pendientes: " +
            error.message
        );
      } else {
        throw new Error(
          "Error al consultar las tareas de baja prioridad pendientes"
        );
      }
    }
  }
}
