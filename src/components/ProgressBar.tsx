'use client';
import { memo } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default memo(function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full px-4 pt-4 pb-2">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < current;
          const isCurrent = stepNum === current;
          return (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#4F46E5] text-white'
                    : isCurrent
                    ? 'border-[3px] border-[#4F46E5] text-[#4F46E5] bg-white'
                    : 'border-2 border-[#CBD5E1] text-[#CBD5E1] bg-white'
                }`}
              >
                {isCompleted ? '✅' : stepNum}
              </div>
              {i < total - 1 && (
                <div className={`w-4 h-[2px] ${isCompleted ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full bg-[#E2E8F0] rounded-full h-[6px]">
        <div
          className="bg-[#4F46E5] h-[6px] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
