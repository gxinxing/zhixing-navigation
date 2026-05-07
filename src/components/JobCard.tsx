'use client';
import { memo } from 'react';
import Link from 'next/link';
import { JobTemplate } from '@/types';

export default memo(function JobCard({ job }: { job: JobTemplate }) {
  return (
    <Link href={`/task/${job.id}`} className="block">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow btn-press flex flex-col items-center justify-center gap-3 min-h-[140px]">
        <span className="text-5xl">{job.icon}</span>
        <span className="text-xl font-bold text-[#1E293B]">{job.name}</span>
      </div>
    </Link>
  );
})
