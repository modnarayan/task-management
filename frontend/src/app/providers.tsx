"use client";

import { ConfigProvider, App } from "antd";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
