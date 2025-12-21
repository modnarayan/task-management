"use client";

import { Form, Input, Button, Card, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", values);
      console.log("Login - Received token:", data);
      localStorage.setItem("token", data.token);

      // Set cookie for middleware
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

      message.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed", error);
      message.error(error.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <h2 className="text-center mb-4">Login</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
