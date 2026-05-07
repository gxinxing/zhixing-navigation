'use client';
import { memo } from 'react';
import { MoodType } from '@/types';

const moods: { type: MoodType; emoji: string; label: string; gradient: string; color: string }[] = [
  { type: 'great', emoji: '😄', label: '开心', gradient: 'from-green-400 to-emerald-500', color: 'text-green-600' },
  { type: 'good', emoji: '😊', label: '还行', gradient: 'from-lime-400 to-green-400', color: 'text-lime-600' },
  { type: 'okay', emoji: '😐', label: '一般', gradient: 'from-amber-400 to-yellow-400', color: 'text-amber-600' },
  { type: 'bad', emoji: '😟', label: '不太好', gradient: 'from-orange-400 to-amber-400', color: 'text-orange-600' },
  { type: 'awful', emoji: '😰', label: '很难受', gradient: 'from-red-400 to-orange-400', color: 'text-red-600' },
];

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export default memo(function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {moods.map((mood) => {
        const isSelected = selected === mood.type;
        return (
          <button
            key={mood.type}
            onClick={() => onSelect(mood.type)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 btn-press ${
              isSelected
                ? `bg-gradient-to-br ${mood.gradient} text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] scale-105`
                : 'bg-white border border-gray-100 text-[#1E293B] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
            }`}
          >
            <span className={`text-4xl ${isSelected ? 'drop-shadow-md' : ''}`}>{mood.emoji}</span>
            <span className={`text-xs font-semibold ${isSelected ? 'text-white/90' : mood.color}`}>
              {mood.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});
