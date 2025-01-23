import Task, { ITask, ITask as TaskType } from "../models/task.model";

export class TaskService {

/**
 * Crea una nueva tarea en la base de datos.
 *
 * @param {ITask} task - Objeto que representa la tarea a crear.
 * @returns {Promise<TaskType>} - Promesa que resuelve con la tarea creada.
 * @throws {Error} - Lanza un error si ocurre un problema al crear la tarea.
 */
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

/**
 * Obtiene una tarea por su ID.
 * 
 * @param {string} taskID - El ID de la tarea a consultar.
 * @returns {Promise<TaskType | null>} - Una promesa que resuelve con la tarea encontrada o null si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre un problema al consultar la tarea.
 */
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

/**
 * Actualiza una tarea existente en la base de datos.
 *
 * @param {string} taskID - El ID de la tarea que se va a actualizar.
 * @param {Partial<ITask>} updatedTask - Un objeto que contiene los campos de la tarea que se deben actualizar.
 * @returns {Promise<TaskType | null>} - Una promesa que resuelve con la tarea actualizada o null si no se encuentra la tarea.
 * @throws {Error} - Lanza un error si ocurre un problema durante la actualización de la tarea.
 */
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

/**
 * Elimina una tarea por su ID.
 *
 * @param {string} taskID - El ID de la tarea a eliminar.
 * @returns {Promise<TaskType | null>} - La tarea eliminada o null si no se encontró.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar la tarea.
 */
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


/**
 * Obtiene las tareas pendientes de un usuario específico.
 *
 * @param {string} userID - El ID del usuario para el cual se desean obtener las tareas pendientes.
 * @returns {Promise<TaskType[]>} - Una promesa que resuelve con un arreglo de tareas pendientes.
 * @throws {Error} - Lanza un error si ocurre un problema al consultar las tareas pendientes.
 */
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

/**
 * Obtiene una lista de tareas completadas para un usuario específico.
 *
 * @param {string} userID - El ID del usuario para el cual se desean obtener las tareas completadas.
 * @returns {Promise<TaskType[]>} - Una promesa que resuelve con una lista de tareas completadas.
 * @throws {Error} - Lanza un error si ocurre un problema al consultar las tareas completadas.
 */
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

/**
 * Obtiene las tareas de alta prioridad pendientes para un usuario específico.
 *
 * @param {string} userID - El ID del usuario para el cual se desean obtener las tareas.
 * @returns {Promise<TaskType[]>} - Una promesa que resuelve con un arreglo de tareas de alta prioridad pendientes.
 * @throws {Error} - Lanza un error si ocurre un problema al consultar las tareas.
 */
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

/**
 * Obtiene las tareas de prioridad media pendientes para un usuario específico.
 *
 * @param {string} userID - El ID del usuario para el cual se desean obtener las tareas.
 * @returns {Promise<TaskType[]>} - Una promesa que resuelve con un arreglo de tareas de tipo TaskType.
 * @throws {Error} - Lanza un error si ocurre algún problema al consultar las tareas.
 */
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

/**
 * Obtiene las tareas de baja prioridad pendientes para un usuario específico.
 *
 * @param {string} userID - El ID del usuario para el cual se desean obtener las tareas.
 * @returns {Promise<TaskType[]>} - Una promesa que resuelve con un arreglo de tareas de baja prioridad pendientes.
 * @throws {Error} - Lanza un error si ocurre un problema al consultar las tareas.
 */
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
