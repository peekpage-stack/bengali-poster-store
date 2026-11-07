import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Minus, Plus, ArrowRight } from 'lucide-react';

export function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="page-x pt-6 text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map(([label, to], i) => (
          <li key={label} className="flex items-center gap-1.5">
            {to ? <Link to={to} className="hover:text-terracotta">{label}</Link> : <span className="text-ink">{label}</span>}
            {i < trail.length - 1 && <ChevronRight size={12} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeading({ title, subtitle, to, linkLabel = 'View all', className = '' }) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-4xl md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-muted">{subtitle}</p>}
      </div>
      {to && <Link to={to} className="link-arrow">{linkLabel} <ArrowRight size={16} /></Link>}
    </div>
  );
}

export function PageHeader({ title, bn, subtitle, children }) {
  return (
    <header className="border-b border-line/70 bg-paper">
      <div className="page-x py-12 md:py-16">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h1 className="text-5xl md:text-6xl">{title}</h1>
          {bn && <span className="font-bangla text-2xl text-terracotta">{bn}</span>}
        </div>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}

export function QtyStepper({ value, onChange }) {
  return (
    <div className="inline-flex h-12 items-center rounded border border-line bg-white">
      <button className="px-3.5 hover:text-terracotta" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span>
      <button className="px-3.5 hover:text-terracotta" onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
    </div>
  );
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white">
      {items.map((it, i) => (
        <div key={it.q}>
          <button
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-serif text-xl hover:text-terracotta"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {it.q}
            <ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <p className="px-5 pb-5 leading-relaxed text-muted animate-fadeIn">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="page-x section">
      <div className="rounded-xl bg-terracotta px-6 py-14 text-center text-white sm:px-12">
        <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl">Get first access to new poster releases</h2>
        <p className="mx-auto mt-3 max-w-lg text-white/85">Join the Calcutta Circle for limited-edition drops and restored lithographs. Get 10% off your first order.</p>
        {done ? (
          <p className="mt-8 font-serif text-2xl" role="status">Welcome to the circle. Check your inbox for your code.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input id="nl-email" type="email" required placeholder="Your email address" className="field h-12 border-transparent" />
            <button className="btn btn-ink shrink-0">Join the circle</button>
          </form>
        )}
      </div>
    </section>
  );
}

export function EmptyState({ title, text, to, cta }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <h2 className="text-4xl">{title}</h2>
      <p className="mt-3 text-muted">{text}</p>
      {to && <Link to={to} className="btn btn-primary mt-6">{cta}</Link>}
    </div>
  );
}

export function Spinner() {
  return <div className="py-24 text-center text-sm text-faint" role="status">Loading…</div>;
}
