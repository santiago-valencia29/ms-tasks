import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task.model';

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

export const getPendingTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksPending(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getHighTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksHigh(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getMeanTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksMean(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getLowTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksLow(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getCompleteTasks = async (req: Request, res: Response) => {
    try {
        const userID = req.query.userID as string;
        const tasks = await TaskService.getTasksComplete(userID);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

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

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskID = req.params.taskID as string;
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

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskID = req.params.taskID as string;
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
