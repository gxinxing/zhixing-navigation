export interface Step {
  order: number;
  title: string;
  description: string;
  tip?: string;
  image?: string;
}

export interface Task {
  id: string;
  name: string;
  icon: string;
  steps: Step[];
}

export interface JobTemplate {
  id: string;
  name: string;
  icon: string;
  tasks: Task[];
}

export interface CompletionRecord {
  id: string;
  taskId: string;
  jobName: string;
  taskName: string;
  startTime: string;
  endTime: string;
  stepsCompleted: number;
  totalSteps: number;
}

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'awful';

export interface MoodRecord {
  id: string;
  mood: MoodType;
  timestamp: string;
  context: 'before' | 'after';
}

export type HelpType = 'unclear' | 'redo' | 'call_help';

export interface HelpRecord {
  id: string;
  taskId: string;
  taskName: string;
  stepNumber: number;
  type: HelpType;
  timestamp: string;
}
