import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center">
        <MailCheck size={44} className="mx-auto text-terracotta" />
        <h1 className="mt-4 text-4xl">Check your inbox</h1>
        <p className="mt-2 text-muted">If an account exists for <b className="text-ink">{email}</b>, we have sent a link to reset your password. It expires in 30 minutes.</p>
        <Link to="/reset-password" className="btn btn-primary mt-6 w-full">I have the link</Link>
        <button onClick={() => setSent(false)} className="mt-3 text-sm text-muted underline">Use a different email</button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl">Forgot your password?</h1>
      <p className="mt-2 text-center text-muted">Enter your email and we will send a reset link.</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-4">
        <div><label className="label" htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field h-12" /></div>
        <button className="btn btn-primary w-full">Send reset link</button>
      </form>
      <p className="mt-6 text-center text-sm"><Link to="/login" className="font-semibold text-terracotta hover:underline">Back to sign in</Link></p>
    </>
  );
}
