"use client";

import { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList";
import api from "@/lib/api";
import type { Task, Category } from "@/types";

const { Header, Content, Sider } = Layout;

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [tasksRes, catsRes] = await Promise.all([
        api.get("/api/tasks"),
        api.get("/api/tasks/categories"),
      ]);
      console.log("Fetched tasks:", tasksRes.data);
      console.log("Fetched categories:", catsRes.data);
      setTasks(tasksRes.data);
      setCategories(catsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      handleLogout();
    } else if (e.key === "profile") {
      router.push("/profile");
    }
  };

  return (
    <Layout className="h-screen">
      <Sider width={200} className="bg-gray-800">
        <div className="text-white p-4">Task Manager</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            { key: "1", label: "Dashboard" },
            { key: "profile", label: "Profile" },
            { key: "logout", label: "Logout" },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow flex justify-between items-center p-4">
          <h1 className="text-xl">Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content className="p-6">
          <TaskList
            tasks={tasks}
            categories={categories}
            onRefresh={fetchData}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
