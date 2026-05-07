'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getJobTemplates } from '@/lib/storage';

function CompleteContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId') || '';
  const jobId = searchParams.get('jobId') || '';
  const [taskName, setTaskName] = useState('');
  const [taskIcon, setTaskIcon] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const jobs = getJobTemplates();
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      const task = job.tasks.find(t => t.id === taskId);
      if (task) {
        setTaskName(task.name);
        setTaskIcon(task.icon);
      }
    }
    const completions = JSON.parse(localStorage.getItem('zhixing_completions') || '[]');
    const last = completions[completions.length - 1];
    if (last) {
      const start = new Date(last.startTime).getTime();
      const end = new Date(last.endTime).getTime();
      const mins = Math.round((end - start) / 60000);
      setDuration(mins > 0 ? `${mins} 分钟` : '不到1分钟');
    }
  }, [taskId, jobId]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '30';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; life: number }[] = [];
    const colors = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        life: 1,
      });
    }

    let animId: number;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.008;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1;
      if (alive) animId = requestAnimationFrame(animate);
      else {
        canvas.remove();
      }
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-6">🎉</span>
        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">太棒了！</h1>
        <p className="text-xl text-[#64748B] mb-2">
          你完成了「{taskIcon} {taskName}」
        </p>
        {duration && (
          <p className="text-lg text-[#64748B] mb-8">用了 {duration}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm mt-8">
        <Link
          href={`/mood?context=after&jobId=${jobId}`}
          className="w-full bg-[#22C55E] text-white rounded-2xl py-4 text-xl font-semibold text-center shadow-lg btn-press min-h-[56px]"
        >
          😊 打卡心情
        </Link>
        <Link
          href={`/task/${jobId}`}
          className="w-full bg-white text-[#4F46E5] rounded-2xl py-4 text-xl font-semibold text-center shadow-sm border border-gray-200 btn-press min-h-[56px]"
        >
          返回任务列表
        </Link>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><p className="text-lg text-[#64748B]">加载中...</p></div>}>
      <CompleteContent />
    </Suspense>
  );
}
