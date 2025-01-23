import { Router } from "express";
import {
  createTask,
  deleteTask,
  getCompleteTasks,
  getHighTasks,
  getLowTasks,
  getMeanTasks,
  getPendingTasks,
  getTask,
  updateTask,
} from "../controllers/task.controller";
import { validateTokenMsAuth } from "../middlewares/validate-token-middleware";

const router = Router();

router.post("/create", validateTokenMsAuth, createTask);
router.get("/pending", validateTokenMsAuth, getPendingTasks);
router.get("/high", validateTokenMsAuth, getHighTasks);
router.get("/mean", validateTokenMsAuth, getMeanTasks);
router.get("/low", validateTokenMsAuth, getLowTasks);
router.get("/complete", validateTokenMsAuth, getCompleteTasks);
router.get("/:taskID", validateTokenMsAuth, getTask);
router.delete("/:taskID", validateTokenMsAuth, deleteTask);
router.put("/:taskID", validateTokenMsAuth, updateTask);

export default router;
