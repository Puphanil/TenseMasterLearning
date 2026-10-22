import React, { useState } from 'react';
import { UserProgressState } from '../types/user';
import {
  Moon,
  Sun,
  RotateCcw,
  Volume2,
  BookOpen,
  Target,
  Shield,
  AlertTriangle,
  Check,
  X,
  User,
} from 'lucide-react';

interface SettingsProps {
  progressState: UserProgressState;
  onUpdateSettings: (settings: UserProgressState['settings']) => void;
  onUpdateDailyTarget: (newTarget: number) => void;
  onResetProgress: () => void;
  onOpenProfileModal: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  progressState,
  onUpdateSettings,
  onUpdateDailyTarget,
  onResetProgress,
  onOpenProfileModal,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const { settings, dailyGoal, profile } = progressState;

  const handleToggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ ...settings, theme: nextTheme });
  };

  const handleTogglePhonetics = () => {
    onUpdateSettings({
      ...settings,
      showPhonetics: !settings.showPhonetics,
    });
  };

  const handleToggleSound = () => {
    onUpdateSettings({
      ...settings,
      soundEnabled: !settings.soundEnabled,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          การตั้งค่า (Settings)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          ปรับแต่งประสบการณ์การเรียนรู้ จัดการโปรไฟล์ และรีเซ็ตข้อมูลความก้าวหน้า
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-3xl shadow-inner">
            {profile.avatarUrl || '🧑‍🎓'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {profile.name}
              </h3>
              {profile.authProvider === 'google' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                  Google Account
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              สถานะ: {profile.authProvider === 'google' ? 'เชื่อมต่อแล้ว' : 'ผู้เรียนในเครื่อง (Guest Local)'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfileModal}
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
        >
          แก้ไขโปรไฟล์
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-3">
          การแสดงผลและเสียง
        </h3>

        {/* Theme mode */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {settings.theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                ธีมการแสดงผล (Dark / Light Mode)
              </div>
              <div className="text-xs text-slate-400">
                ปัจจุบัน: {settings.theme === 'dark' ? 'โหมดมืด (Dark)' : 'โหมดสว่าง (Light)'}
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleTheme}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            สลับเป็น {settings.theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Thai Phonetics toggle */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                แสดงคำอ่านภาษาไทยกำกับ
              </div>
              <div className="text-xs text-slate-400">
                ช่วยออกเสียงโดยประมาณสำหรับผู้เริ่มต้น
              </div>
            </div>
          </div>

          <button
            onClick={handleTogglePhonetics}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.showPhonetics ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showPhonetics ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Audio Sound toggle */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Volume2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                เสียงอ่านภาษาอังกฤษ (Native TTS)
              </div>
              <div className="text-xs text-slate-400">
                ฟังการออกเสียงเมื่อกดไอคอนรูปลำโพง
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleSound}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.soundEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Daily Target Exercises */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Target className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                เป้าหมายทำแบบฝึกหัดต่อวัน
              </div>
              <div className="text-xs text-slate-400">
                ตั้งเป้าจำนวนข้อที่ต้องการฝึกฝนในแต่ละวัน
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[3, 5, 10, 15].map((targetNum) => (
              <button
                key={targetNum}
                onClick={() => onUpdateDailyTarget(targetNum)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  dailyGoal.targetExercises === targetNum
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {targetNum} ข้อ
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>โซนข้อมูลสำคัญ (Danger Zone)</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          หากต้องการเริ่มเรียนรู้ใหม่ตั้งแต่ต้น คุณสามารถรีเซ็ตสถิติ คะแนนแบบฝึกหัด เหรียญรางวัล และประวัติทั้งหมดได้
        </p>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>รีเซ็ตความก้าวหน้าทั้งหมด</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 space-y-3">
            <div className="text-xs font-bold text-rose-900 dark:text-rose-200">
              ⚠️ คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมด? ข้อมูลจะไม่สามารถกู้คืนได้
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onResetProgress();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
              >
                ยืนยันการลบข้อมูล
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
