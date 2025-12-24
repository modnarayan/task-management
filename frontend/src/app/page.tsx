"use client";

import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <CheckCircleOutlined className="text-5xl text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Task Management System
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Stay organized and boost your productivity
            </p>
            <p className="text-gray-500">
              Manage your tasks efficiently with our modern task management
              platform
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Organize Tasks
              </h3>
              <p className="text-sm text-gray-600">
                Create and organize your tasks with categories
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Set Priorities
              </h3>
              <p className="text-sm text-gray-600">
                Prioritize tasks with low, medium, and high levels
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Due Dates</h3>
              <p className="text-sm text-gray-600">
                Never miss deadlines with due date tracking
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto px-8 h-12 text-base font-semibold"
            >
              Login
            </Button>
            <Button
              size="large"
              onClick={() => router.push("/register")}
              className="w-full sm:w-auto px-8 h-12 text-base font-semibold"
            >
              Create Account
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center border-t pt-8">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
