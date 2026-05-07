'use client';
import { memo } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default memo(function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full px-4 pt-2 pb-1">
      {total <= 8 ? (
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: total }, (_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < current;
            const isCurrent = stepNum === current;
            return (
              <div key={i} className="flex items-center gap-0.5 shrink-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black transition-all duration-400 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white shadow-[0_2px_8px_rgba(79,70,229,0.4)]'
                      : isCurrent
                      ? 'bg-white border-[2.5px] border-[#4F46E5] text-[#4F46E5] shadow-[0_2px_6px_rgba(79,70,229,0.2)]'
                      : 'bg-gray-100 border-[2px] border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                {i < total - 1 && (
                  <div className={`w-2 h-[3px] rounded-full transition-all duration-400 ${
                    isCompleted ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-between mb-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-sm font-bold text-[#4F46E5]">第 {current} 步</span>
          <span className="text-xs text-[#64748B]">共 {total} 步</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
