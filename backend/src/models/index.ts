import User from "./User";
import Task from "./Task";
import Category from "./Category";

// User relations
User.hasMany(Task, { foreignKey: "userId" });
User.hasMany(Category, { foreignKey: "userId" });

// Task relations
Task.belongsTo(User, { foreignKey: "userId" });
Task.belongsTo(Category, { foreignKey: "categoryId" });

// Category relations
Category.belongsTo(User, { foreignKey: "userId" });
Category.hasMany(Task, { foreignKey: "categoryId" });

export { User, Task, Category };
