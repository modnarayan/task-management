import { Request, Response } from "express";
import Task from "../models/Task";
import Category from "../models/Category";
import { Op } from "sequelize";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, categoryId } =
      req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Validate category if provided
    if (categoryId) {
      const category = await Category.findOne({
        where: { id: categoryId, userId: req.user?.id },
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    const task = await Task.create({
      title,
      description,
      status: status || "Pending",
      priority: priority || "medium",
      dueDate,
      categoryId,
      userId: req.user?.id,
    });

    // Fetch with category included
    const taskWithCategory = await Task.findByPk(task.id, {
      include: [{ model: Category }],
    });

    res.status(201).json(taskWithCategory);
  } catch (error: any) {
    console.error("Create task error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user?.id },
      include: [{ model: Category }],
      order: [["createdAt", "DESC"]],
    });
    console.log(
      "Fetched tasks for user:",
      req.user?.id,
      "Count:",
      tasks.length
    );
    res.json(tasks);
  } catch (error: any) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user?.id },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Validate category if being updated
    if (req.body.categoryId && req.body.categoryId !== task.categoryId) {
      const category = await Category.findOne({
        where: { id: req.body.categoryId, userId: req.user?.id },
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    await task.update(req.body);
    const updatedTask = await Task.findByPk(task.id, {
      include: [{ model: Category }],
    });
    res.json(updatedTask);
  } catch (error: any) {
    console.error("Update task error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user?.id },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const predefinedNames = ["Work", "Personal", "Urgent"];
    const categories = [];

    // Get or create predefined categories for this user
    for (const name of predefinedNames) {
      let cat = await Category.findOne({
        where: { name, userId: req.user?.id },
      });
      if (!cat) {
        cat = await Category.create({ name, userId: req.user?.id });
      }
      categories.push(cat);
    }

    // Get custom categories
    const custom = await Category.findAll({
      where: { userId: req.user?.id, name: { [Op.notIn]: predefinedNames } },
    });

    res.json([...categories, ...custom]);
  } catch (error: any) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if category already exists for this user
    const existing = await Category.findOne({
      where: { name: name.trim(), userId: req.user?.id },
    });

    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      userId: req.user?.id,
    });

    res.status(201).json(category);
  } catch (error: any) {
    console.error("Create category error:", error);
    res.status(400).json({ error: error.message });
  }
};
