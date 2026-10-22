import React, { useState } from 'react';
import { masterVocabularyList } from '../data/vocabulary';
import { UserProgressState } from '../types/user';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Volume2,
  BrainCircuit,
  RotateCw,
  CheckCircle,
  AlertCircle,
  Filter,
  Sparkles,
  BookMarked,
} from 'lucide-react';

interface VocabularyProps {
  progressState: UserProgressState;
  onToggleSaveVocab: (vocabId: string) => void;
  onToggleMemorizedVocab: (vocabId: string, isMemorized: boolean) => void;
}

export const Vocabulary: React.FC<VocabularyProps> = ({
  progressState,
  onToggleSaveVocab,
  onToggleMemorizedVocab,
}) => {
  const [activeMode, setActiveMode] = useState<'dictionary' | 'flashcards'>('dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'saved' | 'memorized' | 'need-review'>('all');

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { savedVocabularyIds, memorizedVocabularyIds } = progressState;

  // Filter vocabulary pool
  const filteredList = masterVocabularyList.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneticThai.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'saved') {
      return savedVocabularyIds.includes(item.id);
    }
    if (filterType === 'memorized') {
      return memorizedVocabularyIds.includes(item.id);
    }
    if (filterType === 'need-review') {
      return !memorizedVocabularyIds.includes(item.id);
    }
    return true;
  });

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Flashcards navigation
  const currentCard = filteredList[cardIndex] || filteredList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (cardIndex + 1 < filteredList.length) {
      setCardIndex((prev) => prev + 1);
    } else {
      setCardIndex(0);
    }
  };

  const handleMarkMemorized = (isMem: boolean) => {
    if (currentCard) {
      onToggleMemorizedVocab(currentCard.id, isMem);
      handleNextCard();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            คลังคำศัพท์ & Flashcards
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            ทบทวนคำศัพท์สำคัญ คำอ่านไทย คำแปล และฝึกความจำด้วยการ์ดคำศัพท์
          </p>
        </div>

        {/* Mode Toggle (Dictionary vs Flashcards) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('dictionary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'dictionary'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>พจนานุกรมคำศัพท์</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('flashcards');
              setIsFlipped(false);
              setCardIndex(0);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'flashcards'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>โหมด Flashcards</span>
          </button>
        </div>
      </div>

      {/* FLASHCARDS MODE */}
      {activeMode === 'flashcards' ? (
        <div className="space-y-6">
          {filteredList.length === 0 ? (
            <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <BrainCircuit className="w-12 h-12 text-slate-400 mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-slate-700 dark:text-slate-200">
                ไม่มีคำศัพท์ในตัวกรองนี้
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                ลองเปลี่ยนตัวกรองเป็น "คำศัพท์ทั้งหมด"
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-4">
              {/* Card Progress */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>
                  การ์ดที่ {cardIndex + 1} จาก {filteredList.length}
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  จำได้แล้ว {memorizedVocabularyIds.length} คำ
                </span>
              </div>

              {/* The Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer perspective-1000 min-h-[300px] select-none"
              >
                <div
                  className={`w-full h-full min-h-[300px] rounded-3xl border-2 transition-all duration-300 p-8 flex flex-col items-center justify-between text-center shadow-lg relative ${
                    isFlipped
                      ? 'border-indigo-300 dark:border-indigo-700 bg-gradient-to-b from-indigo-50/70 to-white dark:from-slate-800 dark:to-slate-900'
                      : 'border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  {/* Top indicators */}
                  <div className="w-full flex items-center justify-between text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-[10px]">
                      {currentCard?.partOfSpeech}
                    </span>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      คลิกเพื่อพลิกดูเฉลย
                    </span>
                  </div>

                  {/* Card Content (Front vs Back) */}
                  {!isFlipped ? (
                    /* FRONT */
                    <div className="my-auto space-y-3">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-english tracking-tight">
                        {currentCard?.word}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(currentCard?.word || '');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>ฟังเสียงอ่าน</span>
                      </button>
                    </div>
                  ) : (
                    /* BACK */
                    <div className="my-auto space-y-3 animate-in fade-in duration-200">
                      <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                        คำอ่าน: {currentCard?.phoneticThai}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {currentCard?.translation}
                      </h2>

                      {/* Example sentence */}
                      <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 mt-2 text-left">
                        <div className="font-english font-bold text-slate-800 dark:text-slate-200">
                          "{currentCard?.exampleSentence}"
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {currentCard?.exampleTranslation}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    {!isFlipped
                      ? 'คุณจำความหมายของคำนี้ได้ไหม?'
                      : 'ประเมินระดับความจำของคุณเพื่อบันทึกสถิติ'}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Need Review vs Memorized */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleMarkMemorized(false)}
                  className="py-3 px-4 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>ต้องทบทวนอีก</span>
                </button>

                <button
                  onClick={() => handleMarkMemorized(true)}
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>จำได้แม่นแล้ว (+5 XP)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* DICTIONARY VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคำศัพท์, คำอ่าน หรือคำแปล..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {(
                [
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'saved', label: 'ที่บันทึกไว้' },
                  { id: 'memorized', label: 'จำได้แล้ว' },
                  { id: 'need-review', label: 'ต้องทบทวน' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vocabulary Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {filteredList.map((item) => {
              const isSaved = savedVocabularyIds.includes(item.id);
              const isMemorized = memorizedVocabularyIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-english text-lg font-black text-slate-900 dark:text-white">
                          {item.word}
                        </span>
                        <button
                          onClick={() => playAudio(item.word)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="ฟังการออกเสียง"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {item.partOfSpeech}
                        </span>
                        <button
                          onClick={() => onToggleSaveVocab(item.id)}
                          className={`p-1 rounded-lg ${
                            isSaved
                              ? 'text-amber-500'
                              : 'text-slate-300 hover:text-slate-500'
                          }`}
                          title="บันทึกคำศัพท์"
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5">
                      คำอ่าน: {item.phoneticThai}
                    </div>

                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {item.translation}
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs mt-3 font-english text-slate-700 dark:text-slate-300 leading-relaxed">
                      "{item.exampleSentence}"
                      <div className="text-[11px] font-sans text-slate-400 mt-0.5">
                        {item.exampleTranslation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-400 uppercase">
                      Tense: {item.tenseId.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => onToggleMemorizedVocab(item.id, !isMemorized)}
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        isMemorized
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <CheckCircle className={`w-3.5 h-3.5 ${isMemorized ? 'fill-emerald-600 text-white' : ''}`} />
                      <span>{isMemorized ? 'จำได้แล้ว' : 'ทำเครื่องหมายว่าจำได้'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-400">ไม่พบคำศัพท์ที่ตรงกับการค้นหา</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
