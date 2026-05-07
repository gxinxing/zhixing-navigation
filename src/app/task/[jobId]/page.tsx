'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { JobTemplate, CompletionRecord } from '@/types';
import { getJobTemplates, getCompletionRecords } from '@/lib/storage';

export default function TaskListPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [job, setJob] = useState<JobTemplate | null>(null);
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const jobs = getJobTemplates();
    const found = jobs.find(j => j.id === jobId);
    if (found) setJob(found);
    setCompletions(getCompletionRecords());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [jobId]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-[#64748B]">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-6 flex flex-col relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-100/40 to-orange-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm text-xl btn-press border border-white/50">←</Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{job.icon}</span>
            <h1 className="text-2xl font-bold text-[#1E293B]">{job.name}</h1>
          </div>
        </div>

        <h2 className="text-base text-[#64748B] mb-5 animate-fade-in">今天要做哪些事？</h2>

        <div className="flex flex-col gap-3 flex-1">
          {job.tasks.map((task, i) => {
            const completed = completions.find(
              c => c.taskId === task.id && c.startTime.slice(0, 10) === today
            );
            return (
              <Link key={task.id} href={`/step/${task.id}?jobId=${jobId}`} className="block animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={`rounded-2xl p-5 card-hover ${
                  completed
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                    : 'bg-white/90 backdrop-blur-sm border border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{task.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-[#1E293B]">{task.name}</h3>
                        <p className="text-sm text-[#64748B]">{task.steps.length}个步骤</p>
                      </div>
                    </div>
                    {completed ? (
                      <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
                        <span>✓</span> 已完成
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]">
                        →
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <Link
          href="/mood?context=before"
          className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/50 card-hover flex items-center justify-center gap-3"
        >
          <span className="text-2xl animate-float">😊</span>
          <span className="text-lg font-semibold text-[#64748B]">今天感觉怎样？</span>
        </Link>
      </div>
    </div>
  );
}
