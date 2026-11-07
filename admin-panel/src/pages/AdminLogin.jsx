import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const { admin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@peekpage.com');
  const [password, setPassword] = useState('admin123');
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    await login({ email, password });
    navigate('/', { replace: true });
  };

  const handleQuickDemo = async () => {
    setBusy(true);
    await login({ email: 'admin@peekpage.com', password: 'admin123' });
    navigate('/', { replace: true });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-paper p-5">
      <form onSubmit={submit} className="card w-full max-w-md p-8 shadow-soft">
        <p className="font-bangla text-sm text-terracotta">অ্যাডমিন কন্ট্রোল</p>
        <h1 className="mt-1 text-4xl">PeekPage Studio</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage posters, inventory & orders.</p>

        {/* Mock Credentials Helper Callout */}
        <div className="mt-5 rounded-xl border border-line bg-sand/70 p-3.5 text-xs text-muted">
          <p className="font-semibold text-ink">Mock Admin Credentials</p>
          <div className="mt-1.5 space-y-0.5 font-mono text-[11px]">
            <p>Email: <span className="text-terracotta font-semibold">admin@peekpage.com</span></p>
            <p>Password: <span className="text-terracotta font-semibold">admin123</span></p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="label" htmlFor="email">Admin email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field h-12"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field h-12"
              autoComplete="current-password"
            />
          </div>
          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in to Admin Panel'}
          </button>

          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={busy}
            className="btn btn-outline w-full text-xs font-semibold"
          >
            ⚡ 1-Click Demo Login
          </button>
        </div>
      </form>
    </main>
  );
}
