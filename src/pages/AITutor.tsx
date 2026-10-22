import React, { useState, useEffect, useRef } from 'react';
import {
  askAITutor,
  checkSentenceWithAI,
  ChatMessage,
  checkApiHealth,
} from '../services/geminiService';
import {
  Bot,
  Send,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  KeyRound,
  RotateCcw,
  SpellCheck,
  MessageSquare,
  Volume2,
} from 'lucide-react';

interface AITutorProps {
  initialPrompt?: string;
  onTutorActionTriggered?: () => void;
}

export const AITutor: React.FC<AITutorProps> = ({
  initialPrompt,
  onTutorActionTriggered,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'checker'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      content: `สวัสดีครับ! ครูท็อป ยินดีต้อนรับครับ 😊\n\nครูพร้อมช่วยตอบทุกข้อสงสัยเกี่ยวกับ 12 Tenses, ตรวจประโยคภาษาอังกฤษของคุณ, อธิบายความแตกต่างของไวยากรณ์ หรือช่วยแปลประโยคพร้อมอธิบายอย่างละเอียดเป็นภาษาไทย\n\nมีข้อสงสัยตรงไหน อยากให้ครูช่วยอธิบายอะไร พิมพ์ถามได้เลยครับ!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [apiHealth, setApiHealth] = useState<{ hasGeminiKey: boolean } | null>(null);

  // Grammar checker tab state
  const [checkSentence, setCheckSentence] = useState('');
  const [targetTense, setTargetTense] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isCheckingSentence, setIsCheckingSentence] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkApiHealth().then((h) => setApiHealth(h));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    'Present Perfect ใช้ต่างจาก Past Simple อย่างไร?',
    'ทำไมประโยคนี้ต้องใช้ has แทน have?',
    'ช่วยอธิบายเรื่อง Future Continuous แบบเห็นภาพง่ายๆ หน่อยครับ',
    'Stative verbs คืออะไร ทำไมถึงห้ามเติม -ing?',
    'ช่วยยกตัวอย่างประโยค Present Continuous ในที่ทำงาน 3 ประโยค',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    if (onTutorActionTriggered) {
      onTutorActionTriggered();
    }

    const response = await askAITutor(text.trim(), messages);

    const modelMsg: ChatMessage = {
      id: 'model-' + Date.now(),
      role: 'model',
      content: response.reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleCheckSentence = async () => {
    if (!checkSentence.trim() || isCheckingSentence) return;
    setIsCheckingSentence(true);
    setAnalysisResult(null);

    if (onTutorActionTriggered) {
      onTutorActionTriggered();
    }

    const res = await checkSentenceWithAI(checkSentence.trim(), targetTense.trim() || undefined);
    setAnalysisResult(res.analysis);
    setIsCheckingSentence(false);
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
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20 text-2xl">
            👨‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ครูท็อป (Kru Top) - AI English Tutor
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                GEMINI 3.8 FLASH
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ผู้ช่วยส่วนตัวตอบคำถามไวยากรณ์ ตรวจประโยคภาษาอังกฤษ และอธิบายเป็นภาษาไทย
            </p>
          </div>
        </div>

        {/* Tab switch (Chat vs Sentence Checker) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>คุยถามครูท็อป</span>
          </button>

          <button
            onClick={() => setActiveTab('checker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'checker'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <SpellCheck className="w-4 h-4" />
            <span>เครื่องมือตรวจประโยค</span>
          </button>
        </div>
      </div>

      {/* API Key Notification if not set */}
      {apiHealth && !apiHealth.hasGeminiKey && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <KeyRound className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">ข้อมูลการเชื่อมต่อ AI: </strong>
            ยังไม่ได้เพิ่ม <code>GEMINI_API_KEY</code> ในส่วน <strong>Settings &gt; Secrets</strong> ของ Google AI Studio (หากเพิ่มแล้วระบบจะเปิดใช้งาน AI ตอบคำถามและตรวจไวยากรณ์สดๆ โดยอัตโนมัติ)
            <div className="mt-1 text-slate-500 dark:text-slate-400">
              *หมายเหตุ: ฟังก์ชันบทเรียน 12 Tenses, แบบฝึกหัด, และ Flashcards ทั้งหมดยังใช้งานได้ 100% ตามปกติ
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' ? (
        /* CHAT INTERFACE */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[580px]">
          {/* Messages list */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                      isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {isUser ? 'คุณ' : 'ครู'}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-xs whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`text-[10px] mt-2 text-right ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2.5 text-xs text-purple-600 dark:text-purple-400 font-medium p-2 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>ครูท็อปกำลังพิมพ์คำอธิบาย...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-850/80 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 shrink-0">
              💡 ตัวอย่างคำถาม:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 text-slate-600 dark:text-slate-300 text-[11px] whitespace-nowrap transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="พิมพ์คำถามไวยากรณ์ หรือพิมพ์ประโยคที่ต้องการให้ช่วยแปล..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputPrompt.trim() || isLoading}
              className="p-2.5 sm:px-4 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">ส่ง</span>
            </button>
          </div>
        </div>
      ) : (
        /* SENTENCE GRAMMAR CHECKER INTERFACE */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              ระบบตรวจประโยคภาษาอังกฤษ & วิเคราะห์ Tense
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              พิมพ์ประโยคภาษาอังกฤษของคุณ AI จะวิเคราะห์ว่าเขียนถูกต้องตามไวยากรณ์หรือไม่ พร้อมคำอ่านและคำแปล
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                ประโยคภาษาอังกฤษที่ต้องการตรวจ:
              </label>
              <textarea
                rows={3}
                value={checkSentence}
                onChange={(e) => setCheckSentence(e.target.value)}
                placeholder="เช่น: She go to school yesterday with her friends."
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-english text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                เป้าหมาย Tense ที่ตั้งใจจะเขียน (ไม่ระบุก็ได้):
              </label>
              <input
                type="text"
                value={targetTense}
                onChange={(e) => setTargetTense(e.target.value)}
                placeholder="เช่น: Past Simple, Present Perfect..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={handleCheckSentence}
              disabled={!checkSentence.trim() || isCheckingSentence}
              className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isCheckingSentence ? (
                <>
                  <Bot className="w-4 h-4 animate-spin" />
                  <span>กำลังวิเคราะห์ไวยากรณ์...</span>
                </>
              ) : (
                <>
                  <SpellCheck className="w-4 h-4" />
                  <span>ตรวจประโยคนี้</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Result Box */}
          {analysisResult && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  ผลการตรวจประโยคจากครูท็อป:
                </span>
                <button
                  onClick={() => playAudio(checkSentence)}
                  className="text-slate-400 hover:text-blue-500 p-1"
                  title="ฟังเสียงอ่าน"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-100">
                {analysisResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
