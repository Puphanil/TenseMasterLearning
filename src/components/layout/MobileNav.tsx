import React, { useState } from 'react';
import { NavTab } from './Sidebar';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Bot,
  MoreHorizontal,
  TableProperties,
  BookMarked,
  GitCompare,
  TrendingUp,
  Settings,
  X,
} from 'lucide-react';
import { UserProgressState } from '../../types/user';

interface MobileNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  progressState: UserProgressState;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  isOpenDrawer,
  onCloseDrawer,
  onOpenDrawer,
  progressState,
}) => {
  const mainTabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'lessons', label: '12 Tenses', icon: BookOpen },
    { id: 'exercises', label: 'แบบฝึกหัด', icon: HelpCircle },
    { id: 'aitutor', label: 'AI Tutor', icon: Bot },
  ];

  const secondaryTabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'summary', label: 'ตารางสรุป 12 Tenses', icon: TableProperties, desc: 'ตารางเปรียบเทียบและไทม์ไลน์ภาพรวม' },
    { id: 'vocabulary', label: 'คำศัพท์ & Flashcards', icon: BookMarked, desc: 'ทบทวนคำศัพท์สำคัญและการออกเสียง' },
    { id: 'comparison', label: 'เปรียบเทียบ Tense', icon: GitCompare, desc: 'เจาะลึก Tense ที่มักสับสน เช่น Past vs Perfect' },
    { id: 'progress', label: 'ความก้าวหน้า & เหรียญรางวัล', icon: TrendingUp, desc: 'สถิติการเรียน กราฟคะแนน และความต่อเนื่อง' },
    { id: 'settings', label: 'การตั้งค่า & ข้อมูล', icon: Settings, desc: 'ปรับแต่งการแสดงผลและรีเซ็ตข้อมูล' },
  ];

  return (
    <>
      {/* Drawer for secondary menus */}
      {isOpenDrawer && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                เมนูทั้งหมด
              </span>
              <button
                onClick={onCloseDrawer}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {secondaryTabs.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseDrawer();
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Compact Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {mainTabs.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* More Drawer Button */}
        <button
          onClick={onOpenDrawer}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            isOpenDrawer
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">เพิ่มเติม</span>
        </button>
      </nav>
    </>
  );
};
