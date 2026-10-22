import React, { useState } from 'react';
import { tenseComparisons } from '../data/comparisons';
import { allTenses, getTenseById } from '../data/tenses';
import {
  GitCompare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Lightbulb,
  Check,
  X,
  Volume2,
  Layers,
} from 'lucide-react';
import { TenseId } from '../types/tense';

interface TenseComparisonProps {
  onSelectTenseLesson: (tenseId: string) => void;
  onRecordComparisonQuizDone?: () => void;
}

export const TenseComparison: React.FC<TenseComparisonProps> = ({
  onSelectTenseLesson,
  onRecordComparisonQuizDone,
}) => {
  const [selectedPairId, setSelectedPairId] = useState<string>(
    tenseComparisons[0].id
  );

  // Custom picker state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTenseA, setCustomTenseA] = useState<TenseId>('past-simple');
  const [customTenseB, setCustomTenseB] = useState<TenseId>('present-perfect');

  // Practice question state for current pair
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeComparison =
    tenseComparisons.find((c) => c.id === selectedPairId) || tenseComparisons[0];

  const tenseA = getTenseById(
    isCustomMode ? customTenseA : activeComparison.tenseAId
  );
  const tenseB = getTenseById(
    isCustomMode ? customTenseB : activeComparison.tenseBId
  );

  const handleSelectPair = (id: string) => {
    setSelectedPairId(id);
    setIsCustomMode(false);
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            เครื่องมือเปรียบเทียบ Tense (Tense Comparison)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            เจาะลึกความแตกต่างระหว่าง Tense ที่คนไทยมักใช้สับสน พร้อมตัวอย่างสถานการณ์จริง
          </p>
        </div>

        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border self-start sm:self-auto ${
            isCustomMode
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isCustomMode ? 'กลับสู่คู่มาตรฐาน' : 'เลือกจับคู่เปรียบเทียบเอง'}</span>
        </button>
      </div>

      {/* Preset Pair Selector Tabs */}
      {!isCustomMode ? (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tenseComparisons.map((pair) => (
            <button
              key={pair.id}
              onClick={() => handleSelectPair(pair.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedPairId === pair.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {pair.title}
            </button>
          ))}
        </div>
      ) : (
        /* Custom Dual Picker */
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              เลือก Tense แบบที่ 1:
            </label>
            <select
              value={customTenseA}
              onChange={(e) => setCustomTenseA(e.target.value as TenseId)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
            >
              {allTenses.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameEn} ({t.nameTh})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              เลือก Tense แบบที่ 2:
            </label>
            <select
              value={customTenseB}
              onChange={(e) => setCustomTenseB(e.target.value as TenseId)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
            >
              {allTenses.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameEn} ({t.nameTh})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Comparison Section */}
      <div className="space-y-6">
        {/* Core Summary Difference */}
        {!isCustomMode && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-sky-500/10 border border-blue-200 dark:border-blue-900/60">
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-1">
              สรุปแก่นความแตกต่าง
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {activeComparison.summaryDifference}
            </p>
          </div>
        )}

        {/* Side by side Tense cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card A */}
          {tenseA && (
            <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                  แบบที่ 1
                </span>
                <button
                  onClick={() => onSelectTenseLesson(tenseA.id)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ดูบทเรียนเต็ม →
                </button>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-english">
                  {tenseA.nameEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tenseA.nameTh}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs font-semibold text-blue-700 dark:text-blue-300">
                {tenseA.structure.affirmative}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>จุดสำคัญ: </strong>
                {tenseA.tagline}
              </div>
            </div>
          )}

          {/* Card B */}
          {tenseB && (
            <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                  แบบที่ 2
                </span>
                <button
                  onClick={() => onSelectTenseLesson(tenseB.id)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  ดูบทเรียนเต็ม →
                </button>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-english">
                  {tenseB.nameEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tenseB.nameTh}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                {tenseB.structure.affirmative}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>จุดสำคัญ: </strong>
                {tenseB.tagline}
              </div>
            </div>
          )}
        </div>

        {/* Real Scenario Comparison Pairs */}
        {!isCustomMode && activeComparison.pairScenarios.map((scen, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>{scen.context}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tense A Example */}
              <div className="p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                    {tenseA?.nameEn}
                  </span>
                  <button
                    onClick={() => playAudio(scen.tenseAExample.sentence)}
                    className="text-blue-500 hover:text-blue-700"
                    title="ฟังเสียง"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-english text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  "{scen.tenseAExample.sentence}"
                </div>
                <div className="text-xs text-slate-400">
                  {scen.tenseAExample.phonetic}
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {scen.tenseAExample.meaning}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-blue-200/60 dark:border-blue-900/40">
                  🔎 {scen.tenseAExample.nuance}
                </div>
              </div>

              {/* Tense B Example */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                    {tenseB?.nameEn}
                  </span>
                  <button
                    onClick={() => playAudio(scen.tenseBExample.sentence)}
                    className="text-indigo-500 hover:text-indigo-700"
                    title="ฟังเสียง"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-english text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  "{scen.tenseBExample.sentence}"
                </div>
                <div className="text-xs text-slate-400">
                  {scen.tenseBExample.phonetic}
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {scen.tenseBExample.meaning}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-indigo-200/60 dark:border-indigo-900/40">
                  🔎 {scen.tenseBExample.nuance}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong className="font-bold">ทำไมจุดนี้จึงสำคัญ: </strong>
              {scen.whyTheDifferenceMatters}
            </div>
          </div>
        ))}

        {/* Comparison Aspect Table */}
        {!isCustomMode && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-x-auto">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              ตารางเปรียบเทียบจุดต่อจุด (Side-by-side Points)
            </h3>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase font-bold">
                  <th className="py-2.5 px-3">ประเด็นเปรียบเทียบ</th>
                  <th className="py-2.5 px-3">{tenseA?.nameEn}</th>
                  <th className="py-2.5 px-3">{tenseB?.nameEn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {activeComparison.quickComparisonPoints.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {row.aspect}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {row.tenseA}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {row.tenseB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Embedded Practice Question for this pair */}
        {!isCustomMode && activeComparison.practiceQuestion && (
          <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-slate-800 dark:to-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>ทดสอบความเข้าใจคู่นี้ทันที</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeComparison.practiceQuestion.scenario}
            </p>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              {activeComparison.practiceQuestion.question}
            </h4>

            <div className="space-y-2.5">
              {activeComparison.practiceQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle =
                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400';

                if (isSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                  } else {
                    btnStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  btnStyle =
                    'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 font-semibold';
                }

                return (
                  <div key={opt.id} className="space-y-1">
                    <button
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm font-english flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isSubmitted && opt.isCorrect && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                    {isSubmitted && (isSelected || opt.isCorrect) && (
                      <p className="text-[11px] px-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {opt.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!isSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={() => {
                  setIsSubmitted(true);
                  if (onRecordComparisonQuizDone) onRecordComparisonQuizDone();
                }}
                className="mt-2 py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all"
              >
                ตรวจคำตอบข้อนี้
              </button>
            ) : (
              <div className="pt-2">
                <span className="text-xs font-bold text-emerald-600">
                  ✨ บันทึกสถิติความเข้าใจเรียบร้อยแล้ว
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
