'use client';
import { memo } from 'react';
import { Step } from '@/types';
import ProgressBar from './ProgressBar';

interface StepCardProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onComplete: () => void;
  onReplay: () => void;
  onHelp: () => void;
}

export default memo(function StepCard({ step, currentStep, totalSteps, progress, onComplete, onReplay, onHelp }: StepCardProps) {
  const emojiByPhase = step.order <= 3 ? '📋' : step.order <= 6 ? '🔍' : step.order <= 9 ? '✋' : '✅';

  return (
    <div className="flex-1 flex flex-col px-4 pt-1 pb-2">
      <ProgressBar current={currentStep + 1} total={totalSteps} progress={progress} />

      <div className="flex-1 flex flex-col items-center justify-center mt-3 px-2">
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 p-6 mb-5 flex items-center justify-center min-h-[35vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/30" />
          <div className="relative z-10">
            <div className="text-7xl filter drop-shadow-lg animate-float">
              {emojiByPhase}
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full">
            第 {step.order} 步
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E293B] text-center mb-2 leading-tight">
          {step.title}
        </h2>

        <p className="text-base text-[#64748B] text-center mb-2 leading-[1.6] max-w-sm">
          {step.description}
        </p>

        {step.tip && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl px-4 py-2 mb-4">
            <p className="text-sm text-amber-700 font-medium">
              💡 {step.tip}
            </p>
          </div>
        )}

        <button
          onClick={onReplay}
          className="flex items-center gap-2 text-[#4F46E5] font-semibold text-base mb-4 btn-press group"
        >
          <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">🔊</span>
          再听一遍
        </button>
      </div>

      <div className="space-y-3 px-1">
        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-2xl py-4 text-xl font-bold shadow-[0_4px_16px_rgba(34,197,94,0.35)] btn-press min-h-[56px] tracking-wide relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-2xl">✅</span>
            我做完了
          </span>
        </button>

        <button
          onClick={onHelp}
          className="w-full bg-white border-2 border-amber-300 text-amber-600 rounded-2xl py-3 text-lg font-semibold btn-press min-h-[48px] hover:bg-amber-50 transition-colors"
        >
          🆘 需要帮助
        </button>
      </div>
    </div>
  );
});
