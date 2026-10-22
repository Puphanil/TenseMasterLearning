import React from 'react';
import { UserProgressState } from '../../types/user';
import {
  Flame,
  Zap,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface NavbarProps {
  progressState: UserProgressState;
  isLoggedIn: boolean;
  onToggleTheme: () => void;
  onOpenProfile: () => void;
  onOpenMobileMenu: () => void;
  currentTheme: 'light' | 'dark';
}

export const Navbar: React.FC<NavbarProps> = ({
  progressState,
  isLoggedIn,
  onToggleTheme,
  onOpenProfile,
  onOpenMobileMenu,
  currentTheme,
}) => {
  const { profile, xp, level, streakDays } = progressState;
  const xpInCurrentLevel = xp % 100;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="เปิดเมนู"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size={20} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  Tense Master
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                เข้าใจ 12 Tenses จริง ไม่ต้องท่องจำสูตร
              </p>
            </div>
          </div>
        </div>

        {/* Right: Gamification Badges, Streak, XP, Theme, Login / Username */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div
            title={`เรียนต่อเนื่อง ${streakDays} วันแล้ว! เข้าเรียนทุกวันเพื่อรักษา Streak`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold cursor-pointer shadow-xs hover:bg-amber-100 transition-colors"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakDays}</span>
            <span className="hidden sm:inline text-[11px] font-normal text-amber-700 dark:text-amber-400">
              วัน
            </span>
          </div>

          {/* Level & XP */}
          <div
            title={`เลเวล ${level} (มี ${xp} XP, เหลืออีก ${100 - xpInCurrentLevel} XP ถึงเลเวลถัดไป)`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300 text-xs font-semibold cursor-pointer shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span className="font-bold">Lv.{level}</span>
            <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hidden md:inline">
              ({xp} XP)
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title={currentTheme === 'dark' ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode'}
            aria-label="เปลี่ยนธีม"
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* User Button:
              - When NOT logged in: blue highlight frame with text "Login"
              - When logged in: displays ONLY username */}
          {!isLoggedIn ? (
            <button
              onClick={onOpenProfile}
              className="px-3.5 py-1.5 rounded-xl border-2 border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all shadow-xs active:scale-95"
            >
              Login
            </button>
          ) : (
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-xs max-w-[120px] sm:max-w-[160px] truncate"
              title={`เข้าสู่ระบบแล้วในชื่อ: ${profile.name}`}
            >
              {profile.name}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
