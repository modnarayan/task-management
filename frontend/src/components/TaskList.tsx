"use client";

import { Table, Tag, Space, Button, Select, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import type { Task, Category } from "@/types";
import { filterTasks, sortTasks } from "@/lib/utils";
import TaskForm from "./TaskForm";
import api from "@/lib/api";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onRefresh: () => void;
}

const { Option } = Select;

const TaskList = ({ tasks, categories, onRefresh }: TaskListProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "category">(
    "priority"
  );
  const [localCategories, setLocalCategories] =
    useState<Category[]>(categories);
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Update localCategories when categories prop changes
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  // Update localTasks when tasks prop changes
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const filteredAndSortedTasks = filterTasks(
    sortTasks(localTasks, sortBy),
    filters
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Task["status"]) => (
        <Tag color={status === "Completed" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: Task["priority"]) => (
        <Tag
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
              ? "orange"
              : "green"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "No due date",
    },
    {
      title: "Category",
      key: "category",
      render: (_: any, record: Task) => {
        const categoryName =
          record.Category?.name || record.category?.name || "-";
        return categoryName;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditTask(record);
              setEditOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={async () => {
              await api.delete(`/api/tasks/${record.id}`);
              onRefresh();
            }}
          />
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    if (values.dueDate) {
      values.dueDate = values.dueDate.toISOString();
    }
    if (editTask) {
      await api.put(`/api/tasks/${editTask.id}`, values);
    } else {
      await api.post("/api/tasks", values);
    }
    setEditOpen(false);
    setEditTask(null);
    onRefresh();
  };

  const handleCategoryCreated = (newCategory: Category) => {
    setLocalCategories([...localCategories, newCategory]);
  };

  const [form] = Form.useForm();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <Button type="primary" onClick={() => setEditOpen(true)}>
          Add Task
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <Select
          placeholder="Filter by Status"
          onChange={(v) => setFilters({ ...filters, status: v })}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
        <Select
          placeholder="Filter by Category"
          onChange={(v) => setFilters({ ...filters, category: v })}
          allowClear
          style={{ width: 150 }}
        >
          {localCategories.map((cat) => (
            <Option key={cat.id} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>
        <Select
          value={sortBy}
          onChange={(v) => setSortBy(v)}
          style={{ width: 150 }}
        >
          <Option value="priority">Sort by Priority</Option>
          <Option value="dueDate">Sort by Due Date</Option>
          <Option value="category">Sort by Category</Option>
        </Select>
      </div>
      <Table
        dataSource={filteredAndSortedTasks}
        columns={columns}
        rowKey="id"
      />
      <TaskForm
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setEditTask(null);
        }}
        onSubmit={handleSubmit}
        categories={localCategories}
        initialValues={editTask || undefined}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  );
};

export default TaskList;
