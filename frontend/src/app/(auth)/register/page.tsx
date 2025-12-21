"use client";

import { Form, Input, Button, Card, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", values);
      console.log("Register - Received token:", data);
      localStorage.setItem("token", data.token);

      // Set cookie for middleware
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

      message.success("Registration successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration failed", error);
      message.error(error.response?.data?.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <h2 className="text-center mb-4">Register</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
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
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;
