'use client';
import { useState, useCallback } from 'react';
import { Step } from '@/types';
import { addCompletionRecord } from '@/lib/storage';

export function useTaskProgress(taskId: string, taskName: string, jobName: string, steps: Step[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime] = useState(() => new Date().toISOString());
  const [isComplete, setIsComplete] = useState(false);
  const [stepKey, setStepKey] = useState(0);

  const completeCurrentStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      return false;
    } else {
      const endTime = new Date().toISOString();
      addCompletionRecord({
        taskId,
        jobName,
        taskName,
        startTime,
        endTime,
        stepsCompleted: steps.length,
        totalSteps: steps.length,
      });
      setIsComplete(true);
      return true;
    }
  }, [currentStep, steps.length, taskId, jobName, taskName, startTime]);

  const resetStep = useCallback(() => {
    setStepKey(prev => prev + 1);
  }, []);

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return {
    currentStep,
    currentStepData: steps[currentStep] || null,
    progress,
    isComplete,
    completeCurrentStep,
    resetStep,
    stepKey,
    totalSteps: steps.length,
  };
}
