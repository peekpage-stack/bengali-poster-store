import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, PackageSearch, Truck } from 'lucide-react';
import { formatINR } from '../utils/format';
import { demoOrder } from '../data/catalog';

export default function OrderSuccess() {
  const { state } = useLocation();
  const id = state?.order?.id || demoOrder.id;

  return (
    <section className="page-x mx-auto max-w-3xl py-16 text-center">
      <CheckCircle2 size={56} className="mx-auto text-terracotta" />
      <h1 className="mt-5 text-5xl md:text-6xl">Thank you{state?.name ? `, ${state.name.split(' ')[0]}` : ''}</h1>
      <p className="mt-3 text-lg text-muted">Your order is confirmed. We have sent the receipt and tracking details to your email and WhatsApp.</p>

      <div className="card mt-10 grid gap-6 p-6 text-left sm:grid-cols-3">
        <div><p className="text-xs font-semibold text-muted">Order reference</p><p className="mt-1 font-serif text-2xl">#{id}</p></div>
        <div><p className="text-xs font-semibold text-muted">Estimated delivery</p><p className="mt-1 font-serif text-2xl">{demoOrder.eta}</p></div>
        <div><p className="text-xs font-semibold text-muted">Amount paid</p><p className="mt-1 font-serif text-2xl">{state?.total ? formatINR(state.total) : '—'}</p></div>
      </div>

      <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        {[[CheckCircle2, 'Printing and curing', 'Your pigment prints cure for 24 hours.'], [PackageSearch, 'Packed by hand', 'Sealed in an armored tube with a humidity capsule.'], [Truck, 'Insured dispatch', 'Handed to the courier within 48 hours.']].map(([Icon, t, d]) => (
          <li key={t} className="card p-5"><Icon className="text-terracotta" size={22} /><h2 className="mt-3 font-serif text-xl">{t}</h2><p className="mt-1 text-sm text-muted">{d}</p></li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/track-order" state={{ id }} className="btn btn-primary">Track your order</Link>
        <Link to="/shop" className="btn btn-outline">Continue exploring</Link>
      </div>
    </section>
  );
}
