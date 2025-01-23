import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task.model';

/**
 * Crea una nueva tarea.
 * 
 * @param req - Objeto de solicitud que contiene los datos de la tarea en el cuerpo de la solicitud.
 * @param res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 * 
 * @returns Una respuesta JSON con un mensaje de éxito y la tarea creada, o un mensaje de error en caso de fallo.
 * 
 * @throws Error - Si ocurre un error durante la creación de la tarea, se envía una respuesta con el mensaje de error y un código de estado 500.
 */
export const createTask = async (req: Request, res: Response) => {
    try {
        const createTask: ITask = req.body;
        const task = await TaskService.createTask(createTask);
        res.status(200).json({
            message: 'Task Successfully Created',
            task
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Obtiene las tareas pendientes para un usuario específico.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @returns Una lista de tareas pendientes en formato JSON.
 *
 * @remarks
 * Este controlador maneja la solicitud para obtener las tareas pendientes de un usuario
 * específico utilizando su ID de usuario proporcionado en la consulta.
 *
 * @throws {Error} Si ocurre un error durante la obtención de las tareas, se devuelve un
 * mensaje de error con un estado HTTP 500.
 */
export const getPendingTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksPending(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Obtiene las tareas de alta prioridad para un usuario específico.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @returns Una lista de tareas de alta prioridad en formato JSON.
 * @throws Error si ocurre un problema al obtener las tareas.
 */
export const getHighTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksHigh(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Obtiene la media de las tareas para un usuario específico.
 * 
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * 
 * @returns Una respuesta HTTP con el estado 200 y un objeto JSON que contiene las tareas,
 *          o una respuesta HTTP con el estado 500 y un mensaje de error en caso de fallo.
 * 
 * @throws Error - Si ocurre un error durante la obtención de las tareas.
 */
export const getMeanTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksMean(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


/**
 * Obtiene las tareas de baja prioridad para un usuario específico.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @returns Una lista de tareas de baja prioridad en formato JSON.
 *
 * @throws {Error} Si ocurre un error al obtener las tareas, se devuelve un mensaje de error con un código de estado 500.
 */
export const getLowTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksLow(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


/**
 * Obtiene las tareas completadas de un usuario específico.
 *
 * @param req - Objeto de solicitud HTTP.
 * @param res - Objeto de respuesta HTTP.
 * @returns Una respuesta HTTP con un estado 200 y las tareas completadas en formato JSON,
 *          o un estado 500 con un mensaje de error en caso de fallo.
 *
 * @throws {Error} Si ocurre un error al obtener las tareas completadas.
 */
export const getCompleteTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksComplete(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Obtiene una tarea específica por su ID.
 *
 * @param req - Objeto de solicitud HTTP que contiene los parámetros de la solicitud.
 * @param res - Objeto de respuesta HTTP utilizado para enviar la respuesta.
 * @returns Una promesa que resuelve con la tarea solicitada o un mensaje de error.
 *
 * @throws {Error} Si ocurre un error durante la obtención de la tarea.
 */
export const getTask = async (req: Request, res: Response) => {
    try {
        const taskID = req.params.taskID;
        const task = await TaskService.getTask(taskID);
        if (!task) {
            res.status(404).json({ message: 'Task Not Found' });
        } else {
            res.status(200).json(task);
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Elimina una tarea basada en el ID proporcionado en la solicitud.
 * 
 * @param req - Objeto de solicitud HTTP que contiene el ID de la tarea en la consulta.
 * @param res - Objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * 
 * @returns Una respuesta JSON con un mensaje de éxito o error y el estado HTTP correspondiente.
 * 
 * @throws 500 - Error del servidor si ocurre un problema durante la eliminación de la tarea.
 */
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskID = req.query.taskID as string;
        const taskDeleted = await TaskService.deleteTask(taskID);
        if (!taskDeleted) {
            res.status(404).json({ message: 'Task Not Found' });
        } else {
            res.status(200).json({
                message: 'Task Deleted Successfully',
                taskDeleted
            });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

/**
 * Actualiza una tarea existente.
 *
 * @param req - Objeto de solicitud que contiene el ID de la tarea en `req.query.taskID` y los datos de la tarea en `req.body`.
 * @param res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns Una respuesta JSON con un mensaje de éxito y la tarea actualizada, o un mensaje de error si la tarea no se encuentra o si ocurre un error del servidor.
 *
 * @throws {Error} Si ocurre un error durante la actualización de la tarea.
 */
export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskID = req.query.taskID as string;
        const createTask: ITask = req.body;
        const updatedTask = await TaskService.updateTask(taskID, createTask);
        if (!updatedTask) {
            res.status(404).json({ message: 'Task Not Found' });
        } else {
            res.status(200).json({
                message: 'Task Updated Successfully',
                updatedTask
            });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
