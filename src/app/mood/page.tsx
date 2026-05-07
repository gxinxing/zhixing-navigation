'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MoodSelector from '@/components/MoodSelector';
import { addMoodRecord } from '@/lib/storage';
import { MoodType } from '@/types';

function MoodContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const context = (searchParams.get('context') as 'before' | 'after') || 'before';
  const jobId = searchParams.get('jobId') || '';
  const [selected, setSelected] = useState<MoodType | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    addMoodRecord({
      mood: selected,
      timestamp: new Date().toISOString(),
      context,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 animate-bounce-in text-center">
          <div className="text-8xl mb-4 animate-float">💖</div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-2">谢谢你的分享！</h1>
          <p className="text-[#64748B]">我们会记住你的心情</p>
        </div>
        <button
          onClick={() => {
            if (context === 'after' && jobId) router.push(`/task/${jobId}`);
            else router.push('/');
          }}
          className="mt-10 w-full max-w-sm bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-2xl py-4 text-xl font-bold shadow-[0_4px_16px_rgba(79,70,229,0.35)] btn-press min-h-[56px]"
        >
          继续
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-8 flex flex-col relative">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-pink-50/50 to-transparent pointer-events-none" />
      
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-[#1E293B] text-center mb-2">
          你现在感觉怎样？
        </h1>
        <p className="text-[#64748B] text-center text-base mb-10">
          选择一个表情告诉我们
        </p>

        <div className="flex-1 flex items-center justify-center">
          <MoodSelector selected={selected} onSelect={setSelected} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full rounded-2xl py-4 text-xl font-bold shadow-lg btn-press min-h-[56px] mt-8 transition-all duration-300 ${
            selected
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-[0_4px_16px_rgba(79,70,229,0.35)]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          确认
        </button>
      </div>
    </div>
  );
}

export default function MoodPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-lg text-[#64748B]">加载中...</p></div>}>
      <MoodContent />
    </Suspense>
  );
}
