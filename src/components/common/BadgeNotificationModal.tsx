import React, { useEffect } from 'react';
import { Badge } from '../../types/user';
import confetti from 'canvas-confetti';
import { Award, Sparkles, X } from 'lucide-react';

interface BadgeNotificationModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeNotificationModal: React.FC<BadgeNotificationModalProps> = ({
  badge,
  onClose,
}) => {
  useEffect(() => {
    if (badge) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-gradient-to-b from-amber-50 to-white dark:from-slate-800 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-600 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>ยินดีด้วย! ปลดล็อกเหรียญรางวัลใหม่</span>
        </div>

        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-200 text-amber-900 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 transform rotate-3">
          <Award className="w-12 h-12" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
          {badge.titleTh}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 font-medium">
          {badge.descriptionTh}
        </p>

        <div className="p-3 bg-amber-100/50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-medium mb-6">
          เงื่อนไข: {badge.conditionText} (+50 XP)
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          เยี่ยมมาก! สะสมต่อไป
        </button>
      </div>
    </div>
  );
};
