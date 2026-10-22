import React, { useState } from 'react';
import { TenseGroup, DifficultyLevel } from '../types/tense';
import { allTenses } from '../data/tenses';
import { UserProgressState } from '../types/user';
import {
  Search,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Filter,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface LessonsProps {
  progressState: UserProgressState;
  onSelectLesson: (tenseId: string) => void;
  onStartQuiz: (tenseId: string) => void;
}

export const Lessons: React.FC<LessonsProps> = ({
  progressState,
  onSelectLesson,
  onStartQuiz,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<TenseGroup | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedSet = new Set(progressState.completedLessons);

  const filteredTenses = allTenses.filter((tense) => {
    const matchesGroup =
      selectedGroup === 'all' || tense.group === selectedGroup;
    const matchesLevel =
      selectedLevel === 'all' || tense.level === selectedLevel;
    const matchesSearch =
      tense.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tense.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tense.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesLevel && matchesSearch;
  });

  const getGroupBadgeClass = (group: TenseGroup) => {
    switch (group) {
      case 'present':
        return 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'past':
        return 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'future':
        return 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            หลักสูตร 12 Tenses ฉบับเข้าใจลึกซึ้ง
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            เรียนรู้ความหมาย เหตุผลที่ต้องใช้ โครงสร้าง ตัวอย่าง และข้อผิดพลาดที่พบบ่อย
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-fit">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>
            เรียนจบแล้ว {progressState.completedLessons.length} / 12 บทเรียน
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อ Tense เช่น Present Simple, Past, สัจธรรม..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Group Filters */}
          <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              กลุ่มเวลา:
            </span>
            {(['all', 'present', 'past', 'future'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedGroup === group
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {group === 'all'
                  ? 'ทั้งหมด'
                  : group === 'present'
                  ? 'Present (ปัจจุบัน)'
                  : group === 'past'
                  ? 'Past (อดีต)'
                  : 'Future (อนาคต)'}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> ระดับความยาก:
          </span>
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(
            (lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {lvl === 'all'
                  ? 'ทุกระดับ'
                  : lvl === 'beginner'
                  ? 'Beginner (พื้นฐาน)'
                  : lvl === 'intermediate'
                  ? 'Intermediate (ปานกลาง)'
                  : 'Advanced (ระดับสูง)'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTenses.map((tense) => {
          const isDone = completedSet.has(tense.id);
          const badgeClass = getGroupBadgeClass(tense.group);

          return (
            <div
              key={tense.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                isDone
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${badgeClass}`}
                  >
                    {tense.group.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-slate-400">
                      {tense.level === 'beginner'
                        ? '🟢 พื้นฐาน'
                        : tense.level === 'intermediate'
                        ? '🟡 ปานกลาง'
                        : '🔴 ขั้นสูง'}
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> ผ่านแล้ว
                      </span>
                    )}
                  </div>
                </div>

                {/* Tense names */}
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  {tense.nameEn}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  {tense.nameTh}
                </p>

                {/* Tagline */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {tense.tagline}
                </p>

                {/* Quick Formula Card */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs mb-4">
                  <div className="text-[10px] font-bold text-slate-400 mb-0.5">
                    สูตรประโยคบอกเล่า:
                  </div>
                  <div className="font-mono font-semibold text-slate-700 dark:text-slate-200 truncate">
                    {tense.structure.affirmative}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectLesson(tense.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isDone
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isDone ? 'ทบทวนเนื้อหา' : 'เริ่มเรียนรู้'}</span>
                </button>

                <button
                  onClick={() => onStartQuiz(tense.id)}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
                  title="ทำแบบฝึกหัดของ Tense นี้"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>แบบฝึกหัด</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTenses.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200">
            ไม่พบบทเรียนที่ตรงกับเงื่อนไข
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            ลองล้างคำค้นหาหรือเลือกกลุ่มเวลาอื่น
          </p>
        </div>
      )}
    </div>
  );
};
