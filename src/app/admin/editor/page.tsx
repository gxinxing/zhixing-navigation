'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobTemplates, saveJobTemplates } from '@/lib/storage';
import { JobTemplate, Step } from '@/types';

export default function EditorPage() {
  const [templates, setTemplates] = useState<JobTemplate[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [editingTaskIndex, setEditingTaskIndex] = useState<number>(-1);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setTemplates(getJobTemplates());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const selectedJob = templates.find(j => j.id === selectedJobId);
  const editingTask = selectedJob && editingTaskIndex >= 0 ? selectedJob.tasks[editingTaskIndex] : null;

  const handleSave = () => {
    saveJobTemplates(templates);
    alert('保存成功！');
  };

  const cloneTemplates = (prev: JobTemplate[], jobIndex: number) => {
    const next = [...prev];
    next[jobIndex] = { ...next[jobIndex], tasks: [...next[jobIndex].tasks] };
    return next;
  };

  const updateStep = (stepIndex: number, field: keyof Step, value: string) => {
    if (!selectedJob || editingTaskIndex < 0) return;
    setTemplates(prev => {
      const jobIndex = prev.findIndex(j => j.id === selectedJobId);
      const next = cloneTemplates(prev, jobIndex);
      const steps = [...next[jobIndex].tasks[editingTaskIndex].steps];
      steps[stepIndex] = { ...steps[stepIndex], [field]: value };
      next[jobIndex].tasks[editingTaskIndex] = {
        ...next[jobIndex].tasks[editingTaskIndex],
        steps,
      };
      return next;
    });
  };

  const addStep = () => {
    if (!selectedJob || editingTaskIndex < 0) return;
    setTemplates(prev => {
      const jobIndex = prev.findIndex(j => j.id === selectedJobId);
      const next = cloneTemplates(prev, jobIndex);
      const steps = [...next[jobIndex].tasks[editingTaskIndex].steps];
      const newStep: Step = {
        order: steps.length + 1,
        title: '新步骤',
        description: '步骤说明',
      };
      next[jobIndex].tasks[editingTaskIndex] = {
        ...next[jobIndex].tasks[editingTaskIndex],
        steps: [...steps, newStep],
      };
      return next;
    });
  };

  const removeStep = (stepIndex: number) => {
    if (!selectedJob || editingTaskIndex < 0) return;
    setTemplates(prev => {
      const jobIndex = prev.findIndex(j => j.id === selectedJobId);
      const next = cloneTemplates(prev, jobIndex);
      const steps = next[jobIndex].tasks[editingTaskIndex].steps
        .filter((_, i) => i !== stepIndex)
        .map((s, i) => ({ ...s, order: i + 1 }));
      next[jobIndex].tasks[editingTaskIndex] = {
        ...next[jobIndex].tasks[editingTaskIndex],
        steps,
      };
      return next;
    });
  };

  const moveStep = (stepIndex: number, direction: 'up' | 'down') => {
    if (!selectedJob || editingTaskIndex < 0) return;
    setTemplates(prev => {
      const jobIndex = prev.findIndex(j => j.id === selectedJobId);
      const next = cloneTemplates(prev, jobIndex);
      const steps = next[jobIndex].tasks[editingTaskIndex].steps.map(s => ({ ...s }));
      const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
      if (targetIndex < 0 || targetIndex >= steps.length) return prev;
      [steps[stepIndex], steps[targetIndex]] = [steps[targetIndex], steps[stepIndex]];
      steps.forEach((s, i) => { s.order = i + 1; });
      next[jobIndex].tasks[editingTaskIndex] = {
        ...next[jobIndex].tasks[editingTaskIndex],
        steps,
      };
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-2xl text-[#64748B] btn-press">←</Link>
          <h1 className="text-2xl font-bold text-[#1E293B]">任务模板编辑器</h1>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#22C55E] text-white px-6 py-2 rounded-xl font-semibold btn-press"
        >
          保存
        </button>
      </div>

      {!selectedJobId ? (
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B] mb-4">选择岗位</h2>
          <div className="flex flex-col gap-3">
            {templates.map((job) => (
              <button
                key={job.id}
                onClick={() => { setSelectedJobId(job.id); setEditingTaskIndex(-1); }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 btn-press text-left"
              >
                <span className="text-3xl">{job.icon}</span>
                <span className="text-xl font-bold text-[#1E293B]">{job.name}</span>
                <span className="text-[#64748B] ml-auto">{job.tasks.length}个任务</span>
              </button>
            ))}
          </div>
        </div>
      ) : editingTaskIndex < 0 ? (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setSelectedJobId('')} className="text-[#4F46E5] font-medium btn-press">← 返回</button>
            <h2 className="text-lg font-semibold text-[#1E293B]">{selectedJob?.icon} {selectedJob?.name} 的任务</h2>
          </div>
          <div className="flex flex-col gap-3">
            {selectedJob?.tasks.map((task, i) => (
              <button
                key={task.id}
                onClick={() => setEditingTaskIndex(i)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 btn-press text-left"
              >
                <span className="text-2xl">{task.icon}</span>
                <span className="text-lg font-bold text-[#1E293B]">{task.name}</span>
                <span className="text-[#64748B] ml-auto">{task.steps.length}步</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setEditingTaskIndex(-1)} className="text-[#4F46E5] font-medium btn-press">← 返回</button>
            <h2 className="text-lg font-semibold text-[#1E293B]">{editingTask?.icon} {editingTask?.name}</h2>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="ml-auto bg-[#4F46E5] text-white px-3 py-1 rounded-lg text-sm btn-press"
            >
              {previewMode ? '编辑' : '预览'}
            </button>
          </div>

          {previewMode && editingTask ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {editingTask.steps.map((step, i) => (
                <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
                  <p className="text-sm text-[#4F46E5] font-medium mb-1">第 {step.order} 步</p>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-1">{step.title}</h3>
                  <p className="text-base text-[#64748B]">{step.description}</p>
                  {step.tip && <p className="text-sm text-[#4F46E5] mt-1">💡 {step.tip}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {editingTask?.steps.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[#4F46E5]">第 {step.order} 步</span>
                    <div className="flex gap-2">
                      <button onClick={() => moveStep(i, 'up')} disabled={i === 0} className="text-[#64748B] btn-press disabled:opacity-30">↑</button>
                      <button onClick={() => moveStep(i, 'down')} disabled={i === (editingTask?.steps.length || 0) - 1} className="text-[#64748B] btn-press disabled:opacity-30">↓</button>
                      <button onClick={() => removeStep(i)} className="text-red-400 btn-press">✕</button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(i, 'title', e.target.value)}
                    placeholder="步骤标题"
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-[#1E293B] mb-2 focus:outline-none focus:border-[#4F46E5]"
                  />
                  <textarea
                    value={step.description}
                    onChange={(e) => updateStep(i, 'description', e.target.value)}
                    placeholder="步骤说明"
                    rows={2}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-[#1E293B] mb-2 focus:outline-none focus:border-[#4F46E5] resize-none"
                  />
                  <input
                    type="text"
                    value={step.tip || ''}
                    onChange={(e) => updateStep(i, 'tip', e.target.value)}
                    placeholder="提示（可选）"
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-[#1E293B] focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>
              ))}
              <button
                onClick={addStep}
                className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 text-[#4F46E5] font-semibold btn-press"
              >
                + 添加步骤
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
