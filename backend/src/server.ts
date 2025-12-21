import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/users";
import dotenv from "dotenv";

// Import models to register them
import User from "./models/User";
import Task from "./models/Task";
import Category from "./models/Category";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define associations after all models are imported
User.hasMany(Task, { foreignKey: "userId" });
User.hasMany(Category, { foreignKey: "userId" });

Task.belongsTo(User, { foreignKey: "userId" });
Task.belongsTo(Category, { foreignKey: "categoryId" });

Category.belongsTo(User, { foreignKey: "userId" });
Category.hasMany(Task, { foreignKey: "categoryId" });

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection authenticated");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

syncDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
