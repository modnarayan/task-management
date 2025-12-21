import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/users";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Use { alter: true } in prod
    console.log("Database connected and synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
