import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { deleteProduct, getProducts, saveProduct } from '../services/adminService';
import ProductModal from '../components/ProductModal.jsx';

const STATUS = { live: 'bg-emerald-100 text-emerald-800', draft: 'bg-sand text-muted', archived: 'bg-line/60 text-muted' };
const LOW_STOCK_THRESHOLD = 25;

export default function ProductManager() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(location.state?.add ? {} : null); // {} = new, product = edit, null = closed

  useEffect(() => { getProducts().then(setProducts); }, []);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      (p.bengaliTitle && p.bengaliTitle.includes(q)) ||
      (p.sku && p.sku.toLowerCase().includes(q.toLowerCase()))
  );

  const save = async (p) => {
    const saved = await saveProduct(p);
    setProducts((list) => (saved.id ? list.map((x) => (x.id === saved.id ? saved : x)) : [{ ...saved, id: Date.now() }, ...list]));
    setModal(null);
  };
  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await deleteProduct(p.id);
    setProducts((list) => list.filter((x) => x.id !== p.id));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl md:text-5xl">Products</h1>
          <p className="mt-1 text-muted">{products.length} curated Bengal posters in active catalogue · <span className="text-amber-700 font-medium">{products.filter(p => p.status === 'live' && p.stock <= LOW_STOCK_THRESHOLD).length} low stock</span></p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({})}><Plus size={17} /> Add poster</button>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
        <input
          className="field pl-10"
          placeholder="Search posters by title, Bengali name, SKU..."
          aria-label="Search posters"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="card mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper text-xs text-muted">
            <tr>{['Poster', 'Collection', 'Pricing', 'Inventory', 'Status', ''].map((h) => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-line/70">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-14 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-terracotta-tint text-[10px] text-terracotta-dark shadow-xs border border-line">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        'No img'
                      )}
                    </span>
                    <div>
                      <p className="font-semibold text-ink leading-tight">{p.title}</p>
                      {p.bengaliTitle && (
                        <p className="font-bangla text-xs text-terracotta mt-0.5">{p.bengaliTitle}</p>
                      )}
                      <p className="text-[10px] font-mono text-muted mt-0.5">{p.sku || `/product/${p.slug}`}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted text-xs font-medium">{p.collection}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">₹{p.price.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-muted">A4 base · A5: ₹59 · A3: ₹149</p>
                </td>
                <td className={`px-4 py-3 ${p.stock <= LOW_STOCK_THRESHOLD && p.status === 'live' ? 'font-semibold text-amber-700' : ''} ${p.stock <= 10 && p.status === 'live' ? '!text-danger' : ''}`}>
                  <div className="flex items-center gap-1.5">
                    {p.stock <= LOW_STOCK_THRESHOLD && p.status === 'live' && (
                      <AlertTriangle size={13} className={p.stock <= 10 ? 'text-danger' : 'text-amber-500'} />
                    )}
                    <p className="font-medium">{p.stock} in stock</p>
                  </div>
                  {p.sold && <p className="text-[10px] text-muted">{p.sold} orders fulfilled</p>}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button className="rounded p-2 hover:bg-sand" aria-label={`Edit ${p.title}`} onClick={() => setModal(p)}><Pencil size={16} /></button>
                    <button className="rounded p-2 text-danger hover:bg-sand" aria-label={`Delete ${p.title}`} onClick={() => remove(p)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">No posters match "{q}".</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && <ProductModal product={modal.id ? modal : null} onSave={save} onClose={() => setModal(null)} />}
    </div>
  );
}
