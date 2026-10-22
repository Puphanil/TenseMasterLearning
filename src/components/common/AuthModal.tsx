import React, { useState } from 'react';
import { UserProfile } from '../../types/user';
import {
  X,
  ShieldCheck,
  LogIn,
  UserPlus,
  AlertCircle,
  Loader2,
  LogOut,
  User,
} from 'lucide-react';
import {
  loginWithGoogle,
  registerWithEmailPassword,
  loginWithEmailPassword,
  logoutUser,
} from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  isLoggedIn: boolean;
  onAuthSuccess: (profile: UserProfile) => void;
  onLogoutSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  isLoggedIn,
  onAuthSuccess,
  onLogoutSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const profile = await loginWithGoogle();
      onAuthSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error('Google login error:', err);
      setErrorMsg(
        err.code === 'auth/popup-closed-by-user'
          ? 'หน้าต่างล็อกอินถูกปิด กรุณาลองใหม่อีกครั้ง'
          : err.message || 'เกิดข้อผิดพลาดในการล็อกอินด้วย Google'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    if (authMode === 'signup' && !username.trim()) {
      setErrorMsg('กรุณาระบุชื่อบัญชี (Username)');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    try {
      setLoading(true);
      let profile: UserProfile;

      if (authMode === 'signup') {
        profile = await registerWithEmailPassword(
          username.trim(),
          email.trim(),
          password.trim()
        );
      } else {
        profile = await loginWithEmailPassword(email.trim(), password.trim());
      }

      onAuthSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error('Email auth error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('อีเมลนี้ถูกใช้งานแล้ว กรุณาสลับไปที่แท็บเข้าสู่ระบบ');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('รูปแบบอีเมลไม่ถูกต้อง');
      } else {
        setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      onLogoutSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการออกจากระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          /* LOGGED IN PROFILE VIEW */
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-4xl mx-auto shadow-inner">
              {currentProfile.avatarUrl && currentProfile.avatarUrl.startsWith('http') ? (
                <img
                  src={currentProfile.avatarUrl}
                  alt={currentProfile.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-blue-600" />
              )}
            </div>

            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                เข้าสู่ระบบแล้ว
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentProfile.name}
              </h3>
              {currentProfile.email && (
                <p className="text-xs text-slate-400">{currentProfile.email}</p>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              ความก้าวหน้าการเรียนรู้ คะแนนแบบฝึกหัด และเหรียญรางวัลของคุณถูกบันทึกเชื่อมโยงกับบัญชีนี้แล้ว
            </p>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ (Logout)</span>
            </button>
          </div>
        ) : (
          /* LOGIN / SIGNUP VIEW */
          <div className="space-y-5">
            <div className="text-center">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                เข้าสู่ระบบ / สมัครสมาชิก
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                เพื่อจดจำความก้าวหน้า บันทึกคะแนน และซิงค์ข้อมูล Tense Master
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 font-semibold text-slate-700 dark:text-slate-200 text-sm transition-all shadow-xs hover:shadow active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
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
              )}
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                หรือใช้อีเมลและรหัสผ่าน
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Tabs for Login vs Sign Up */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                เข้าสู่ระบบ (Log In)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                สร้างบัญชี (Sign Up)
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    ชื่อผู้ใช้ (Username)
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="เช่น: Somchai_Grammar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  อีเมล (Email)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  รหัสผ่าน (Password อย่างน้อย 6 ตัวอักษร)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : authMode === 'signup' ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>สมัครสมาชิกและบันทึกข้อมูล</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>เข้าสู่ระบบ</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ความปลอดภัยระดับสากลด้วย Firebase Authentication</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
