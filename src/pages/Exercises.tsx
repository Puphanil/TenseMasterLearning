import React, { useState, useEffect } from 'react';
import { ExerciseQuestion, QuizSessionSummary } from '../types/exercise';
import { exerciseQuestions } from '../data/exercises';
import { allTenses } from '../data/tenses';
import { UserProgressState } from '../types/user';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Filter,
  Lightbulb,
  Check,
  X,
  Volume2,
} from 'lucide-react';

interface ExercisesProps {
  progressState: UserProgressState;
  initialTenseFilter?: string;
  onRecordQuizSummary: (summary: QuizSessionSummary) => void;
  onSelectTenseLesson: (tenseId: string) => void;
}

export const Exercises: React.FC<ExercisesProps> = ({
  progressState,
  initialTenseFilter,
  onRecordQuizSummary,
  onSelectTenseLesson,
}) => {
  const [selectedTense, setSelectedTense] = useState<string>(
    initialTenseFilter || 'all'
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState<string>('');
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<ExerciseQuestion[]>([]);

  // Filter questions based on selected tense
  useEffect(() => {
    let pool = exerciseQuestions;
    if (selectedTense !== 'all') {
      pool = exerciseQuestions.filter((q) => q.tenseId === selectedTense);
    }
    // Shuffle and pick up to 10
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setSessionScore(0);
    setIsFinished(false);
    resetQuestionState();
  }, [selectedTense]);

  const currentQ = currentQuestions[currentIndex];

  const resetQuestionState = () => {
    setSelectedAnswer('');
    setFillAnswer('');
    setOrderedWords([]);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
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

  // Sentence ordering click helpers
  const handleToggleWord = (word: string, isFromBank: boolean) => {
    if (isAnswerSubmitted) return;
    if (isFromBank) {
      setOrderedWords((prev) => [...prev, word]);
    } else {
      setOrderedWords((prev) => {
        const idx = prev.lastIndexOf(word);
        if (idx > -1) {
          const clone = [...prev];
          clone.splice(idx, 1);
          return clone;
        }
        return prev;
      });
    }
  };

  const handleSubmitAnswer = () => {
    if (!currentQ || isAnswerSubmitted) return;

    let userAns = '';
    let correct = false;

    if (currentQ.type === 'fill-in-the-blank') {
      userAns = fillAnswer.trim().toLowerCase();
      const acceptable = [
        currentQ.correctAnswer.toLowerCase(),
        ...(currentQ.acceptableAnswers?.map((a) => a.toLowerCase()) || []),
      ];
      correct = acceptable.includes(userAns);
    } else if (currentQ.type === 'sentence-order') {
      userAns = orderedWords.join(' ').trim().toLowerCase();
      const expected = currentQ.correctAnswer.toLowerCase();
      correct =
        userAns === expected ||
        currentQ.acceptableAnswers?.some(
          (a) => a.toLowerCase().trim() === userAns
        ) ||
        false;
    } else {
      // multiple-choice, situation-choice, compare-choice, error-detection
      userAns = selectedAnswer;
      correct = userAns.trim() === currentQ.correctAnswer.trim();
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    if (correct) {
      setSessionScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      // Quiz complete!
      const total = currentQuestions.length;
      const finalScore = sessionScore + (isCorrect ? 0 : 0); // already updated
      const percentage = total > 0 ? Math.round((sessionScore / total) * 100) : 0;
      const xpEarned = sessionScore * 10 + (percentage === 100 ? 50 : 20);

      const summary: QuizSessionSummary = {
        tenseId: (selectedTense as any) || 'all',
        date: new Date().toISOString(),
        totalQuestions: total,
        correctAnswers: sessionScore,
        scorePercentage: percentage,
        xpEarned,
        attempts: [],
      };

      onRecordQuizSummary(summary);
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    let pool = exerciseQuestions;
    if (selectedTense !== 'all') {
      pool = exerciseQuestions.filter((q) => q.tenseId === selectedTense);
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setSessionScore(0);
    setIsFinished(false);
    resetQuestionState();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            แบบฝึกหัดวัดความเข้าใจ (Exercise Engine)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            ตรวจคำตอบทันที พร้อมคำอธิบายเหตุผลภาษาไทยอย่างละเอียดทุกข้อ
          </p>
        </div>

        {/* Tense Filter Selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedTense}
            onChange={(e) => setSelectedTense(e.target.value)}
            disabled={isAnswerSubmitted && !isFinished}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">รวมทุก Tenses (คละหัวข้อ)</option>
            {allTenses.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nameEn} ({t.nameTh})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QUIZ FINISHED CARD */}
      {isFinished ? (
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-6 sm:p-10 text-center shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 mx-auto flex items-center justify-center shadow-md">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
              ผลการทดสอบ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              ทำแบบฝึกหัดเสร็จสมบูรณ์!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              ฝึกฝนอย่างสม่ำเสมอจะช่วยให้คุณใช้ Tense ได้อย่างเป็นธรรมชาติ
            </p>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {sessionScore}/{currentQuestions.length}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">คะแนนที่ได้</div>
            </div>

            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {Math.round((sessionScore / currentQuestions.length) * 100)}%
              </div>
              <div className="text-[11px] text-blue-500 font-medium">ความแม่นยำ</div>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                +{sessionScore * 10 + (sessionScore === currentQuestions.length ? 50 : 20)}
              </div>
              <div className="text-[11px] text-amber-600 font-medium">XP ที่ได้รับ</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบฝึกหัดใหม่อีกครั้ง</span>
            </button>

            {selectedTense !== 'all' && (
              <button
                onClick={() => onSelectTenseLesson(selectedTense)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                กลับไปทบทวนบทเรียน
              </button>
            )}
          </div>
        </div>
      ) : currentQ ? (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress row */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
              ข้อที่ {currentIndex + 1} จาก {currentQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">
                คะแนนปัจจุบัน: {sessionScore}
              </span>
              <span className="text-slate-400">|</span>
              <span className="uppercase text-blue-600 dark:text-blue-400 font-bold">
                {currentQ.tenseId.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Situation Context if present */}
          {currentQ.situationContext && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">สถานการณ์: </strong>
                {currentQ.situationContext}
              </div>
            </div>
          )}

          {/* Question Prompt */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              คำถาม:
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-english leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* 1. Multiple Choice / Situation / Compare / Error Detection Options */}
          {currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                let optionStyle =
                  'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-850';

                if (isAnswerSubmitted) {
                  if (option.trim() === currentQ.correctAnswer.trim()) {
                    optionStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                  } else {
                    optionStyle =
                      'border-slate-200 dark:border-slate-800 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle =
                    'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base font-english ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted &&
                      option.trim() === currentQ.correctAnswer.trim() && (
                        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    {isAnswerSubmitted &&
                      isSelected &&
                      !isCorrect && (
                        <X className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Fill in the Blank Input */}
          {currentQ.type === 'fill-in-the-blank' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                พิมพ์คำตอบที่ถูกต้องลงในช่องว่าง:
              </label>
              <input
                type="text"
                disabled={isAnswerSubmitted}
                value={fillAnswer}
                onChange={(e) => setFillAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isAnswerSubmitted && fillAnswer.trim()) {
                    handleSubmitAnswer();
                  }
                }}
                placeholder="พิมพ์คำตอบภาษาอังกฤษ..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-english text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* 3. Sentence Order Builder */}
          {currentQ.type === 'sentence-order' && currentQ.wordsToOrder && (
            <div className="space-y-4">
              {/* Target built sentence box */}
              <div className="min-h-[60px] p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex flex-wrap gap-2 items-center">
                {orderedWords.length === 0 ? (
                  <span className="text-xs text-slate-400">
                    คลิกคำศัพท์ด้านล่างเพื่อเรียงเป็นประโยคที่ถูกต้อง...
                  </span>
                ) : (
                  orderedWords.map((w, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleToggleWord(w, false)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-english text-sm font-semibold shadow-xs hover:bg-rose-600 transition-colors"
                      title="คลิกเพื่อนำคำนี้ออก"
                    >
                      {w}
                    </button>
                  ))
                )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap gap-2">
                {currentQ.wordsToOrder.map((w, idx) => {
                  const usedCountInOrdered = orderedWords.filter((x) => x === w).length;
                  const totalCountInSource = currentQ.wordsToOrder?.filter((x) => x === w).length || 0;
                  const isExhausted = usedCountInOrdered >= totalCountInSource;

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted || isExhausted}
                      onClick={() => handleToggleWord(w, true)}
                      className={`px-3 py-1.5 rounded-xl border text-sm font-english transition-all ${
                        isExhausted
                          ? 'opacity-30 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-500 shadow-xs active:scale-95'
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTION BUTTON (Check / Next) */}
          <div className="pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={
                  (currentQ.options && !selectedAnswer) ||
                  (currentQ.type === 'fill-in-the-blank' && !fillAnswer.trim()) ||
                  (currentQ.type === 'sentence-order' && orderedWords.length === 0)
                }
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>ตรวจคำตอบ</span>
              </button>
            ) : (
              /* DETAILED EXPLANATION PANEL */
              <div className="space-y-4 animate-in fade-in duration-200">
                <div
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                      : 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-base sm:text-lg mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        <span>ถูกต้องยอดเยี่ยม! (+1 คะแนน)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-rose-600" />
                        <span>ยังไม่ถูกต้องนะ มาดูเฉลยกัน!</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-slate-500 dark:text-slate-400 font-normal mr-1">
                      คำตอบที่ถูกต้องคือ:
                    </span>
                    <strong className="font-english font-bold text-slate-900 dark:text-white">
                      "{currentQ.correctAnswer}"
                    </strong>
                  </div>

                  {/* Thai Explanation */}
                  <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm leading-relaxed mb-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                      💡 คำอธิบายเหตุผล:
                    </div>
                    {currentQ.explanationThai}
                  </div>

                  {/* Why wrong options are not appropriate */}
                  {currentQ.wrongOptionExplanations && (
                    <div className="text-xs space-y-1 mb-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="font-bold text-slate-700 dark:text-slate-300">
                        ทำไมตัวเลือกอื่นจึงไม่เหมาะสม:
                      </div>
                      {Object.entries(currentQ.wrongOptionExplanations).map(
                        ([opt, reason]) => (
                          <div key={opt} className="text-slate-600 dark:text-slate-400">
                            • <strong className="font-english">{opt}:</strong> {reason}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Thai Translation */}
                  <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-200 mr-1.5">
                        คำแปลประโยค:
                      </span>
                      {currentQ.translationThai}
                    </div>
                    <button
                      onClick={() => playAudio(currentQ.correctAnswer)}
                      className="p-1 rounded text-slate-400 hover:text-blue-500"
                      title="ฟังเสียงคำตอบ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>
                    {currentIndex + 1 < currentQuestions.length
                      ? 'ทำข้อถัดไป'
                      : 'ดูสรุปผลคะแนน'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200">
            ไม่มีข้อสอบสำหรับ Tense นี้ในขณะนี้
          </h4>
        </div>
      )}
    </div>
  );
};
