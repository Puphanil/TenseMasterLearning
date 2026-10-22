import React, { useState } from 'react';
import { TenseLesson, TenseGroup } from '../../types/tense';
import { allTenses } from '../../data/tenses';
import { ArrowRight, Clock, Info } from 'lucide-react';

interface TimelineViewProps {
  onSelectTense: (tenseId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectTense }) => {
  const [selectedGroup, setSelectedGroup] = useState<TenseGroup | 'all'>('all');
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const filteredTenses =
    selectedGroup === 'all'
      ? allTenses
      : allTenses.filter((t) => t.group === selectedGroup);

  const getTenseColor = (group: TenseGroup) => {
    switch (group) {
      case 'present':
        return {
          pill: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700',
          dot: 'bg-blue-500',
          badge: 'text-blue-600 dark:text-blue-400',
        };
      case 'past':
        return {
          pill: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700',
          dot: 'bg-amber-500',
          badge: 'text-amber-600 dark:text-amber-400',
        };
      case 'future':
        return {
          pill: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
          dot: 'bg-emerald-500',
          badge: 'text-emerald-600 dark:text-emerald-400',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              ไทม์ไลน์ภาพรวมมิติเวลา (12 Tenses Timeline)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            เข้าใจความสัมพันธ์ของเวลาผ่านแกนเวลาเสมือนจริง คลิกเพื่อเข้าดูบทเรียน
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGroup === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ทั้งหมด (12)
          </button>
          <button
            onClick={() => setSelectedGroup('present')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGroup === 'present'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
            }`}
          >
            ปัจจุบัน (4)
          </button>
          <button
            onClick={() => setSelectedGroup('past')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGroup === 'past'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
            }`}
          >
            อดีต (4)
          </button>
          <button
            onClick={() => setSelectedGroup('future')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGroup === 'future'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
            }`}
          >
            อนาคต (4)
          </button>
        </div>
      </div>

      {/* Axis graphic */}
      <div className="relative my-8 px-2 sm:px-6">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500 rounded-full relative">
          {/* Past marker */}
          <div className="absolute left-0 -top-3 transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900 shadow"></span>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mt-2">
              PAST (อดีต)
            </span>
          </div>
          {/* Present marker */}
          <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 shadow ring-2 ring-blue-300 dark:ring-blue-800"></span>
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 mt-2">
              NOW (ปัจจุบันนี้)
            </span>
          </div>
          {/* Future marker */}
          <div className="absolute right-0 -top-3 transform translate-x-1/2 flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow"></span>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-2">
              FUTURE (อนาคต)
            </span>
          </div>
        </div>
      </div>

      {/* Tense cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-8">
        {filteredTenses.map((tense) => {
          const colors = getTenseColor(tense.group);
          const isHovered = activeHoverId === tense.id;

          return (
            <div
              key={tense.id}
              onClick={() => onSelectTense(tense.id)}
              onMouseEnter={() => setActiveHoverId(tense.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isHovered
                  ? 'border-blue-500 dark:border-blue-500 shadow-md transform -translate-y-0.5 bg-slate-50 dark:bg-slate-800/80'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${colors.pill}`}
                >
                  {tense.group.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  {tense.level === 'beginner'
                    ? 'พื้นฐาน'
                    : tense.level === 'intermediate'
                    ? 'ปานกลาง'
                    : 'ระดับสูง'}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tense.nameEn}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {tense.nameTh}
              </p>

              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 mb-3 flex items-start gap-1.5 font-english">
                <span className="font-semibold text-slate-400">สูตร:</span>
                <span className="font-mono text-slate-700 dark:text-slate-200 line-clamp-1">
                  {tense.structure.affirmative}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <span className="flex items-center gap-1 text-[11px]">
                  <Info className="w-3 h-3 text-slate-400" />
                  {tense.timelineLabel}
                </span>
                <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  เรียนรู้ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
