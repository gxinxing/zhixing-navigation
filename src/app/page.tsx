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
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 flex flex-col">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-6">
        {greeting}！今天做什么工作？
      </h1>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <Link
        href="/mood?context=before"
        className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-center gap-3 btn-press"
      >
        <span className="text-2xl">😊</span>
        <span className="text-lg font-semibold text-[#64748B]">今天感觉怎样？</span>
      </Link>

      <Link
        href="/admin/login"
        className="mt-3 text-center text-sm text-[#64748B] btn-press"
      >
        辅导员入口 →
      </Link>
    </div>
  );
}
