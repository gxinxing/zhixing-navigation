'use client';
import { memo } from 'react';
import Link from 'next/link';
import { JobTemplate } from '@/types';

export default memo(function JobCard({ job }: { job: JobTemplate }) {
  return (
    <Link href={`/task/${job.id}`} className="block">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/60 card-hover min-h-[140px] flex flex-col items-center justify-center gap-3 overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-100/50 to-purple-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="text-5xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{job.icon}</span>
        <span className="text-lg font-bold text-[#1E293B] tracking-wide">{job.name}</span>
        
        <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[#4F46E5] text-sm font-medium">→</span>
        </div>
      </div>
    </Link>
  );
});
