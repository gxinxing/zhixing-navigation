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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6">
        <div className="animate-bounce-in text-center">
          <span className="text-7xl block mb-4">💖</span>
          <h1 className="text-2xl font-bold text-[#1E293B]">谢谢你的分享！</h1>
        </div>
        <button
          onClick={() => {
            if (context === 'after' && jobId) router.push(`/task/${jobId}`);
            else if (context === 'before') router.push('/');
            else router.push('/');
          }}
          className="mt-8 w-full max-w-sm bg-[#4F46E5] text-white rounded-2xl py-4 text-xl font-semibold shadow-lg btn-press min-h-[56px]"
        >
          继续
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8 flex flex-col">
      <h1 className="text-2xl font-bold text-[#1E293B] text-center mb-8">
        你现在感觉怎样？
      </h1>

      <div className="flex-1 flex items-center justify-center">
        <MoodSelector selected={selected} onSelect={setSelected} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className={`w-full rounded-2xl py-4 text-xl font-semibold shadow-lg btn-press min-h-[56px] mt-6 ${
          selected
            ? 'bg-[#4F46E5] text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        确认
      </button>
    </div>
  );
}

export default function MoodPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><p className="text-lg text-[#64748B]">加载中...</p></div>}>
      <MoodContent />
    </Suspense>
  );
}
