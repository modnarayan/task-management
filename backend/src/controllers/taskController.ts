import { Request, Response } from "express";
import Task from "../models/Task";
import Category from "../models/Category";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, categoryId } =
      req.body;
    const task = await Task.create({
      ...req.body,
      userId: req.user?.id,
    });
    if (categoryId) {
      const category = await Category.findOne({
        where: { id: categoryId, userId: req.user?.id },
      });
      if (!category)
        return res.status(404).json({ error: "Category not found" });
    }
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user?.id },
      include: [{ model: Category, as: "Category" }],
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user?.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.update(req.body);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user?.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.user?.id },
    });
    // Predefined: Work, Personal, Urgent
    const predefined = ["Work", "Personal", "Urgent"]
      .filter((name) => !categories.some((cat) => cat.name === name))
      .map((name) => ({ id: 0, name, userId: req.user?.id })); // id=0 for predefined
    res.json([...predefined, ...categories]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name, userId: req.user?.id });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
