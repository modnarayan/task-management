import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
  }
);

export default Category;
