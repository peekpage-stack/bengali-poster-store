import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight, Package } from 'lucide-react';
import useAsync from '../hooks/useAsync';
import { getOrders, getProducts, getStats } from '../services/adminService';
import OrderRow from '../components/OrderRow.jsx';

const LOW_STOCK_THRESHOLD = 25;

export default function Dashboard() {
  const stats = useAsync(getStats);
  const products = useAsync(getProducts);
  const orders = useAsync(getOrders);
  const low = (products || []).filter((p) => p.status === 'live' && p.stock <= LOW_STOCK_THRESHOLD);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-bangla text-terracotta">শুভ অপরাহ্ন · PeekPage Studio</p>
          <h1 className="text-4xl md:text-5xl">Atelier Control</h1>
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

      {/* ── Low Stock Alert Widget ── */}
      {low.length > 0 && (
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5" aria-label="Low stock alert">
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center rounded-lg bg-amber-100 p-2">
              <AlertTriangle size={18} className="text-amber-600" />
            </span>
            <div className="flex-1">
              <h2 className="font-semibold text-amber-900 leading-tight">
                Low Stock Alert
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[11px] font-bold text-white">
                  {low.length}
                </span>
              </h2>
              <p className="text-xs text-amber-700 mt-0.5">
                {low.length} poster{low.length !== 1 ? 's' : ''} running low · threshold ≤ {LOW_STOCK_THRESHOLD} units
              </p>
            </div>
            <Link to="/products" className="text-xs font-semibold text-amber-800 hover:underline underline-offset-2">
              Manage inventory →
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {low.map((p) => {
              const pct = Math.round((p.stock / (p.stock + (p.sold || 0))) * 100);
              const urgent = p.stock <= 10;
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 rounded-xl border p-3 bg-white ${
                    urgent ? 'border-red-200' : 'border-amber-100'
                  }`}
                >
                  <span className="grid h-12 w-9 shrink-0 place-items-center overflow-hidden rounded-md bg-terracotta-tint shadow-xs border border-line text-[9px] text-terracotta-dark">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <Package size={14} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink leading-tight">{p.title}</p>
                    {p.sku && <p className="text-[10px] font-mono text-muted">{p.sku}</p>}
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-amber-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${urgent ? 'bg-red-500' : 'bg-amber-400'}`}
                        style={{ width: `${Math.max(pct, 4)}%` }}
                      />
                    </div>
                    <p className={`mt-1 text-[10px] font-semibold ${urgent ? 'text-red-600' : 'text-amber-700'}`}>
                      {p.stock} left{urgent ? ' · Reorder now' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
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
