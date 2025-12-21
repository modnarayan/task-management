import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getCategories,
  createCategory,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/categories", getCategories);
router.post("/categories", createCategory);

export default router;
