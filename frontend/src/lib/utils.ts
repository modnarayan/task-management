import { Task } from "@/types";
import _ from "lodash";

export const sortTasks = (
  tasks: Task[],
  sortBy: "priority" | "dueDate" | "category"
) => {
  if (sortBy === "category") {
    return _.orderBy(
      tasks,
      [(task: Task) => task.Category?.name || task.category?.name || ""],
      ["asc"]
    );
  }
  return _.orderBy(tasks, [sortBy], ["asc"]);
};

export const filterTasks = (
  tasks: Task[],
  filters: { status?: string; category?: string }
) => {
  let filtered = tasks;

  if (filters.status) {
    filtered = _.filter(filtered, (task) => task.status === filters.status);
  }

  if (filters.category) {
    filtered = _.filter(
      filtered,
      (task) =>
        task.Category?.name === filters.category ||
        task.category?.name === filters.category
    );
  }

  return filtered;
};
