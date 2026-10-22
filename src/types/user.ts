import { TenseId } from './tense';
import { QuizSessionSummary } from './exercise';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  authProvider: 'guest' | 'google';
  createdAt: string;
}

export interface Badge {
  id: string;
  titleTh: string;
  descriptionTh: string;
  iconName: string;
  unlockedAt?: string;
  category: 'lesson' | 'quiz' | 'streak' | 'vocabulary' | 'mastery';
  conditionText: string;
}

export interface UserProgressState {
  profile: UserProfile;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: TenseId[];
  inProgressLessons: TenseId[];
  savedVocabularyIds: string[];
  memorizedVocabularyIds: string[];
  quizHistory: QuizSessionSummary[];
  tensePerformance: Record<
    TenseId,
    {
      attempts: number;
      correct: number;
      percentage: number;
      lastTestedDate?: string;
    }
  >;
  unlockedBadgeIds: string[];
  dailyGoal: {
    targetMinutes: number;
    targetExercises: number;
    completedExercisesToday: number;
    lastUpdatedDate: string;
  };
  settings: {
    theme: 'light' | 'dark' | 'system';
    soundEnabled: boolean;
    showPhonetics: boolean;
    autoPronounce: boolean;
  };
}
