'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getJobTemplates, getCompletionRecords } from '@/lib/storage';

function CompleteContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId') || '';
  const jobId = searchParams.get('jobId') || '';
  const [taskName, setTaskName] = useState('');
  const [taskIcon, setTaskIcon] = useState('');
  const [duration, setDuration] = useState('');
  const encouragements = ['太棒了！🎉', '你做到了！✅', '继续加油！💪', '一步一步，你在进步！🌟'];
  const [encouragement] = useState(() => encouragements[Math.floor(Math.random() * encouragements.length)]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const jobs = getJobTemplates();
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      const task = job.tasks.find(t => t.id === taskId);
      if (task) {
        setTaskName(task.name);
        setTaskIcon(task.icon);
      }
    }
    const completions = getCompletionRecords();
    const last = completions[completions.length - 1];
    if (last) {
      const start = new Date(last.startTime).getTime();
      const end = new Date(last.endTime).getTime();
      const mins = Math.round((end - start) / 60000);
      setDuration(mins > 0 ? `${mins} 分钟` : '不到1分钟');
    }
    /* eslint-enable react-hooks/set-state-in-effect */
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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; life: number; rotation: number; rotSpeed: number }[] = [];
    const colors = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: 1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    let animId: number;
    let alive = true;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let hasAlive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        hasAlive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.vx *= 0.995;
        p.life -= 0.006;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (hasAlive && alive) animId = requestAnimationFrame(animate);
      else canvas.remove();
    }
    animate();

    return () => {
      alive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 animate-bounce-in">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-white/80 p-8 w-full max-w-sm text-center">
          <div className="text-8xl mb-4 animate-float">🎉</div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">{encouragement}</h1>
          <p className="text-lg text-[#64748B] mb-1">
            你完成了
          </p>
          <p className="text-xl font-bold text-[#4F46E5] mb-3">
            {taskIcon} {taskName}
          </p>
          {duration && (
            <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-2 mb-2">
              <p className="text-green-700 font-semibold">⏱️ 用了 {duration}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm mt-6 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <Link
          href={`/mood?context=after&jobId=${jobId}`}
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-2xl py-4 text-xl font-bold text-center shadow-[0_4px_16px_rgba(34,197,94,0.35)] btn-press min-h-[56px]"
        >
          😊 打卡心情
        </Link>
        <Link
          href={`/task/${jobId}`}
          className="w-full bg-white text-[#4F46E5] rounded-2xl py-4 text-xl font-bold text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] btn-press min-h-[56px] border border-indigo-100"
        >
          返回任务列表
        </Link>
        <Link
          href="/"
          className="w-full text-[#64748B] py-3 text-center btn-press text-base"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-lg text-[#64748B]">加载中...</p></div>}>
      <CompleteContent />
    </Suspense>
  );
}
