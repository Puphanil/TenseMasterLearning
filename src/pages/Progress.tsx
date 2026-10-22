import React from 'react';
import { UserProgressState } from '../types/user';
import { allTenses, getTenseById } from '../data/tenses';
import { allBadges } from '../data/badges';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Flame,
  BookOpen,
  Zap,
  Target,
  Sparkles,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ProgressProps {
  progressState: UserProgressState;
  onSelectTenseLesson: (tenseId: string) => void;
  onStartQuiz: (tenseId: string) => void;
}

export const Progress: React.FC<ProgressProps> = ({
  progressState,
  onSelectTenseLesson,
  onStartQuiz,
}) => {
  const {
    completedLessons,
    streakDays,
    xp,
    level,
    savedVocabularyIds,
    memorizedVocabularyIds,
    quizHistory,
    tensePerformance,
    unlockedBadgeIds,
  } = progressState;

  const totalLessons = allTenses.length;
  const completedCount = completedLessons.length;
  const uncompletedCount = totalLessons - completedCount;

  // Real Tense performance analysis
  const performanceEntries = Object.entries(tensePerformance)
    .map(([tenseId, data]) => ({
      tenseId,
      name: getTenseById(tenseId as any)?.nameEn.replace(' Tense', '') || tenseId,
      percentage: data.attempts > 0 ? data.percentage : 0,
      attempts: data.attempts,
      correct: data.correct,
    }))
    .filter((p) => p.attempts > 0);

  // Best tense and needs review
  let bestTense = null;
  let needsReviewTense = null;

  if (performanceEntries.length > 0) {
    const sorted = [...performanceEntries].sort(
      (a, b) => b.percentage - a.percentage
    );
    bestTense = sorted[0];
    needsReviewTense = sorted[sorted.length - 1];
  }

  // Chart data: Group completion
  const groupStats = [
    {
      name: 'Present (ปัจจุบัน)',
      completed: allTenses
        .filter((t) => t.group === 'present')
        .filter((t) => completedLessons.includes(t.id)).length,
      total: 4,
      fill: '#3b82f6',
    },
    {
      name: 'Past (อดีต)',
      completed: allTenses
        .filter((t) => t.group === 'past')
        .filter((t) => completedLessons.includes(t.id)).length,
      total: 4,
      fill: '#f59e0b',
    },
    {
      name: 'Future (อนาคต)',
      completed: allTenses
        .filter((t) => t.group === 'future')
        .filter((t) => completedLessons.includes(t.id)).length,
      total: 4,
      fill: '#10b981',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          สถิติและความก้าวหน้าของฉัน (Learning Analytics)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          คำนวณจากประวัติการเรียน การตอบแบบฝึกหัด และการท่องจำคำศัพท์จริงของคุณ
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>บทเรียนจบแล้ว</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completedCount}{' '}
            <span className="text-xs text-slate-400 font-normal">/ {totalLessons}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            ยังไม่ได้เรียน {uncompletedCount} บท
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>พลังความรู้ (XP)</span>
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {xp}{' '}
            <span className="text-xs text-slate-400 font-normal">XP</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
            เลเวล {level} (Lv.{level})
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>ต่อเนื่อง (Streak)</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {streakDays}{' '}
            <span className="text-xs text-slate-400 font-normal">วัน</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            เข้าเรียนสม่ำเสมอ
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>คำศัพท์ในคลัง</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {memorizedVocabularyIds.length}{' '}
            <span className="text-xs text-slate-400 font-normal">คำ</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            จำได้แม่นยำแล้ว
          </div>
        </div>
      </div>

      {/* Best Tense vs Needs Review Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Best Tense */}
        <div className="p-5 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tense ที่เข้าใจดีที่สุด:</span>
          </div>
          {bestTense ? (
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {bestTense.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                ทำคะแนนได้แม่นยำถึง <strong>{bestTense.percentage}%</strong> (ตอบถูก {bestTense.correct} จาก {bestTense.attempts} ข้อ)
              </p>
              <button
                onClick={() => onSelectTenseLesson(bestTense.tenseId)}
                className="mt-3 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                ดูรายละเอียด Tense นี้ →
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              ทำแบบฝึกหัดอย่างน้อย 1 ชุดเพื่อเริ่มคำนวณ Tense ที่คุณถนัดที่สุด
            </p>
          )}
        </div>

        {/* Needs Review Tense */}
        <div className="p-5 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/80">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Tense ที่ควรทบทวนเพิ่มเติม:</span>
          </div>
          {needsReviewTense ? (
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {needsReviewTense.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                คะแนนเฉลี่ยปัจจุบัน <strong>{needsReviewTense.percentage}%</strong> (ตอบถูก {needsReviewTense.correct} จาก {needsReviewTense.attempts} ข้อ)
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => onSelectTenseLesson(needsReviewTense.tenseId)}
                  className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:underline"
                >
                  อ่านทบทวนเนื้อหา →
                </button>
                <button
                  onClick={() => onStartQuiz(needsReviewTense.tenseId)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ฝึกทำโจทย์ Tense นี้ใหม่ →
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              ระบบจะคอยแนะนำ Tense ที่ควรฝึกซ้ำเมื่อคุณเริ่มทำแบบทดสอบ
            </p>
          )}
        </div>
      </div>

      {/* Progress Chart: Recharts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
          ความก้าวหน้าการเรียนแยกตามกลุ่มกาล (Present / Past / Future)
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          จำนวนบทเรียนที่เรียนจบจากทั้งหมด 4 บทในแต่ละกลุ่มเวลา
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val) => [`${val} / 4 บท`, 'เรียนจบแล้ว']}
              />
              <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
                {groupStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gamification Badges Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              เหรียญรางวัลความสำเร็จ (Badges Showcase)
            </h3>
            <p className="text-xs text-slate-400">
              ปลดล็อกตามเงื่อนไขจริงจากการเรียนรู้และการทำคะแนน
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            {unlockedBadgeIds.length} / {allBadges.length} ปลดล็อกแล้ว
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isUnlocked
                    ? 'border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 opacity-50'
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-xl mb-2 ${
                    isUnlocked
                      ? 'bg-amber-400 text-amber-900 shadow-md shadow-amber-500/20'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                  {badge.titleTh}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {badge.conditionText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
