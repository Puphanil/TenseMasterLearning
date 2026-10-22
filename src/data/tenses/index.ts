import { TenseLesson, TenseId, TenseGroup, DifficultyLevel } from '../../types/tense';
import { presentTenses } from './presentTenses';
import { pastTenses } from './pastTenses';
import { futureTenses } from './futureTenses';

export const allTenses: TenseLesson[] = [
  ...presentTenses,
  ...pastTenses,
  ...futureTenses,
];

export const getTenseById = (id: TenseId): TenseLesson | undefined => {
  return allTenses.find((t) => t.id === id);
};

export const getTensesByGroup = (group: TenseGroup): TenseLesson[] => {
  return allTenses.filter((t) => t.group === group);
};

export const getTensesByLevel = (level: DifficultyLevel): TenseLesson[] => {
  return allTenses.filter((t) => t.level === level);
};

export const tenseColorMap: Record<TenseGroup, { bg: string; text: string; border: string; badge: string; accent: string }> = {
  present: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
    accent: 'blue',
  },
  past: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    accent: 'amber',
  },
  future: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    accent: 'emerald',
  },
};
