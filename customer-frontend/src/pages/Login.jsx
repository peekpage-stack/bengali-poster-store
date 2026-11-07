import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || location.state?.from || '/account';
  const isFromCheckout = redirectTarget === '/checkout' || searchParams.get('redirect') === '/checkout';

  const [mode, setMode] = useState('password');
  const [email, setEmail] = useState('anirban.patron@banglacanvas.art');
  const [password, setPassword] = useState('Patron@1955');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const res = await login({ email, password });
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirectTarget, { replace: true });
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your registered patron email or phone.');
      return;
    }
    setOtpSent(true);
    setError('');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await login({ email, otp: otp || '841029' });
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  const handleQuickDemo = async () => {
    setEmail('anirban.patron@banglacanvas.art');
    setPassword('Patron@1955');
    await login({ email: 'anirban.patron@banglacanvas.art', password: 'password' });
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 sm:py-16 bg-surface flex items-center justify-center w-full max-w-full overflow-x-hidden">
      <div className="max-w-md w-full mx-auto px-4">
        
        {/* Card Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-atelier space-y-5 sm:space-y-6">
          
          {/* Top Logo & Atelier Crest */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Peel page"
                className="h-10 mx-auto w-auto object-contain"
              />
            </Link>
            <span className="font-bengali text-xs sm:text-sm text-primary block">
              বাংলার শিল্প সংগ্রাহক প্রবেশদ্বার
            </span>
            <h1 className="font-headline text-2xl sm:text-3xl font-normal text-on-surface">
              Patron Authentication
            </h1>
            <p className="text-xs font-body text-on-surface-variant max-w-xs mx-auto">
              Access your personal curatorial dossier, past archival acquisitions, and priority art drop allocations.
            </p>
          </div>

          {/* Checkout Redirection Notice */}
          {isFromCheckout && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-primary/10 border border-primary/20 text-on-surface text-xs font-label flex items-start gap-3 animate-in fade-in duration-300">
              <ShoppingBag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary">Session Sign-in Required</p>
                <p className="text-on-surface-variant text-[11px] mt-0.5 leading-relaxed">
                  Please log in or click <strong>1-Click Demo Login</strong> below to authenticate your patron session and proceed directly to checkout.
                </p>
              </div>
            </div>
          )}

          {/* Toggle Login Mode (Password vs OTP) */}
          <div className="flex bg-surface-container-low p-1 rounded-xl text-xs font-label">
            <button
              type="button"
              onClick={() => { setMode('password'); setError(''); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                mode === 'password'
                  ? 'bg-surface text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Master Password
            </button>
            <button
              type="button"
              onClick={() => { setMode('otp'); setError(''); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                mode === 'otp'
                  ? 'bg-surface text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Instant Mobile OTP
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/20 flex items-center gap-2 text-xs font-label text-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Password Login Form */}
          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                  Patron Email or Account ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@banglacanvas.art"
                    className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] uppercase font-label font-bold text-on-surface">
                    Vault Password
                  </label>
                  <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password recovery link sent to your registered email.'); }} className="text-[11px] font-label text-primary hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-low text-on-surface text-xs font-body pl-10 pr-3.5 py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Verifying Patron...' : 'Enter Curatorial Dossier'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* OTP Login Form */
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                  Mobile Phone or Email
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="+91 98301 23456"
                  disabled={otpSent}
                  className="w-full bg-surface-container-low text-on-surface text-xs font-body px-3.5 py-3 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface disabled:opacity-60"
                />
              </div>

              {otpSent && (
                <div>
                  <label className="block text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Enter 6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="841029"
                    className="w-full bg-surface-container-low text-on-surface text-center tracking-widest font-mono text-lg py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface"
                    autoFocus
                  />
                  <p className="text-[10px] text-on-surface-variant font-label mt-1 text-center">
                    Demo code: <strong>841029</strong> (Valid for 5 minutes)
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98]"
              >
                <span>{otpSent ? 'Confirm & Enter Vault' : 'Transmit One-Time Passcode'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 1-Click Instant Demo Credentials */}
          <div className="pt-2 border-t border-surface-container text-center">
            <button
              onClick={handleQuickDemo}
              className="text-xs font-label text-primary font-semibold hover:underline inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Demo Login as Patron Babu</span>
            </button>
          </div>

          {/* New Patron Link */}
          <div className="text-center pt-1 text-xs font-label text-on-surface-variant">
            <span>New collector to PeekPage? </span>
            <Link to={`/register${location.search}`} className="text-primary font-bold hover:underline">
              Register Patron Dossier
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
