import React, { useState } from 'react';
import { allTenses } from '../data/tenses';
import { TenseGroup } from '../types/tense';
import { TimelineView } from '../components/common/TimelineView';
import {
  TableProperties,
  Clock,
  ExternalLink,
  Info,
  Lightbulb,
} from 'lucide-react';

interface TenseSummaryTableProps {
  onSelectTense: (tenseId: string) => void;
}

export const TenseSummaryTable: React.FC<TenseSummaryTableProps> = ({
  onSelectTense,
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'timeline'>('table');
  const [selectedGroup, setSelectedGroup] = useState<TenseGroup | 'all'>('all');

  const filteredTenses =
    selectedGroup === 'all'
      ? allTenses
      : allTenses.filter((t) => t.group === selectedGroup);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ตารางสรุป 12 Tenses & Timeline
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            เปรียบเทียบโครงสร้าง ตัวอย่าง และสถานการณ์การใช้งานครบทุกรูปแบบในหน้าเดียว
          </p>
        </div>

        {/* View mode toggle (Table vs Timeline) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'table'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <TableProperties className="w-4 h-4" />
            <span>มุมมองตารางเปรียบเทียบ</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>มุมมองไทม์ไลน์ภาพรวม</span>
          </button>
        </div>
      </div>

      {/* Future Tense Architectural Clarification Card */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">ข้อสังเกตสำคัญด้านไวยากรณ์ภาษาอังกฤษ: </strong>
          กรอบ <strong>"12 Tenses"</strong> เป็นกรอบแบบแผนการสอนไวยากรณ์ที่นิยมใช้ในหมู่นักเรียนสากลและไทย แต่ในเชิงภาษาศาสตร์ การกล่าวถึงอนาคตยังมีอีกหลากหลายวิธี เช่น การใช้ <em>be going to</em> (เมื่อวางแผนหรือมีหลักฐาน), <em>Present Continuous</em> (เมื่อนัดหมายชัดเจน), หรือ <em>Present Simple</em> (สำหรับตารางเวลาสาธารณะ) ไม่ได้จำกัดอยู่เพียง modal verb "will" เท่านั้น
        </div>
      </div>

      {activeTab === 'timeline' ? (
        <TimelineView onSelectTense={onSelectTense} />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          {/* Group Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 mr-2">
              กรองตามกลุ่มกาล:
            </span>
            {(['all', 'present', 'past', 'future'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedGroup === group
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {group === 'all'
                  ? 'ทั้งหมด (12 Tenses)'
                  : group === 'present'
                  ? 'Present (ปัจจุบัน 4)'
                  : group === 'past'
                  ? 'Past (อดีต 4)'
                  : 'Future (อนาคต 4)'}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-3.5 min-w-[160px]">ชื่อ Tense</th>
                  <th className="py-3 px-3.5 min-w-[150px]">แนวคิดหลัก</th>
                  <th className="py-3 px-3.5 min-w-[200px]">โครงสร้างประโยค</th>
                  <th className="py-3 px-3.5 min-w-[220px]">ตัวอย่างประโยค</th>
                  <th className="py-3 px-3.5 min-w-[180px]">คำแปลภาษาไทย</th>
                  <th className="py-3 px-3.5 min-w-[180px]">สถานการณ์ที่ใช้</th>
                  <th className="py-3 px-3.5 text-center">ดูบทเรียน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredTenses.map((tense) => {
                  const firstExample = tense.examples.affirmative[0];
                  return (
                    <tr
                      key={tense.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-3.5 px-3.5">
                        <button
                          onClick={() => onSelectTense(tense.id)}
                          className="text-left group"
                        >
                          <div className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors font-english">
                            {tense.nameEn}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {tense.nameTh}
                          </div>
                        </button>
                      </td>

                      {/* Core Concept */}
                      <td className="py-3.5 px-3.5 text-xs text-slate-600 dark:text-slate-300">
                        {tense.timelineLabel}
                      </td>

                      {/* Structure */}
                      <td className="py-3.5 px-3.5 font-mono text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/20 dark:bg-blue-950/20 rounded-lg">
                        {tense.structure.affirmative}
                      </td>

                      {/* Example Sentence */}
                      <td className="py-3.5 px-3.5 font-english font-medium text-slate-800 dark:text-slate-200">
                        {firstExample ? firstExample.english : '-'}
                      </td>

                      {/* Translation */}
                      <td className="py-3.5 px-3.5 text-xs text-slate-600 dark:text-slate-300">
                        {firstExample ? firstExample.translationThai : '-'}
                      </td>

                      {/* Situation */}
                      <td className="py-3.5 px-3.5 text-xs text-slate-500 dark:text-slate-400">
                        {tense.whenToUse.points[0]?.title || '-'}
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-3.5 text-center">
                        <button
                          onClick={() => onSelectTense(tense.id)}
                          className="p-1.5 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                          title="เปิดบทเรียนฉบับเต็ม"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
