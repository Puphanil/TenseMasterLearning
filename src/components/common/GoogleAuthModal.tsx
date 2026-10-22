import React, { useState } from 'react';
import { UserProfile } from '../../types/user';
import { X, Check, ShieldCheck } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onUpdateProfile,
}) => {
  const [userName, setUserName] = useState(currentProfile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(currentProfile.avatarUrl || '🧑‍🎓');

  if (!isOpen) return null;

  const avatarOptions = ['🧑‍🎓', '👩‍🎓', '🦉', '🚀', '⭐', '🦁', '🦊', '💡'];

  const handleSimulatedGoogleLogin = () => {
    const googleUser: UserProfile = {
      id: 'google_user_' + Math.random().toString(36).substring(2, 9),
      name: currentProfile.name !== 'ผู้เรียนคนเก่ง' ? currentProfile.name : 'ศิษย์เอกครูท็อป (Google User)',
      email: 'student@example.com',
      avatarUrl: selectedAvatar,
      authProvider: 'google',
      createdAt: currentProfile.createdAt,
    };
    onUpdateProfile(googleUser);
    onClose();
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...currentProfile,
      name: userName.trim() || 'ผู้เรียนคนเก่ง',
      avatarUrl: selectedAvatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
            {selectedAvatar}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            โปรไฟล์ผู้เรียนและการเข้าสู่ระบบ
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            บันทึกความก้าวหน้า เหรียญรางวัล และสถิติการเรียนของคุณ
          </p>
        </div>

        {/* Google Sign-In Action */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleSimulatedGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 font-medium text-slate-700 dark:text-slate-200 transition-all shadow-sm hover:shadow active:scale-[0.99]"
          >
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>เข้าสู่ระบบด้วย Google Account</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>เชื่อมต่อปลอดภัย ข้อมูลการเรียนรู้จะถูกซิงค์อัตโนมัติ</span>
          </div>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-slate-400">
            หรือปรับแต่งโปรไฟล์ปัจจุบัน
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              ชื่อแสดงของคุณ
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              เลือกรูปประจำตัว (Avatar)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`p-2.5 text-2xl rounded-xl border transition-all text-center ${
                    selectedAvatar === emoji
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 shadow-sm scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>บันทึกการเปลี่ยนแปลง</span>
          </button>
        </div>
      </div>
    </div>
  );
};
