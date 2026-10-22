import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  TableProperties,
  BookMarked,
  HelpCircle,
  GitCompare,
  Bot,
  TrendingUp,
  Settings,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { UserProgressState } from '../../types/user';

export type NavTab =
  | 'dashboard'
  | 'lessons'
  | 'summary'
  | 'vocabulary'
  | 'exercises'
  | 'comparison'
  | 'aitutor'
  | 'progress'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  progressState: UserProgressState;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  progressState,
}) => {
  const completedCount = progressState.completedLessons.length;
  const completionPercent = Math.round((completedCount / 12) * 100);

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string; isSpecial?: boolean }[] = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'lessons', label: 'เรียนรู้ 12 Tenses', icon: BookOpen, badge: `${completedCount}/12` },
    { id: 'summary', label: 'ตารางสรุป 12 Tenses', icon: TableProperties },
    { id: 'vocabulary', label: 'คำศัพท์ & Flashcards', icon: BookMarked },
    { id: 'exercises', label: 'แบบฝึกหัด', icon: HelpCircle },
    { id: 'comparison', label: 'เปรียบเทียบ Tense', icon: GitCompare },
    { id: 'aitutor', label: 'AI English Tutor', icon: Bot, isSpecial: true },
    { id: 'progress', label: 'ความก้าวหน้าของฉัน', icon: TrendingUp },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      {/* Navigation menu */}
      <nav className="space-y-1 flex-1 overflow-y-auto pr-1">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-2">
          เมนูการเรียนรู้
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? item.isSpecial
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20 font-semibold'
                    : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                  : item.isSpecial
                  ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-white'
                      : item.isSpecial
                      ? 'text-purple-500 dark:text-purple-400'
                      : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-blue-700/60 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.isSpecial && !isActive && (
                <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Course Completion Progress Card at bottom of sidebar */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>เรียนจบ 12 Tenses</span>
            </span>
            <span className="text-blue-600 dark:text-blue-400">
              {completionPercent}%
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            เรียนจบแล้ว {completedCount} จากทั้งหมด 12 บท
          </p>
        </div>
      </div>
    </aside>
  );
};
