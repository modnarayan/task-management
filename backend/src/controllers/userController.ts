import { Request, Response } from "express";
import User from "../models/User";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id, {
      attributes: ["id", "username", "email"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByPk(req.user?.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update({ username, email });
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
