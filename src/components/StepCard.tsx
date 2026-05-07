'use client';
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

export default function StepCard({ step, currentStep, totalSteps, progress, onComplete, onReplay, onHelp }: StepCardProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] px-4 py-6">
      <ProgressBar current={currentStep + 1} total={totalSteps} progress={progress} />

      <div className="flex-1 flex flex-col items-center justify-center mt-4">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center justify-center min-h-[200px]">
          <div className="text-8xl">
            {step.order <= 3 ? '📋' : step.order <= 6 ? '🔍' : step.order <= 9 ? '✋' : '✅'}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E293B] text-center mb-3">
          {step.title}
        </h2>

        <p className="text-lg text-[#64748B] text-center mb-2 leading-relaxed">
          {step.description}
        </p>

        {step.tip && (
          <p className="text-base text-[#4F46E5] text-center mb-4 font-medium">
            💡 {step.tip}
          </p>
        )}

        <button
          onClick={onReplay}
          className="flex items-center gap-2 text-[#4F46E5] font-medium text-lg mb-6 btn-press"
        >
          🔊 再听一遍
        </button>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#4F46E5] text-white rounded-2xl py-4 text-xl font-semibold shadow-lg btn-press min-h-[56px] mb-3"
      >
        ✅ 我做完了
      </button>

      <button
        onClick={onHelp}
        className="w-full bg-[#F59E0B] text-white rounded-2xl py-3 text-lg font-semibold shadow-sm btn-press animate-pulse-help"
      >
        🆘 需要帮助
      </button>
    </div>
  );
}
