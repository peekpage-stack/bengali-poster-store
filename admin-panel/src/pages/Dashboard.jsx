import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import useAsync from '../hooks/useAsync';
import { getOrders, getProducts, getStats } from '../services/adminService';
import OrderRow from '../components/OrderRow.jsx';

export default function Dashboard() {
  const stats = useAsync(getStats);
  const products = useAsync(getProducts);
  const orders = useAsync(getOrders);
  const low = (products || []).filter((p) => p.status === 'live' && p.stock <= 5);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-bangla text-terracotta">শুভ অপরাহ্ন</p>
          <h1 className="text-4xl md:text-5xl">Atelier control</h1>
        </div>
        <Link to="/products" state={{ add: true }} className="btn btn-primary">Add new poster</Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key figures">
        {(stats || []).map((s) => (
          <div key={s.label} className="card p-5">
            <p className="flex items-center justify-between text-xs font-semibold text-muted">{s.label}{s.delta && <span className="inline-flex items-center text-emerald-700"><ArrowUpRight size={14} />{s.delta}</span>}</p>
            <p className="mt-2 font-serif text-4xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.note}</p>
          </div>
        ))}
      </section>

      {low.length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-terracotta/30 bg-terracotta-tint p-4 text-sm" role="alert">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-terracotta" />
          <p><b>Low stock:</b> {low.map((p) => `${p.title} (${p.stock} left)`).join(', ')}.</p>
        </div>
      )}

      <section className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5"><h2 className="text-2xl">Recent orders</h2><Link to="/orders" className="link-arrow">View all</Link></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper text-xs text-muted"><tr><th className="px-4 py-2.5 font-semibold">Order</th><th className="px-4 py-2.5 font-semibold">Customer</th><th className="hidden px-4 py-2.5 font-semibold sm:table-cell">Placed</th><th className="hidden px-4 py-2.5 font-semibold md:table-cell">Items</th><th className="px-4 py-2.5 font-semibold">Total</th><th className="px-4 py-2.5 font-semibold">Status</th></tr></thead>
            <tbody>{(orders || []).slice(0, 5).map((o) => <OrderRow key={o.id} order={o} />)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
