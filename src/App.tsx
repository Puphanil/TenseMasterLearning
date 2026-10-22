/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProgressState, Badge, UserProfile } from './types/user';
import { TenseId } from './types/tense';
import { QuizSessionSummary } from './types/exercise';
import {
  getStorageState,
  saveStorageState,
  markLessonComplete,
  recordQuizResult,
  toggleSaveVocabulary,
  toggleMemorizedVocabulary,
  resetAllProgress,
  evaluateBadges,
  defaultInitialState,
} from './services/storageService';
import {
  fetchRemoteProgress,
  saveRemoteProgress,
  mapFirebaseUserToProfile,
} from './services/authService';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Modals
import { BadgeNotificationModal } from './components/common/BadgeNotificationModal';
import { AuthModal } from './components/common/AuthModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Lessons } from './pages/Lessons';
import { TenseDetail } from './pages/TenseDetail';
import { TenseSummaryTable } from './pages/TenseSummaryTable';
import { Exercises } from './pages/Exercises';
import { TenseComparison } from './pages/TenseComparison';
import { Vocabulary } from './pages/Vocabulary';
import { AITutor } from './pages/AITutor';
import { Progress } from './pages/Progress';
import { Settings } from './pages/Settings';

export default function App() {
  const [progressState, setProgressState] = useState<UserProgressState>(getStorageState);
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<TenseId | null>(null);
  const [quizTenseFilter, setQuizTenseFilter] = useState<string>('all');
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string>('');

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Modals state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [unlockedBadgeToShow, setUnlockedBadgeToShow] = useState<Badge | null>(null);

  // Sync theme with HTML document class
  useEffect(() => {
    if (progressState.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progressState.settings.theme]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        const userProfile = mapFirebaseUserToProfile(firebaseUser);

        // Fetch remote learning progress from Firestore
        const remote = await fetchRemoteProgress(firebaseUser.uid);
        if (remote) {
          setProgressState((prev) => {
            const merged: UserProgressState = {
              ...prev,
              ...remote,
              profile: userProfile,
            };
            saveStorageState(merged);
            return merged;
          });
        } else {
          // Sync current local progress up to Firestore for this account
          setProgressState((prev) => {
            const updated = { ...prev, profile: userProfile };
            saveRemoteProgress(firebaseUser.uid, updated);
            saveStorageState(updated);
            return updated;
          });
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Theme Toggle
  const handleToggleTheme = () => {
    const nextTheme: 'light' | 'dark' =
      progressState.settings.theme === 'dark' ? 'light' : 'dark';
    const updated: UserProgressState = {
      ...progressState,
      settings: { ...progressState.settings, theme: nextTheme },
    };
    setProgressState(updated);
    saveStorageState(updated);
  };

  // Helper to persist state to LocalStorage and Firestore (if logged in)
  const commitState = (state: UserProgressState) => {
    setProgressState(state);
    saveStorageState(state);
    if (auth.currentUser) {
      saveRemoteProgress(auth.currentUser.uid, state);
    }
  };

  // Handle Mark Lesson Complete
  const handleMarkComplete = (tenseId: TenseId) => {
    const { newState, newBadges } = markLessonComplete(progressState, tenseId);
    commitState(newState);
    if (newBadges.length > 0) {
      setUnlockedBadgeToShow(newBadges[0]);
    }
  };

  // Handle Quiz Record Summary
  const handleRecordQuizSummary = (summary: QuizSessionSummary) => {
    const { newState, newBadges } = recordQuizResult(progressState, summary);
    commitState(newState);
    if (newBadges.length > 0) {
      setUnlockedBadgeToShow(newBadges[0]);
    }
  };

  // Handle Toggle Vocabulary Bookmark
  const handleToggleSaveVocab = (vocabId: string) => {
    const updated = toggleSaveVocabulary(progressState, vocabId);
    commitState(updated);
  };

  // Handle Toggle Memorized Vocabulary
  const handleToggleMemorizedVocab = (vocabId: string, isMemorized: boolean) => {
    const { newState, newBadges } = toggleMemorizedVocabulary(
      progressState,
      vocabId,
      isMemorized
    );
    commitState(newState);
    if (newBadges.length > 0) {
      setUnlockedBadgeToShow(newBadges[0]);
    }
  };

  // Navigation handlers
  const handleSelectLesson = (tenseId: string) => {
    setSelectedLessonId(tenseId as TenseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuizForTense = (tenseId: string) => {
    setQuizTenseFilter(tenseId);
    setSelectedLessonId(null);
    setCurrentTab('exercises');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAIAboutTense = (tenseName: string) => {
    setTutorInitialPrompt(`ช่วยอธิบายสรุปหัวใจสำคัญของ ${tenseName} และยกตัวอย่างที่ใช้บ่อยในชีวิตประจำวันให้หน่อยครับ`);
    setSelectedLessonId(null);
    setCurrentTab('aitutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: NavTab) => {
    setSelectedLessonId(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset Progress
  const handleResetProgress = () => {
    const clean = resetAllProgress();
    commitState(clean);
    setSelectedLessonId(null);
    setCurrentTab('dashboard');
  };

  // Update Settings
  const handleUpdateSettings = (settings: UserProgressState['settings']) => {
    const updated = {
      ...progressState,
      settings,
    };
    commitState(updated);
  };

  // Update Daily Target
  const handleUpdateDailyTarget = (newTarget: number) => {
    const updated = {
      ...progressState,
      dailyGoal: {
        ...progressState.dailyGoal,
        targetExercises: newTarget,
      },
    };
    commitState(updated);
  };

  // Comparison Quiz Done badge evaluation
  const handleComparisonDone = () => {
    const summary: QuizSessionSummary = {
      tenseId: 'comparison',
      date: new Date().toISOString(),
      totalQuestions: 1,
      correctAnswers: 1,
      scorePercentage: 100,
      xpEarned: 20,
      attempts: [],
    };
    handleRecordQuizSummary(summary);
  };

  // Auth Handlers
  const handleAuthSuccess = async (profile: UserProfile) => {
    setIsLoggedIn(true);
    const remote = await fetchRemoteProgress(profile.id);
    if (remote) {
      const merged: UserProgressState = {
        ...progressState,
        ...remote,
        profile,
      };
      setProgressState(merged);
      saveStorageState(merged);
    } else {
      const updated = { ...progressState, profile };
      setProgressState(updated);
      saveStorageState(updated);
      saveRemoteProgress(profile.id, updated);
    }
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
    const guestState: UserProgressState = {
      ...progressState,
      profile: defaultInitialState.profile,
    };
    setProgressState(guestState);
    saveStorageState(guestState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        progressState={progressState}
        isLoggedIn={isLoggedIn}
        onToggleTheme={handleToggleTheme}
        onOpenProfile={() => setIsAuthModalOpen(true)}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        currentTheme={progressState.settings.theme === 'dark' ? 'dark' : 'light'}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleTabChange}
          progressState={progressState}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-12 max-w-full">
          {selectedLessonId ? (
            /* DETAILED TENSE LESSON VIEW */
            <TenseDetail
              tenseId={selectedLessonId}
              progressState={progressState}
              onBack={() => setSelectedLessonId(null)}
              onSelectTense={(id) => handleSelectLesson(id)}
              onStartQuiz={(id) => handleStartQuizForTense(id)}
              onMarkComplete={handleMarkComplete}
              onToggleVocab={handleToggleSaveVocab}
              onAskAIAboutTense={handleAskAIAboutTense}
            />
          ) : (
            /* ACTIVE TAB VIEW */
            <>
              {currentTab === 'dashboard' && (
                <Dashboard
                  progressState={progressState}
                  onNavigateTab={handleTabChange}
                  onSelectLesson={handleSelectLesson}
                  onOpenProfile={() => setIsAuthModalOpen(true)}
                />
              )}

              {currentTab === 'lessons' && (
                <Lessons
                  progressState={progressState}
                  onSelectLesson={handleSelectLesson}
                  onStartQuiz={handleStartQuizForTense}
                />
              )}

              {currentTab === 'summary' && (
                <TenseSummaryTable onSelectTense={handleSelectLesson} />
              )}

              {currentTab === 'vocabulary' && (
                <Vocabulary
                  progressState={progressState}
                  onToggleSaveVocab={handleToggleSaveVocab}
                  onToggleMemorizedVocab={handleToggleMemorizedVocab}
                />
              )}

              {currentTab === 'exercises' && (
                <Exercises
                  progressState={progressState}
                  initialTenseFilter={quizTenseFilter}
                  onRecordQuizSummary={handleRecordQuizSummary}
                  onSelectTenseLesson={handleSelectLesson}
                />
              )}

              {currentTab === 'comparison' && (
                <TenseComparison
                  onSelectTenseLesson={handleSelectLesson}
                  onRecordComparisonQuizDone={handleComparisonDone}
                />
              )}

              {currentTab === 'aitutor' && (
                <AITutor
                  initialPrompt={tutorInitialPrompt}
                  onTutorActionTriggered={() => {
                    // Trigger ai curious badge check
                    const { stateWithBadges, newBadges } = evaluateBadges({
                      ...progressState,
                      unlockedBadgeIds: [...progressState.unlockedBadgeIds, 'badge-ai-curious'],
                    });
                    commitState(stateWithBadges);
                    if (newBadges.length > 0) {
                      setUnlockedBadgeToShow(newBadges[0]);
                    }
                  }}
                />
              )}

              {currentTab === 'progress' && (
                <Progress
                  progressState={progressState}
                  onSelectTenseLesson={handleSelectLesson}
                  onStartQuiz={handleStartQuizForTense}
                />
              )}

              {currentTab === 'settings' && (
                <Settings
                  progressState={progressState}
                  onUpdateSettings={handleUpdateSettings}
                  onUpdateDailyTarget={handleUpdateDailyTarget}
                  onResetProgress={handleResetProgress}
                  onOpenProfileModal={() => setIsAuthModalOpen(true)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Bar & Drawer */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        isOpenDrawer={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
        onOpenDrawer={() => setIsMobileDrawerOpen(true)}
        progressState={progressState}
      />

      {/* Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentProfile={progressState.profile}
        isLoggedIn={isLoggedIn}
        onAuthSuccess={handleAuthSuccess}
        onLogoutSuccess={handleLogoutSuccess}
      />

      {/* Badge Celebration Modal */}
      <BadgeNotificationModal
        badge={unlockedBadgeToShow}
        onClose={() => setUnlockedBadgeToShow(null)}
      />
    </div>
  );
}
