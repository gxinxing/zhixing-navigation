'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = 'knowdo2024';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('knowdo_admin', 'true');
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">🔐</span>
          <h1 className="text-2xl font-bold text-[#1E293B]">辅导员登录</h1>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="请输入密码"
          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-xl text-[#1E293B] mb-4 focus:outline-none focus:border-[#4F46E5]"
        />

        {error && (
          <p className="text-red-500 text-center mb-4 animate-fade-in">密码不正确</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-[#4F46E5] text-white rounded-2xl py-4 text-xl font-semibold shadow-lg btn-press min-h-[56px]"
        >
          登录
        </button>

        <p className="text-sm text-[#64748B] text-center mt-4">
          提示：默认密码为 knowdo2024
        </p>
      </div>
    </div>
  );
}
