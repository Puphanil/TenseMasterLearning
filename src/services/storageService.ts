import { UserProgressState, Badge } from '../types/user';
import { TenseId } from '../types/tense';
import { QuizSessionSummary } from '../types/exercise';
import { allBadges } from '../data/badges';

const STORAGE_KEY = 'english_tense_master_state_v1';

const getTodayDateString = (): string => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const getYesterdayDateString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const defaultInitialState: UserProgressState = {
  profile: {
    id: 'user_local_' + Math.random().toString(36).substring(2, 9),
    name: 'ผู้เรียนคนเก่ง',
    authProvider: 'guest',
    createdAt: new Date().toISOString(),
  },
  xp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: getTodayDateString(),
  completedLessons: [],
  inProgressLessons: [],
  savedVocabularyIds: ['voc-1', 'voc-8'],
  memorizedVocabularyIds: [],
  quizHistory: [],
  tensePerformance: {
    'present-simple': { attempts: 0, correct: 0, percentage: 0 },
    'present-continuous': { attempts: 0, correct: 0, percentage: 0 },
    'present-perfect': { attempts: 0, correct: 0, percentage: 0 },
    'present-perfect-continuous': { attempts: 0, correct: 0, percentage: 0 },
    'past-simple': { attempts: 0, correct: 0, percentage: 0 },
    'past-continuous': { attempts: 0, correct: 0, percentage: 0 },
    'past-perfect': { attempts: 0, correct: 0, percentage: 0 },
    'past-perfect-continuous': { attempts: 0, correct: 0, percentage: 0 },
    'future-simple': { attempts: 0, correct: 0, percentage: 0 },
    'future-continuous': { attempts: 0, correct: 0, percentage: 0 },
    'future-perfect': { attempts: 0, correct: 0, percentage: 0 },
    'future-perfect-continuous': { attempts: 0, correct: 0, percentage: 0 },
  },
  unlockedBadgeIds: [],
  dailyGoal: {
    targetMinutes: 15,
    targetExercises: 5,
    completedExercisesToday: 0,
    lastUpdatedDate: getTodayDateString(),
  },
  settings: {
    theme: 'light',
    soundEnabled: true,
    showPhonetics: true,
    autoPronounce: false,
  },
};

// Calculate level from XP (every 100 XP is 1 level)
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getStorageState = (): UserProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStorageState(defaultInitialState);
      return defaultInitialState;
    }
    const parsed = JSON.parse(raw) as UserProgressState;

    // Check and update streak
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if (parsed.lastActiveDate !== today) {
      if (parsed.lastActiveDate === yesterday) {
        // Continuous streak
        parsed.streakDays += 1;
      } else {
        // Streak broken
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;

      // Reset daily exercises if new day
      if (parsed.dailyGoal.lastUpdatedDate !== today) {
        parsed.dailyGoal.completedExercisesToday = 0;
        parsed.dailyGoal.lastUpdatedDate = today;
      }

      saveStorageState(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Error loading storage state:', err);
    return defaultInitialState;
  }
};

export const saveStorageState = (state: UserProgressState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving storage state:', err);
  }
};

export const markLessonComplete = (
  currentState: UserProgressState,
  tenseId: TenseId
): { newState: UserProgressState; newBadges: Badge[] } => {
  const isAlreadyDone = currentState.completedLessons.includes(tenseId);
  const updatedCompleted = isAlreadyDone
    ? currentState.completedLessons
    : [...currentState.completedLessons, tenseId];

  const addedXp = isAlreadyDone ? 10 : 50;
  const newXp = currentState.xp + addedXp;
  const newLevel = calculateLevel(newXp);

  const updatedState: UserProgressState = {
    ...currentState,
    completedLessons: updatedCompleted,
    xp: newXp,
    level: newLevel,
  };

  const { stateWithBadges, newBadges } = evaluateBadges(updatedState);
  saveStorageState(stateWithBadges);
  return { newState: stateWithBadges, newBadges };
};

