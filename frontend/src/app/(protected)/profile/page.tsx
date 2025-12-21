"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import api from "@/lib/api";
import type { User } from "@/types";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/users/profile");
        setUser(data);
        form.setFieldsValue(data);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [form, router]);

  const onFinish = async (values: Partial<User>) => {
    try {
      await api.put("/api/users/profile", values);
      setUser({ ...user!, ...values });
    } catch (error) {
      console.error("Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <h2 className="text-center mb-4">Profile</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
