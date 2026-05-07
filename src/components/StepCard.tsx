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
  return (
    <div className="flex-1 flex flex-col px-5 py-2">
      <ProgressBar current={currentStep + 1} total={totalSteps} progress={progress} />

      <div className="flex-1 flex flex-col items-center justify-center mt-2">
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 mb-5 flex items-center justify-center min-h-[40vh]">
          <div className="text-8xl">
            {step.order <= 3 ? '📋' : step.order <= 6 ? '🔍' : step.order <= 9 ? '✋' : '✅'}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E293B] text-center mb-2 leading-relaxed">
          {step.title}
        </h2>

        <p className="text-lg text-[#64748B] text-center mb-2 leading-[1.5]">
          {step.description}
        </p>

        {step.tip && (
          <p className="text-base text-[#4F46E5] text-center mb-4 font-medium">
            💡 {step.tip}
          </p>
        )}

        <button
          onClick={onReplay}
          className="flex items-center gap-2 text-[#4F46E5] font-medium text-lg mb-5 btn-press"
        >
          🔊 再听一遍
        </button>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#22C55E] text-white rounded-2xl py-4 text-xl font-semibold shadow-[0_4px_12px_rgba(34,197,94,0.3)] btn-press min-h-[56px] mb-3 active:shadow-[0_2px_6px_rgba(34,197,94,0.2)]"
      >
        ✅ 我做完了
      </button>

      <button
        onClick={onHelp}
        className="w-full bg-white border-2 border-[#F59E0B] text-[#F59E0B] rounded-2xl py-3 text-lg font-semibold btn-press min-h-[48px]"
      >
        🆘 需要帮助
      </button>
    </div>
  );
});
