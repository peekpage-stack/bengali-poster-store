import { NavLink } from 'react-router-dom';
import { LayoutGrid, LogOut, Palette, Truck, X } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const LINKS = [['/', LayoutGrid, 'Dashboard'], ['/products', Palette, 'Products'], ['/orders', Truck, 'Orders']];

export default function Sidebar({ open, onClose }) {
  const { admin, logout } = useAdminAuth();
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-line bg-paper transition-transform lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="font-serif text-2xl font-semibold leading-none">Atelier Studio</p>
            <p className="mt-1 font-bangla text-xs text-terracotta">অ্যাডমিন কন্ট্রোল</p>
          </div>
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu"><X size={20} /></button>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
          {LINKS.map(([to, Icon, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-ink text-linen' : 'text-muted hover:bg-sand hover:text-ink'}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-line p-4">
          <p className="truncate text-sm font-semibold">{admin?.name}</p>
          <p className="text-xs text-muted">{admin?.role}</p>
          <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm text-danger hover:underline"><LogOut size={15} /> Sign out</button>
        </div>
      </aside>
    </>
  );
}
