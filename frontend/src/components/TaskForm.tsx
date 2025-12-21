"use client";

import { Form, Input, Select, DatePicker, Button, Modal, message } from "antd";
import { useState } from "react";
import type { Category, Task } from "@/types";
import dayjs from "dayjs";
import api from "@/lib/api";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  categories: Category[];
  initialValues?: Partial<Task>;
  onCategoryCreated?: (category: Category) => void;
}

const { Option } = Select;

const TaskForm = ({
  open,
  onClose,
  onSubmit,
  categories,
  initialValues,
  onCategoryCreated,
}: TaskFormProps) => {
  const [form] = Form.useForm();
  const [categoryInput, setCategoryInput] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  const handleCreateCategory = async () => {
    if (!categoryInput.trim()) {
      message.error("Please enter a category name");
      return;
    }

    setCreatingCategory(true);
    try {
      const { data } = await api.post("/api/tasks/categories", {
        name: categoryInput,
      });
      message.success("Category created successfully!");
      setCategoryInput("");
      onCategoryCreated?.(data);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Failed to create category");
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Task" : "Add Task"}
      open={open}
      onCancel={onClose}
      footer={null}
      className="p-4"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues
            ? {
                ...initialValues,
                dueDate: initialValues.dueDate
                  ? dayjs(initialValues.dueDate)
                  : undefined,
              }
            : undefined
        }
        onFinish={onSubmit}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="categoryId" label="Category">
          <Select placeholder="Select a category">
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Or Create New Category">
          <Input.Group compact>
            <Input
              placeholder="Enter new category name"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onPressEnter={handleCreateCategory}
              style={{ width: "calc(100% - 100px)" }}
            />
            <Button
              type="primary"
              loading={creatingCategory}
              onClick={handleCreateCategory}
              style={{ width: "100px" }}
            >
              Add
            </Button>
          </Input.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-2">
            {initialValues ? "Update" : "Create"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
