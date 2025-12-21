export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  categoryId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  Category?: Category;
  category?: Category; // fallback for compatibility
}
