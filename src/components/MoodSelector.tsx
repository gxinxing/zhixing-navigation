'use client';
import { memo } from 'react';
import { MoodType } from '@/types';

const moods: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'great', emoji: '😄', label: '开心' },
  { type: 'good', emoji: '😊', label: '还行' },
  { type: 'okay', emoji: '😐', label: '一般' },
  { type: 'bad', emoji: '😟', label: '不太好' },
  { type: 'awful', emoji: '😰', label: '很难受' },
];

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export default memo(function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {moods.map((mood) => (
        <button
          key={mood.type}
          onClick={() => onSelect(mood.type)}
          className={`flex flex-col items-center gap-2 p-2 sm:p-3 rounded-2xl transition-all btn-press ${
            selected === mood.type
              ? 'bg-[#4F46E5] text-white scale-110 shadow-[0_4px_12px_rgba(79,70,229,0.3)]'
              : 'bg-white text-[#1E293B] border border-gray-200'
          }`}
        >
          <span className="text-4xl">{mood.emoji}</span>
          <span className="text-sm font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  );
})
