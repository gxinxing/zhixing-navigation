import { JobTemplate, CompletionRecord, MoodRecord, MoodType, HelpRecord } from '@/types';
import { jobTemplates } from '@/data/templates';

const PREFIX = 'zhixing_';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}

export function getJobTemplates(): JobTemplate[] {
  return getItem<JobTemplate[]>('templates', jobTemplates);
}

export function saveJobTemplates(templates: JobTemplate[]): void {
  setItem('templates', templates);
}

export function getCompletionRecords(): CompletionRecord[] {
  return getItem<CompletionRecord[]>('completions', []);
}

export function addCompletionRecord(record: Omit<CompletionRecord, 'id'>): CompletionRecord {
  const newRecord: CompletionRecord = { ...record, id: generateId() };
  const records = getCompletionRecords();
  records.push(newRecord);
  setItem('completions', records);
  return newRecord;
}

export function getMoodRecords(): MoodRecord[] {
  return getItem<MoodRecord[]>('moods', []);
}

export function addMoodRecord(record: Omit<MoodRecord, 'id'>): MoodRecord {
  const newRecord: MoodRecord = { ...record, id: generateId() };
  const records = getMoodRecords();
  records.push(newRecord);
  setItem('moods', records);
  return newRecord;
}

export function getHelpRecords(): HelpRecord[] {
  return getItem<HelpRecord[]>('help', []);
}

export function addHelpRecord(record: Omit<HelpRecord, 'id'>): HelpRecord {
  const newRecord: HelpRecord = { ...record, id: generateId() };
  const records = getHelpRecords();
  records.push(newRecord);
  setItem('help', records);
  return newRecord;
}

export function getTodayStats(): { completions: number; helpCount: number; avgTime: number } {
  const today = new Date().toISOString().slice(0, 10);
  const completions = getCompletionRecords().filter(r => r.startTime.slice(0, 10) === today);
  const helpRecords = getHelpRecords().filter(r => r.timestamp.slice(0, 10) === today);

  let avgTime = 0;
  if (completions.length > 0) {
    const totalTime = completions.reduce((sum, r) => {
      return sum + (new Date(r.endTime).getTime() - new Date(r.startTime).getTime());
    }, 0);
    avgTime = totalTime / completions.length / 1000;
  }

  return {
    completions: completions.length,
    helpCount: helpRecords.length,
    avgTime,
  };
}

const moodValues: Record<MoodType, number> = {
  great: 5,
  good: 4,
  okay: 3,
  bad: 2,
  awful: 1,
};

export function getMoodTrend(days: number): { date: string; avg: number }[] {
  const records = getMoodRecords();
  const result: { date: string; avg: number }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayRecords = records.filter(r => r.timestamp.slice(0, 10) === dateStr);

    if (dayRecords.length > 0) {
      const avg = dayRecords.reduce((sum, r) => sum + moodValues[r.mood], 0) / dayRecords.length;
      result.push({ date: dateStr, avg: Math.round(avg * 10) / 10 });
    } else {
      result.push({ date: dateStr, avg: 0 });
    }
  }

  return result;
}
