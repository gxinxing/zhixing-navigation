'use client';
import { memo } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default memo(function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full px-4 pt-3 pb-2">
      {total <= 7 ? (
        <div className="flex items-center gap-1 mb-3 overflow-x-auto">
          {Array.from({ length: total }, (_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < current;
            const isCurrent = stepNum === current;
            return (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#4F46E5] text-white'
                      : isCurrent
                      ? 'border-[2px] border-[#4F46E5] text-[#4F46E5] bg-white'
                      : 'border-2 border-[#CBD5E1] text-[#CBD5E1] bg-white'
                  }`}
                >
                  {isCompleted ? '✅' : stepNum}
                </div>
                {i < total - 1 && (
                  <div className={`w-3 h-[2px] ${isCompleted ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#4F46E5]">第 {current} 步</span>
          <span className="text-sm text-[#64748B]">共 {total} 步</span>
        </div>
      )}
      <div className="w-full bg-[#E2E8F0] rounded-full h-[6px]">
        <div
          className="bg-[#4F46E5] h-[6px] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
