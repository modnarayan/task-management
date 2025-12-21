import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Task extends Model {
  declare id: number;
  declare title: string;
  declare description?: string;
  declare status: "Pending" | "In Progress" | "Completed";
  declare priority: "low" | "medium" | "high";
  declare dueDate?: Date;
  declare categoryId?: number;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "Tasks",
    timestamps: true,
  }
);

export default Task;
