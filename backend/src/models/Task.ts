import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: "Pending" | "In Progress" | "Completed";
  public priority!: "low" | "medium" | "high";
  public dueDate?: Date;
  public categoryId?: number;
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    dueDate: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;
