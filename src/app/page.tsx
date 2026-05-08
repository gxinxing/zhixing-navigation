'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import { getJobTemplates } from '@/lib/storage';
import { JobTemplate } from '@/types';

export default function HomePage() {
  const [jobs, setJobs] = useState<JobTemplate[]>([]);
  const [greeting, setGreeting] = useState('你好');

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setJobs(getJobTemplates());
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早上好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <div className="min-h-screen px-5 py-8 flex flex-col relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-100/50 to-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-100/40 to-purple-100/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1E293B] leading-tight animate-fade-in-up">
            {greeting}！
          </h1>
          <p className="text-xl text-[#64748B] mt-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            今天做什么工作？
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {jobs.map((job, i) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <Link
          href="/mood?context=before"
          className="block bg-white/90 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] card-hover flex items-center justify-center gap-3 border border-white/50"
        >
          <span className="text-3xl animate-float" style={{ animationDelay: '1.5s' }}>😊</span>
          <span className="text-lg font-semibold text-[#64748B]">今天感觉怎样？</span>
        </Link>

        <Link
          href="/admin/login"
          className="mt-3 text-center text-sm text-[#94A3B8] btn-press"
        >
          辅导员入口 →
        </Link>
      </div>
    </div>
  );
}
