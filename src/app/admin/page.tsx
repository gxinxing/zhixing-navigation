'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCompletionRecords, getHelpRecords, getMoodTrend } from '@/lib/storage';
import { CompletionRecord, HelpRecord } from '@/types';

export default function AdminPage() {
  const [stats, setStats] = useState({ completions: 0, helpCount: 0, avgTime: 0 });
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [helpRecords, setHelpRecords] = useState<HelpRecord[]>([]);
  const [moodTrend, setMoodTrend] = useState<{ date: string; avg: number }[]>([]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const allCompletions = getCompletionRecords();
    const allHelpRecords = getHelpRecords();
    const today = new Date().toISOString().slice(0, 10);
    const todayCompletions = allCompletions.filter(r => r.startTime.slice(0, 10) === today);
    const todayHelp = allHelpRecords.filter(r => r.timestamp.slice(0, 10) === today);
    let avgTime = 0;
    if (todayCompletions.length > 0) {
      const totalTime = todayCompletions.reduce((sum, r) => sum + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime()), 0);
      avgTime = totalTime / todayCompletions.length / 1000;
    }
    setStats({ completions: todayCompletions.length, helpCount: todayHelp.length, avgTime });
    setCompletions(allCompletions.slice(-20).reverse());
    setHelpRecords(allHelpRecords.slice(-20).reverse());
    setMoodTrend(getMoodTrend(7));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const moodEmoji = (avg: number) => {
    if (avg >= 4.5) return '😄';
    if (avg >= 3.5) return '😊';
    if (avg >= 2.5) return '😐';
    if (avg >= 1.5) return '😟';
    return '😰';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]">知行 · 辅导员后台</h1>
        <Link href="/admin/editor" className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-semibold btn-press">
          编辑模板
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-[#4F46E5]">{stats.completions}</p>
          <p className="text-sm text-[#64748B] mt-1">今日完成</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-[#F59E0B]">{stats.helpCount}</p>
          <p className="text-sm text-[#64748B] mt-1">求助次数</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-3xl font-bold text-[#22C55E]">{Math.round(stats.avgTime / 60)}</p>
          <p className="text-sm text-[#64748B] mt-1">平均用时(分)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-[#1E293B] mb-3">完成记录</h2>
        {completions.length === 0 ? (
          <p className="text-[#64748B] text-sm">暂无记录</p>
        ) : (
          <div className="flex flex-col gap-2">
            {completions.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <span className="font-medium text-[#1E293B]">{c.jobName}</span>
                  <span className="text-[#64748B] mx-2">·</span>
                  <span className="text-[#64748B]">{c.taskName}</span>
                </div>
                <span className="text-[#22C55E] font-medium">完成 ✅</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-[#1E293B] mb-3">情绪趋势（近7天）</h2>
        <div className="flex items-end gap-2 h-32">
          {moodTrend.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-lg">{moodEmoji(d.avg)}</span>
              <div
                className="w-full bg-[#4F46E5] rounded-t-lg transition-all"
                style={{ height: `${d.avg > 0 ? (d.avg / 5) * 80 : 4}px` }}
              />
              <span className="text-xs text-[#64748B]">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-[#1E293B] mb-3">求助记录</h2>
        {helpRecords.length === 0 ? (
          <p className="text-[#64748B] text-sm">暂无记录</p>
        ) : (
          <div className="flex flex-col gap-2">
            {helpRecords.slice(0, 5).map((h) => (
              <div key={h.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <span className="font-medium text-[#1E293B]">{h.taskName}</span>
                  <span className="text-[#64748B] mx-2">·</span>
                  <span className="text-[#64748B]">第{h.stepNumber}步</span>
                </div>
                <span className="text-sm text-[#F59E0B]">
                  {h.type === 'unclear' ? '不懂步骤' : h.type === 'redo' ? '重来' : '叫辅导员'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
