# Tasks

- [x] Task 1: 项目脚手架搭建 — 创建 Next.js 14 项目，配置 Tailwind CSS、TypeScript、PWA
  - [x] SubTask 1.1: 使用 create-next-app 创建项目（App Router、TypeScript、Tailwind CSS、ESLint）
  - [x] SubTask 1.2: 配置 next-pwa（manifest.json、Service Worker）
  - [x] SubTask 1.3: 创建项目目录结构（components、data、hooks、lib、types）
  - [x] SubTask 1.4: 配置 Tailwind 主题扩展（色彩、字体大小等设计规范变量）

- [x] Task 2: 类型定义 + 预置模板数据
  - [x] SubTask 2.1: 编写 TypeScript 类型定义（JobTemplate、Task、Step、CompletionRecord、MoodRecord、HelpRecord）
  - [x] SubTask 2.2: 编写 5 个预置岗位模板数据（超市理货员、咖啡店助理、图书管理员、酒店客房、办公室助理）

- [x] Task 3: localStorage 封装 + 自定义 Hooks
  - [x] SubTask 3.1: 编写 storage.ts 工具函数（模板读写、完成记录、情绪记录、求助记录的 CRUD）
  - [x] SubTask 3.2: 编写 useLocalStorage hook
  - [x] SubTask 3.3: 编写 useSpeech hook（Web Speech API 语音播报封装）
  - [x] SubTask 3.4: 编写 useTaskProgress hook（任务进度状态管理）

- [x] Task 4: 用户端 — 首页岗位选择
  - [x] SubTask 4.1: 编写根布局 layout.tsx（全局样式、字体）
  - [x] SubTask 4.2: 编写 JobCard 组件
  - [x] SubTask 4.3: 编写首页 page.tsx（2x2 网格岗位卡片 + 底部情绪打卡入口）

- [x] Task 5: 用户端 — 任务列表页
  - [x] SubTask 5.1: 编写 task/[jobId]/page.tsx（任务卡片列表 + 已完成标记 + 求助按钮）

- [x] Task 6: 用户端 — 步骤卡片（核心）
  - [x] SubTask 6.1: 编写 ProgressBar 组件
  - [x] SubTask 6.2: 编写 StepCard 组件（图文展示 + 语音播报 + "我做完了"按钮）
  - [x] SubTask 6.3: 编写 step/[taskId]/page.tsx（步骤间跳转逻辑 + "做得好！"过渡动画）
  - [x] SubTask 6.4: 编写完成庆祝页 complete/page.tsx（confetti 动画 + 用时 + 返回按钮）

- [x] Task 7: 用户端 — 情绪打卡
  - [x] SubTask 7.1: 编写 MoodSelector 组件（5 个表情选项）
  - [x] SubTask 7.2: 编写 mood/page.tsx（情绪选择 + 确认 + 数据存储）

- [x] Task 8: 用户端 — 求助功能
  - [x] SubTask 8.1: 编写 HelpPanel 组件（三个求助选项）
  - [x] SubTask 8.2: 集成求助逻辑（重播语音、重置步骤、记录求助事件）

- [x] Task 9: 辅导员端 — 登录 + 数据看板
  - [x] SubTask 9.1: 编写 admin/login/page.tsx（简易密码登录）
  - [x] SubTask 9.2: 编写 admin/page.tsx（统计卡片 + 学员近况 + 情绪趋势 + 求助记录）

- [x] Task 10: 辅导员端 — 任务模板编辑器
  - [x] SubTask 10.1: 编写 admin/editor/page.tsx（表单式编辑 + 步骤排序 + 预览 + 保存到 localStorage）

- [x] Task 11: UI 打磨 + 响应式适配
  - [x] SubTask 11.1: 检查所有页面色彩、字体、间距符合设计规范
  - [x] SubTask 11.2: 添加交互反馈动画（按钮按下缩放、求助按钮脉冲、完成动画）
  - [x] SubTask 11.3: 移动端响应式适配（主要适配手机竖屏）

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
- Task 6 depends on Task 5
- Task 7 depends on Task 3 (可与 Task 5/6 并行)
- Task 8 depends on Task 3 (可与 Task 7 并行)
- Task 9 depends on Task 3
- Task 10 depends on Task 9
- Task 11 depends on Task 6, Task 7, Task 8, Task 9, Task 10
