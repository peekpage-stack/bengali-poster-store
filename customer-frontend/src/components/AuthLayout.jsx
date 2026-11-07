import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft, Heart, PackageSearch, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from './Navbar.jsx';

const PERKS = [
  [ShieldCheck, 'Museum-quality prints', '300 GSM acid-free cotton rag, guaranteed 100+ years.'],
  [Heart, 'Wishlist & private folios', 'Curate your own gallery wall and save it for later.'],
  [PackageSearch, 'Real-time order tracking', 'SMS and WhatsApp updates from our Calcutta studio.'],
  [Sparkles, 'Early access to releases', '48-hour head start on limited-edition runs.'],
];

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-linen">
      <header className="border-b border-line/70">
        <div className="page-x flex h-[72px] items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-terracotta">
            <ArrowLeft size={18} /> Back to shop
          </Link>
          <Logo />
          <span className="hidden text-xs font-semibold text-faint sm:block">Secure sign-in</span>
        </div>
      </header>

      <main className="page-x grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16 lg:py-16">
        <section className="hidden lg:block">
          <p className="font-bangla text-lg text-terracotta">আপনার শিল্প আড্ডা</p>
          <h1 className="mt-3 text-6xl leading-[1.05]">Bring Bengal to your walls.</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Join 45,000 collectors across India. Save posters, track orders and get first access to new releases.
          </p>
          <ul className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            {PERKS.map(([Icon, t, d]) => (
              <li key={t} className="card flex gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-terracotta-tint text-terracotta"><Icon size={18} /></span>
                <span>
                  <span className="block text-sm font-semibold">{t}</span>
                  <span className="text-xs leading-relaxed text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-6 shadow-soft sm:p-10"><Outlet /></section>
      </main>

      <footer className="border-t border-line/70 py-5 text-center text-xs text-faint">
        © {new Date().getFullYear()} PeekPage Art Atelier
      </footer>
    </div>
  );
}
