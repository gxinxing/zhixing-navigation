'use client';

interface HelpPanelProps {
  onUnclear: () => void;
  onRedo: () => void;
  onCallHelp: () => void;
  onClose: () => void;
}

export default function HelpPanel({ onUnclear, onRedo, onCallHelp, onClose }: HelpPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-[#1E293B] text-center mb-6">🆘 你需要什么帮助？</h3>

        <div className="flex flex-col gap-3">
          <button
            onClick={onUnclear}
            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 text-lg font-semibold text-[#1E293B] btn-press flex items-center gap-3"
          >
            <span className="text-2xl">🗣️</span> 这个步骤不懂
          </button>

          <button
            onClick={onRedo}
            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 text-lg font-semibold text-[#1E293B] btn-press flex items-center gap-3"
          >
            <span className="text-2xl">🔄</span> 我想重来这一步
          </button>

          <button
            onClick={onCallHelp}
            className="w-full bg-[#F59E0B] text-white rounded-2xl p-4 text-lg font-semibold btn-press flex items-center gap-3"
          >
            <span className="text-2xl">📞</span> 叫辅导员来
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 text-[#64748B] text-lg btn-press"
        >
          取消
        </button>
      </div>
    </div>
  );
}
