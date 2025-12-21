import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  declare id: number;
  declare name: string;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
  }
);

export default Category;
