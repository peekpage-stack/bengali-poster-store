import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const { admin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  if (admin) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    await login(Object.fromEntries(new FormData(e.currentTarget)));
    navigate('/', { replace: true });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-paper p-5">
      <form onSubmit={submit} className="card w-full max-w-md p-8 shadow-soft">
        <p className="font-bangla text-sm text-terracotta">অ্যাডমিন কন্ট্রোল</p>
        <h1 className="mt-1 text-4xl">Atelier Studio</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage posters and orders.</p>
        <div className="mt-6 space-y-4">
          <div><label className="label" htmlFor="email">Admin email</label><input id="email" name="email" type="email" required className="field h-12" autoComplete="username" /></div>
          <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required minLength={6} className="field h-12" autoComplete="current-password" /></div>
          <button className="btn btn-primary w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </div>
      </form>
    </main>
  );
}
