import { ORDER_STATUSES } from '../data/mock';

const STYLE = {
  processing: 'bg-terracotta-tint text-terracotta-dark',
  packed: 'bg-gold/20 text-[#7a5f1d]',
  shipped: 'bg-sky-100 text-sky-800',
  delivered: 'bg-emerald-100 text-emerald-800',
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STYLE[status] || 'bg-sand'}`}>
    {status}
  </span>
);

export default function OrderRow({ order, onStatus }) {
  return (
    <tr className="border-t border-line/70">
      <td className="px-4 py-3">
        <p className="font-semibold text-ink">{order.id}</p>
        {order.trackingNumber && (
          <p className="text-[10px] font-mono text-muted">{order.trackingNumber}</p>
        )}
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-ink">{order.customer}</p>
        <p className="text-xs text-muted">{order.city}</p>
      </td>
      <td className="hidden px-4 py-3 text-muted sm:table-cell text-xs">{order.placed}</td>
      <td className="hidden px-4 py-3 md:table-cell">
        <p className="font-medium">{order.items} {order.items === 1 ? 'plate' : 'plates'}</p>
        {order.details && (
          <p className="text-[11px] text-muted truncate max-w-[220px]" title={order.details}>
            {order.details}
          </p>
        )}
      </td>
      <td className="px-4 py-3">
        <p className="font-semibold">₹{order.total.toLocaleString('en-IN')}</p>
        {order.paymentMethod && (
          <p className="text-[10px] text-muted">{order.paymentMethod}</p>
        )}
      </td>
      <td className="px-4 py-3">
        {onStatus ? (
          <select
            className="field h-9 w-auto py-0 text-xs capitalize"
            value={order.status}
            onChange={(e) => onStatus(order.id, e.target.value)}
            aria-label={`Status for ${order.id}`}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        ) : (
          <StatusBadge status={order.status} />
        )}
      </td>
    </tr>
  );
}
