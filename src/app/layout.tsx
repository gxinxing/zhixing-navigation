import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KnowDo - 岗位任务导航器",
  description: "KnowDo: 把复杂工作流程变成跟着做的图文步骤卡片，让心智障碍者能独立完成岗位任务",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col text-[#1E293B]">
        <div className="flex-1 mx-auto w-full max-w-md">
          {children}
        </div>
      </body>
    </html>
  );
}
