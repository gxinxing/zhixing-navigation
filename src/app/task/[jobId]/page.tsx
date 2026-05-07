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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-lg text-[#64748B]">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-2xl text-[#64748B] btn-press">←</Link>
        <h1 className="text-2xl font-bold text-[#1E293B]">{job.icon} {job.name}</h1>
      </div>

      <h2 className="text-lg text-[#64748B] mb-4">今天要做哪些事？</h2>

      <div className="flex flex-col gap-4 flex-1">
        {job.tasks.map((task) => {
          const completed = completions.find(
            c => c.taskId === task.id && c.startTime.slice(0, 10) === today
          );
          return (
            <Link key={task.id} href={`/step/${task.id}?jobId=${jobId}`} className="block">
              <div className={`bg-white rounded-2xl p-6 shadow-sm border ${
                completed ? 'border-[#22C55E]' : 'border-gray-100'
              } hover:shadow-md transition-shadow btn-press`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{task.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-[#1E293B]">{task.name}</h3>
                      <p className="text-sm text-[#64748B]">{task.steps.length}个步骤</p>
                    </div>
                  </div>
                  {completed ? (
                    <div className="flex items-center gap-2 text-[#22C55E]">
                      <span className="text-2xl">✅</span>
                      <span className="text-sm">已完成</span>
                    </div>
                  ) : (
                    <span className="text-[#4F46E5] font-semibold text-lg">开始 →</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        href="/mood?context=before"
        className="mt-6 bg-[#F59E0B] text-white rounded-2xl p-4 shadow-sm flex items-center justify-center gap-3 btn-press animate-pulse-help"
      >
        <span className="text-2xl">🆘</span>
        <span className="text-xl font-semibold">需要帮助</span>
      </Link>
    </div>
  );
}
