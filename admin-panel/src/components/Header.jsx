import { Menu, Plus, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-linen/90 px-5 backdrop-blur-xl md:px-8">
      <button onClick={onMenu} className="lg:hidden" aria-label="Open menu"><Menu size={22} /></button>
      <p className="hidden text-sm text-muted lg:block">Kolkata studio · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      <div className="flex items-center gap-2">
        <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><Store size={15} /> Live store</a>
        <Link to="/products" state={{ add: true }} className="btn btn-primary btn-sm"><Plus size={15} /> New poster</Link>
      </div>
    </header>
  );
}