export const recordQuizResult = (
  currentState: UserProgressState,
  summary: QuizSessionSummary
): { newState: UserProgressState; newBadges: Badge[] } => {
  const today = getTodayDateString();
  const addedXp = summary.xpEarned;
  const newXp = currentState.xp + addedXp;
  const newLevel = calculateLevel(newXp);

  // Update specific tense performance
  const updatedTensePerf = { ...currentState.tensePerformance };
  if (summary.tenseId !== 'all' && summary.tenseId !== 'comparison') {
    const existing = updatedTensePerf[summary.tenseId as TenseId] || {
      attempts: 0,
      correct: 0,
      percentage: 0,
    };
    const totalAttempts = existing.attempts + summary.totalQuestions;
    const totalCorrect = existing.correct + summary.correctAnswers;
    const percentage = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    updatedTensePerf[summary.tenseId as TenseId] = {
      attempts: totalAttempts,
      correct: totalCorrect,
      percentage,
      lastTestedDate: today,
    };
  }

  // Update daily completed count
  const updatedDailyExercises =
    (currentState.dailyGoal.lastUpdatedDate === today
      ? currentState.dailyGoal.completedExercisesToday
      : 0) + summary.totalQuestions;

  const updatedState: UserProgressState = {
    ...currentState,
    xp: newXp,
    level: newLevel,
    quizHistory: [summary, ...currentState.quizHistory.slice(0, 49)],
    tensePerformance: updatedTensePerf,
    dailyGoal: {
      ...currentState.dailyGoal,
      completedExercisesToday: updatedDailyExercises,
      lastUpdatedDate: today,
    },
  };

  const { stateWithBadges, newBadges } = evaluateBadges(updatedState);
  saveStorageState(stateWithBadges);
  return { newState: stateWithBadges, newBadges };
};

export const toggleSaveVocabulary = (
  currentState: UserProgressState,
  vocabId: string
): UserProgressState => {
  const exists = currentState.savedVocabularyIds.includes(vocabId);
  const updated = exists
    ? currentState.savedVocabularyIds.filter((id) => id !== vocabId)
    : [...currentState.savedVocabularyIds, vocabId];

  const newState = {
    ...currentState,
    savedVocabularyIds: updated,
  };
  saveStorageState(newState);
  return newState;
};

export const toggleMemorizedVocabulary = (
  currentState: UserProgressState,
  vocabId: string,
  isMemorized: boolean
): { newState: UserProgressState; newBadges: Badge[] } => {
  let updated = [...currentState.memorizedVocabularyIds];
  if (isMemorized && !updated.includes(vocabId)) {
    updated.push(vocabId);
  } else if (!isMemorized && updated.includes(vocabId)) {
    updated = updated.filter((id) => id !== vocabId);
  }

  const newState = {
    ...currentState,
    memorizedVocabularyIds: updated,
    xp: isMemorized ? currentState.xp + 5 : currentState.xp,
  };

  const { stateWithBadges, newBadges } = evaluateBadges(newState);
  saveStorageState(stateWithBadges);
  return { newState: stateWithBadges, newBadges };
};

export const evaluateBadges = (
  state: UserProgressState
): { stateWithBadges: UserProgressState; newBadges: Badge[] } => {
  const currentUnlocked = new Set(state.unlockedBadgeIds);
  const newlyUnlocked: Badge[] = [];

  for (const badge of allBadges) {
    if (currentUnlocked.has(badge.id)) continue;

    let qualifies = false;

    switch (badge.id) {
      case 'badge-first-step':
        qualifies = state.completedLessons.length >= 1;
        break;
      case 'badge-trio-learner':
        qualifies = state.completedLessons.length >= 3;
        break;
      case 'badge-12-tenses-master':
        qualifies = state.completedLessons.length >= 12;
        break;
      case 'badge-quiz-ace':
        qualifies = state.quizHistory.some((q) => q.scorePercentage === 100);
        break;
      case 'badge-quiz-grinder': {
        const totalCorrect = state.quizHistory.reduce((acc, q) => acc + q.correctAnswers, 0);
        qualifies = totalCorrect >= 20;
        break;
      }
      case 'badge-streak-3':
        qualifies = state.streakDays >= 3;
        break;
      case 'badge-streak-7':
        qualifies = state.streakDays >= 7;
        break;
      case 'badge-vocab-collector':
        qualifies = (state.savedVocabularyIds.length + state.memorizedVocabularyIds.length) >= 5;
        break;
      case 'badge-vocab-scholar':
        qualifies = state.memorizedVocabularyIds.length >= 15;
        break;
      case 'badge-comparator':
        qualifies = state.quizHistory.some((q) => q.tenseId === 'comparison');
        break;
      default:
        break;
    }

    if (qualifies) {
      currentUnlocked.add(badge.id);
      newlyUnlocked.push(badge);
    }
  }

  const stateWithBadges = {
    ...state,
    unlockedBadgeIds: Array.from(currentUnlocked),
  };

  return { stateWithBadges, newBadges: newlyUnlocked };
};

export const resetAllProgress = (): UserProgressState => {
  const cleanState: UserProgressState = {
    ...defaultInitialState,
    profile: {
      ...defaultInitialState.profile,
      id: 'user_local_' + Math.random().toString(36).substring(2, 9),
    },
    lastActiveDate: getTodayDateString(),
  };
  saveStorageState(cleanState);
  return cleanState;
};
