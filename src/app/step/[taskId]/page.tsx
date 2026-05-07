'use client';
import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StepCard from '@/components/StepCard';
import HelpPanel from '@/components/HelpPanel';
import { useSpeech } from '@/hooks/useSpeech';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { getJobTemplates, addHelpRecord } from '@/lib/storage';
import { JobTemplate, Task } from '@/types';

function StepPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const jobId = searchParams.get('jobId') || '';

  const [job, setJob] = useState<JobTemplate | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showWellDone, setShowWellDone] = useState(false);
  const wellDoneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { speak, stop } = useSpeech();

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const jobs = getJobTemplates();
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      const foundTask = foundJob.tasks.find(t => t.id === taskId);
      if (foundTask) setTask(foundTask);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [taskId, jobId]);

  const {
    currentStep,
    currentStepData,
    progress,
    isComplete,
    completeCurrentStep,
    resetStep,
    stepKey,
    totalSteps,
  } = useTaskProgress(
    taskId,
    task?.name || '',
    job?.name || '',
    task?.steps || []
  );

  useEffect(() => {
    if (currentStepData && !isComplete) {
      const text = `${currentStepData.title}。${currentStepData.description}`;
      const timer = setTimeout(() => speak(text), 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, stepKey, currentStepData, isComplete, speak]);

  useEffect(() => {
    if (isComplete) {
      stop();
      const timer = setTimeout(() => {
        router.push(`/complete?taskId=${taskId}&jobId=${jobId}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, taskId, jobId, router, stop]);

  useEffect(() => {
    return () => {
      if (wellDoneTimerRef.current) {
        clearTimeout(wellDoneTimerRef.current);
      }
    };
  }, []);

  const handleComplete = useCallback(() => {
    setShowWellDone(true);
    wellDoneTimerRef.current = setTimeout(() => {
      setShowWellDone(false);
      wellDoneTimerRef.current = null;
      completeCurrentStep();
    }, 800);
  }, [completeCurrentStep]);

  const handleReplay = useCallback(() => {
    if (currentStepData) {
      speak(`${currentStepData.title}。${currentStepData.description}`);
    }
  }, [currentStepData, speak]);

  const handleUnclear = useCallback(() => {
    setShowHelp(false);
    if (currentStepData) {
      speak(`${currentStepData.title}。${currentStepData.description}`);
    }
  }, [currentStepData, speak]);

  const handleRedo = useCallback(() => {
    setShowHelp(false);
    resetStep();
    if (currentStepData) {
      speak(`${currentStepData.title}。${currentStepData.description}`);
    }
  }, [currentStepData, speak, resetStep]);

  const handleCallHelp = useCallback(() => {
    setShowHelp(false);
    addHelpRecord({
      taskId,
      taskName: task?.name || '',
      stepNumber: currentStep + 1,
      type: 'call_help',
      timestamp: new Date().toISOString(),
    });
    speak('已经通知辅导员，请稍等一下');
  }, [taskId, task, currentStep, speak]);

  if (!task || !currentStepData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-lg text-[#64748B]">加载中...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="flex items-center gap-3 px-4 pt-4">
        <Link href={`/task/${jobId}`} className="text-2xl text-[#64748B] btn-press">←</Link>
        <h1 className="text-lg font-bold text-[#1E293B]">{task.icon} {task.name}</h1>
      </div>

      <StepCard
        key={stepKey}
        step={currentStepData}
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
        onComplete={handleComplete}
        onReplay={handleReplay}
        onHelp={() => setShowHelp(true)}
      />

      {showWellDone && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
          <div className="animate-bounce-in text-center">
            <span className="text-7xl block mb-4">✅</span>
            <p className="text-3xl font-bold text-white">做得好！</p>
          </div>
        </div>
      )}

      {showHelp && (
        <HelpPanel
          onUnclear={handleUnclear}
          onRedo={handleRedo}
          onCallHelp={handleCallHelp}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}

export default function StepPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><p className="text-lg text-[#64748B]">加载中...</p></div>}>
      <StepPageContent />
    </Suspense>
  );
}
