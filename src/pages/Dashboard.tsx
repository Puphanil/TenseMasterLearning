import React from 'react';
import { UserProgressState } from '../types/user';
import { allTenses, getTenseById } from '../data/tenses';
import {
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  BookMarked,
  Bot,
  Sparkles,
  Zap,
  Target,
} from 'lucide-react';
import { NavTab } from '../components/layout/Sidebar';

interface DashboardProps {
  progressState: UserProgressState;
  onNavigateTab: (tab: NavTab) => void;
  onSelectLesson: (tenseId: string) => void;
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progressState,
  onNavigateTab,
  onSelectLesson,
  onOpenProfile,
}) => {
  const {
    profile,
    completedLessons,
    streakDays,
    xp,
    level,
    savedVocabularyIds,
    memorizedVocabularyIds,
    quizHistory,
    dailyGoal,
  } = progressState;

  const totalLessons = allTenses.length; // 12
  const completedCount = completedLessons.length;
  const isNewUser = completedCount === 0;

  // Calculate Average Quiz Score
  const totalQuizAttempts = quizHistory.length;
  const averageScore =
    totalQuizAttempts > 0
      ? Math.round(
          quizHistory.reduce((acc, q) => acc + q.scorePercentage, 0) /
            totalQuizAttempts
        )
      : 0;

  // Total vocab learned/saved
  const totalVocabCount = new Set([
    ...savedVocabularyIds,
    ...memorizedVocabularyIds,
  ]).size;

  // Next recommended lesson
  const nextLessonId =
    allTenses.find((t) => !completedLessons.includes(t.id))?.id ||
    'present-simple';
  const nextLesson = getTenseById(nextLessonId);

  // Last completed lesson
  const lastCompletedId = completedLessons[completedLessons.length - 1];
  const lastCompletedLesson = lastCompletedId
    ? getTenseById(lastCompletedId)
    : null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white p-6 sm:p-8 shadow-lg shadow-blue-500/15">
        {/* Background glow orbs */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>ยินดีต้อนรับสู่ Tense Master</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              สวัสดี, {profile.name} 👋
            </h1>

            <p className="text-blue-100 text-sm sm:text-base mt-2 leading-relaxed">
              {isNewUser
                ? 'เริ่มต้นเรียนรู้ 12 Tenses ตั้งแต่วันนี้ด้วยภาษาไทยที่เข้าใจง่าย อธิบายเหตุผลจริง ไม่ต้องท่องจำสูตร!'
                : `คุณเรียนจบไปแล้ว ${completedCount} จาก 12 Tenses ทำได้ดีมาก! มาลุยต่อเพื่อพิชิตไวยากรณ์ภาษาอังกฤษกัน`}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              {isNewUser ? (
                <button
                  onClick={() => onSelectLesson('present-simple')}
                  className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  <span>เริ่มเรียนภาษาอังกฤษ (บทแรก: Present Simple)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onSelectLesson(nextLessonId)}
                  className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  <span>เรียนต่อ: {nextLesson?.nameEn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => onNavigateTab('aitutor')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>ถามข้อสงสัยกับ AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Quick stats mini cards on the right */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-center min-w-[110px]">
              <Flame className="w-5 h-5 text-amber-300 mx-auto mb-1 fill-amber-300" />
              <div className="text-xl font-black">{streakDays} วัน</div>
              <div className="text-[11px] text-blue-100">Learning Streak</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-center min-w-[110px]">
              <Zap className="w-5 h-5 text-yellow-300 mx-auto mb-1 fill-yellow-300" />
              <div className="text-xl font-black">{xp} XP</div>
              <div className="text-[11px] text-blue-100">เลเวล {level}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total & Completed Lessons */}
        <div
          onClick={() => onNavigateTab('lessons')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">บทเรียนทั้งหมด</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {completedCount}{' '}
            <span className="text-sm font-semibold text-slate-400">
              / {totalLessons}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalLessons) * 100}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            เรียนจบแล้ว {Math.round((completedCount / totalLessons) * 100)}%
          </p>
        </div>

        {/* Average Quiz Score */}
        <div
          onClick={() => onNavigateTab('exercises')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">คะแนนเฉลี่ยแบบฝึกหัด</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {averageScore}%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3.5">
            {totalQuizAttempts === 0
              ? 'ยังไม่มีประวัติการทำข้อสอบ'
              : `จากทั้งหมด ${totalQuizAttempts} ชุดแบบทดสอบ`}
          </p>
        </div>

        {/* Vocabulary Count */}
        <div
          onClick={() => onNavigateTab('vocabulary')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">คลังคำศัพท์ที่เรียนแล้ว</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <BookMarked className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {totalVocabCount} คำ
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3.5">
            จำได้แม่น {memorizedVocabularyIds.length} คำ | บันทึก {savedVocabularyIds.length} คำ
          </p>
        </div>

        {/* Daily Goal Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">เป้าหมายประจำวัน</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {dailyGoal.completedExercisesToday}{' '}
            <span className="text-sm font-semibold text-slate-400">
              / {dailyGoal.targetExercises} ข้อ
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (dailyGoal.completedExercisesToday / dailyGoal.targetExercises) *
                    100
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {dailyGoal.completedExercisesToday >= dailyGoal.targetExercises
              ? '🎉 พิชิตเป้าหมายประจำวันสำเร็จ!'
              : `ทำแบบฝึกหัดอีก ${Math.max(
                  0,
                  dailyGoal.targetExercises - dailyGoal.completedExercisesToday
                )} ข้อเพื่อบรรลุเป้าหมาย`}
          </p>
        </div>
      </div>

      {/* Recommended Next Lesson & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next recommended lesson (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                บทเรียนแนะนำถัดไป
              </span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {nextLesson?.nameEn}
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {nextLesson?.group.toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {nextLesson?.tagline}
          </p>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 mb-5">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              โครงสร้างหลัก:
            </div>
            <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
              {nextLesson?.structure.affirmative}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-xs"
            >
              <span>เริ่มเรียนบทนี้เลย</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('lessons')}
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              ดูบทเรียนทั้งหมด (12)
            </button>
          </div>
        </div>

        {/* Quick Tools & Shortcuts (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">
              เครื่องมือช่วยฝึกฝน
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('summary')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    ตารางสรุป 12 Tenses
                  </div>
                  <div className="text-[11px] text-slate-400">
                    เปรียบเทียบโครงสร้างในหน้าเดียว
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('comparison')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    เปรียบเทียบ Tense ที่มักสับสน
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Past Simple vs Present Perfect ฯลฯ
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('aitutor')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/40 dark:bg-purple-950/20 hover:bg-purple-100/60 dark:hover:bg-purple-950/40 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-purple-600 text-white shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-900 dark:text-purple-200">
                    ครูท็อป AI Tutor
                  </div>
                  <div className="text-[11px] text-purple-700/80 dark:text-purple-300">
                    ตรวจประโยคและตอบคำถามสด
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={onOpenProfile}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              แก้ไขโปรไฟล์หรือเข้าสู่ระบบ Google →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
