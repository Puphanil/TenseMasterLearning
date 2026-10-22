import React, { useState } from 'react';
import { TenseLesson, TenseId } from '../types/tense';
import { allTenses, getTenseById } from '../data/tenses';
import { UserProgressState } from '../types/user';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  Sparkles,
  HelpCircle,
  Clock,
  Compass,
} from 'lucide-react';

interface TenseDetailProps {
  tenseId: TenseId;
  progressState: UserProgressState;
  onBack: () => void;
  onSelectTense: (tenseId: string) => void;
  onStartQuiz: (tenseId: string) => void;
  onMarkComplete: (tenseId: TenseId) => void;
  onToggleVocab: (vocabId: string) => void;
  onAskAIAboutTense: (tenseName: string) => void;
}

export const TenseDetail: React.FC<TenseDetailProps> = ({
  tenseId,
  progressState,
  onBack,
  onSelectTense,
  onStartQuiz,
  onMarkComplete,
  onToggleVocab,
  onAskAIAboutTense,
}) => {
  const lesson = getTenseById(tenseId) || allTenses[0];
  const [exampleTab, setExampleTab] = useState<'affirmative' | 'negative' | 'question'>('affirmative');

  const isCompleted = progressState.completedLessons.includes(lesson.id);

  // Audio pronunciation helper using browser SpeechSynthesis
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Find next and previous lesson in order
  const currentIndex = allTenses.findIndex((t) => t.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allTenses[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allTenses.length - 1 ? allTenses[currentIndex + 1] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังหน้ารวมบทเรียน</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAIAboutTense(lesson.nameEn)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>ถาม AI เกี่ยวกับ Tense นี้</span>
          </button>

          <button
            onClick={() => onMarkComplete(lesson.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'เรียนจบแล้ว (คลิกเพื่อบันทึกซ้ำ)' : 'ทำเครื่องหมายว่าเรียนจบ'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {lesson.group.toUpperCase()} TENSE
          </span>
          <span className="text-xs font-medium text-slate-400">
            ระดับ: {lesson.level === 'beginner' ? 'พื้นฐาน (Beginner)' : lesson.level === 'intermediate' ? 'ปานกลาง (Intermediate)' : 'ขั้นสูง (Advanced)'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lesson.nameEn}
        </h1>
        <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
          {lesson.nameTh}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          {lesson.tagline}
        </p>

        {/* Timeline Visual Badge */}
        <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
              มิติบนเส้นเวลา: {lesson.timelineLabel}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {lesson.timelinePosition.descriptionTh}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION A: Tense นี้คืออะไร? */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
            A
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Tense นี้คืออะไร? (ความหมายและแนวคิดหลัก)
          </h2>
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-3">
          <p>{lesson.whatIsIt.overview}</p>
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
            <div className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>ภาพในหัว (Core Mental Model):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              {lesson.whatIsIt.coreConcept}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>เปรียบเทียบกับชีวิตจริง:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              {lesson.whatIsIt.realLifeAnalogy}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION B: ใช้เวลาไหน? */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
            B
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ใช้เวลาไหน? (สถานการณ์ที่หยิบมาใช้)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{lesson.whenToUse.timeframe}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {lesson.whenToUse.points.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
                {pt.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2.5 leading-relaxed">
                {pt.description}
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs font-mono text-blue-700 dark:text-blue-300">
                {pt.exampleMini}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: ทำไมถึงต้องใช้ Tense นี้? */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
            C
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            ทำไมถึงต้องใช้ Tense นี้? (เปรียบเทียบความหมาย ไม่ใช่แค่จำสูตร)
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {lesson.whyUseIt.primaryReason}
        </p>

        {/* Side by side comparison card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/60 dark:to-blue-950/20 border border-blue-200 dark:border-blue-900">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-3">
            เปรียบเทียบความรู้สึกระหว่างสองประโยค:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-300 dark:border-blue-700 shadow-xs">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                {lesson.nameEn}
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2 font-english">
                "{lesson.whyUseIt.comparisonWithSimilar.thisTenseSentence}"
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {lesson.whyUseIt.comparisonWithSimilar.otherTenseName}
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2 font-english">
                "{lesson.whyUseIt.comparisonWithSimilar.otherTenseSentence}"
              </p>
            </div>
          </div>

          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-blue-600 dark:text-blue-400">💡 ความต่างสำคัญ: </span>
            {lesson.whyUseIt.comparisonWithSimilar.meaningDifference}
          </div>
        </div>
      </section>

      {/* SECTION D: โครงสร้างประโยค */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
            D
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            โครงสร้างประโยค (Sentence Formulas)
          </h2>
        </div>

        <div className="space-y-3 font-mono">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="text-[11px] font-sans font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              ✅ บอกเล่า (Affirmative):
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {lesson.structure.affirmative}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <div className="text-[11px] font-sans font-bold text-rose-800 dark:text-rose-300 mb-1">
              ❌ ปฏิเสธ (Negative):
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {lesson.structure.negative}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="text-[11px] font-sans font-bold text-blue-800 dark:text-blue-300 mb-1">
              ❓ คำถาม (Question):
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {lesson.structure.question}
            </div>
          </div>
        </div>

        {/* Detailed Grammatical Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              📌 กฎการผันประธาน (Subject):
            </span>
            {lesson.structure.subjectRules}
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              ⚙️ กริยาช่วย (Auxiliary Verb):
            </span>
            {lesson.structure.auxiliaryExplanation}
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              ✏️ กฎการผันกริยา (Verb Rules):
            </span>
            {lesson.structure.verbRules}
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              ⚠️ ข้อยกเว้นและ Verb to be:
            </span>
            {lesson.structure.exceptions}
          </div>
        </div>
      </section>

      {/* SECTION E: ตัวอย่าง 3 รูปแบบ (บอกเล่า, ปฏิเสธ, คำถาม) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
              E
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ตัวอย่างประโยคจริง 3 รูปแบบ
            </h2>
          </div>

          {/* Type Toggle Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setExampleTab('affirmative')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exampleTab === 'affirmative'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              บอกเล่า ({lesson.examples.affirmative.length})
            </button>
            <button
              onClick={() => setExampleTab('negative')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exampleTab === 'negative'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ปฏิเสธ ({lesson.examples.negative.length})
            </button>
            <button
              onClick={() => setExampleTab('question')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exampleTab === 'question'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              คำถาม ({lesson.examples.question.length})
            </button>
          </div>
        </div>

        {/* Examples List */}
        <div className="space-y-4">
          {lesson.examples[exampleTab].map((ex) => (
            <div
              key={ex.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2.5"
            >
              {/* English sentence with sound player */}
              <div className="flex items-start justify-between gap-3">
                <div className="font-english text-lg font-extrabold text-slate-900 dark:text-white">
                  {ex.english}
                </div>
                <button
                  onClick={() => playAudio(ex.english)}
                  className="p-2 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors shadow-2xs"
                  title="กดฟังเสียงอ่านภาษาอังกฤษ"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Phonetics & Translation */}
              <div className="space-y-1 text-sm">
                <div className="text-slate-500 dark:text-slate-400 text-xs">
                  <span className="font-semibold text-slate-400 mr-1.5">คำอ่านไทย:</span>
                  <span className="font-medium text-slate-600 dark:text-slate-300">
                    {ex.phoneticThai}
                  </span>
                </div>
                <div className="text-slate-800 dark:text-slate-200 font-semibold">
                  <span className="font-bold text-blue-600 dark:text-blue-400 mr-1.5">
                    คำแปล:
                  </span>
                  {ex.translationThai}
                </div>
              </div>

              {/* Pedagogical Reasoning */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">
                  🎯 เหตุผลที่ใช้ Tense นี้:
                </span>
                <span>{ex.reasoning}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION F: คำศัพท์สำคัญ */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
              F
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                คำศัพท์สำคัญในบทเรียนนี้
              </h2>
              <p className="text-xs text-slate-400">
                กดไอคอนบุ๊กมาร์กเพื่อบันทึกลงในคลังคำศัพท์ที่ต้องทบทวน
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">คำศัพท์ (Word)</th>
                <th className="py-2.5 px-3">คำอ่านไทย</th>
                <th className="py-2.5 px-3">คำแปล</th>
                <th className="py-2.5 px-3">ประเภท</th>
                <th className="py-2.5 px-3">ตัวอย่างประโยค</th>
                <th className="py-2.5 px-3 text-center">บันทึก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {lesson.vocabulary.map((vocab) => {
                const isSaved = progressState.savedVocabularyIds.includes(vocab.id);
                return (
                  <tr
                    key={vocab.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-3 font-english font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{vocab.word}</span>
                      <button
                        onClick={() => playAudio(vocab.word)}
                        className="text-slate-400 hover:text-blue-500"
                        title="ฟังเสียง"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {vocab.phoneticThai}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {vocab.translation}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                        {vocab.partOfSpeech}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs font-english text-xs">
                      {vocab.exampleSentence}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onToggleVocab(vocab.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isSaved ? 'บันทึกแล้ว (คลิกเพื่อยกเลิก)' : 'บันทึกคำศัพท์นี้'}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION G: Signal Words */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
            G
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Signal Words (คำบอกเวลาที่พบบ่อย)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {lesson.signalWords.map((sig, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-center"
            >
              <div className="font-bold text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-english">
                {sig.word}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {sig.phoneticThai}
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">
                {sig.translation}
              </div>
            </div>
          ))}
        </div>

        {/* Golden Caution Note */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong className="font-bold">หลักการสำคัญ: </strong>
            {lesson.signalWordCaution}
          </span>
        </div>
      </section>

      {/* SECTION H: ข้อผิดพลาดที่พบบ่อย (Common Mistakes) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center text-sm">
            H
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            ข้อผิดพลาดที่คนไทยมักสับสนบ่อยๆ
          </h2>
        </div>

        <div className="space-y-3.5">
          {lesson.commonMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 space-y-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 font-medium flex items-center gap-2 font-english">
                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="line-through">{mistake.incorrect}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2 font-english">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{mistake.correct}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  คำอธิบาย:
                </span>{' '}
                {mistake.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION I: สรุปบทเรียน & ปุ่มแอคชัน */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-800 dark:to-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-blue-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
            I
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              สรุปใจความสำคัญ (Key Takeaway)
            </h2>
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              สรุปแบบจำง่ายใช้ได้จริงในชีวิตประจำวัน
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          <p className="font-bold text-slate-900 dark:text-white">
            {lesson.summary.keyTakeaway}
          </p>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900 font-mono text-xs font-semibold text-blue-700 dark:text-blue-300">
            สูตรลัด: {lesson.summary.quickFormula}
          </div>

          <div className="text-xs space-y-1">
            <div>
              <strong className="text-slate-800 dark:text-slate-200">จุดที่มักสะดุดล้ม: </strong>
              <span className="text-rose-600 dark:text-rose-400">{lesson.summary.dangerTrap}</span>
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200">ทิปการใช้จริง: </strong>
              <span>{lesson.summary.realLifeTip || lesson.summary.realLifeExample}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Quiz, Mark Complete, Next Lesson */}
        <div className="pt-4 border-t border-blue-200/80 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onStartQuiz(lesson.id)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>เริ่มทำแบบฝึกหัด Tense นี้</span>
            </button>

            <button
              onClick={() => onMarkComplete(lesson.id)}
              className="px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{isCompleted ? 'บันทึกจบแล้ว (+50 XP)' : 'บันทึกว่าเรียนจบ (+50 XP)'}</span>
            </button>
          </div>

          {nextLesson && (
            <button
              onClick={() => onSelectTense(nextLesson.id)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>บทถัดไป: {nextLesson.nameEn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
