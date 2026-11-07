import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const { password, confirm } = Object.fromEntries(new FormData(e.currentTarget));
    if (password !== confirm) return setError('Passwords do not match.');
    setDone(true);
  };

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle2 size={44} className="mx-auto text-terracotta" />
        <h1 className="mt-4 text-4xl">Password updated</h1>
        <p className="mt-2 text-muted">You can now sign in with your new password.</p>
        <Link to="/login" className="btn btn-primary mt-6 w-full">Sign in</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl">Set a new password</h1>
      <p className="mt-2 text-center text-muted">Choose something you have not used before.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div><label className="label" htmlFor="password">New password</label><input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="field h-12" /></div>
        <div><label className="label" htmlFor="confirm">Confirm new password</label><input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="field h-12" /></div>
        {error && <p className="text-sm text-danger" role="alert">{error}</p>}
        <button className="btn btn-primary w-full">Update password</button>
      </form>
    </>
  );
}
