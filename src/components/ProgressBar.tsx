'use client';
import { memo } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default memo(function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#64748B]">第 {current}/{total} 步</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#4F46E5] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
})
