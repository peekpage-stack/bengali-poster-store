import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/adminService';
import { ORDER_STATUSES } from '../data/mock';
import OrderRow from '../components/OrderRow.jsx';

export default function OrderFulfillment() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { getOrders().then(setOrders); }, []);

  const change = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const shown = orders.filter((o) => filter === 'all' || o.status === filter);
  const counts = Object.fromEntries(ORDER_STATUSES.map((s) => [s, orders.filter((o) => o.status === s).length]));

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-4xl md:text-5xl">Orders & dispatch</h1>
      <p className="mt-1 text-muted">Move each order along as it is printed, packed and shipped.</p>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
        {['all', ...ORDER_STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`chip capitalize ${filter === s ? 'chip-active' : ''}`}>
            {s}{s !== 'all' && <span className="ml-1.5 opacity-70">{counts[s]}</span>}
          </button>
        ))}
      </div>

      <div className="card mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper text-xs text-muted"><tr><th className="px-4 py-2.5 font-semibold">Order</th><th className="px-4 py-2.5 font-semibold">Customer</th><th className="hidden px-4 py-2.5 font-semibold sm:table-cell">Placed</th><th className="hidden px-4 py-2.5 font-semibold md:table-cell">Items</th><th className="px-4 py-2.5 font-semibold">Total</th><th className="px-4 py-2.5 font-semibold">Status</th></tr></thead>
          <tbody>
            {shown.map((o) => <OrderRow key={o.id} order={o} onStatus={change} />)}
            {!shown.length && <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">No {filter} orders right now.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
