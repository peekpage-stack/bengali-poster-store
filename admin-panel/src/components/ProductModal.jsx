import { useEffect, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

const COLLECTIONS = ['Bengali Cinema', 'Urban Heritage', 'Tagore Literary', 'Folk & Festival', 'Coffee House Adda'];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// One image upload + price/stock, as per the project plan.
export default function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || { title: '', collection: COLLECTIONS[0], price: '', stock: '', status: 'draft', image: null });
  const [preview, setPreview] = useState(product?.image || null);
  const fileRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, file }));
    setPreview(URL.createObjectURL(file));
  };
  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, slug: slugify(form.title), price: Number(form.price), stock: Number(form.stock), image: preview, sold: form.sold ?? 0 });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={product ? 'Edit poster' : 'Add poster'}>
      <div className="absolute inset-0 animate-fadeIn bg-ink/50" onClick={onClose} />
      <form onSubmit={submit} className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-linen p-6 shadow-float sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl">{product ? 'Edit poster' : 'Add a new poster'}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><X size={22} /></button>
        </div>

        <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
          <div>
            <span className="label">Poster image</span>
            <button type="button" onClick={() => fileRef.current?.click()} className="relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-lg border-2 border-dashed border-line bg-white text-center text-muted hover:border-terracotta">
              {preview ? <img src={preview} alt="Poster preview" className="h-full w-full object-cover" /> : (
                <span className="px-3 text-xs"><ImagePlus className="mx-auto mb-2" size={26} />Click to upload one image<br />JPG or PNG, up to 20 MB</span>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="sr-only" onChange={pick} aria-label="Upload poster image" />
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="label" htmlFor="title">Poster title</label><input id="title" required className="field" value={form.title} onChange={set('title')} /></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="collection">Collection</label>
              <select id="collection" className="field" value={form.collection} onChange={set('collection')}>{COLLECTIONS.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label" htmlFor="price">Price (₹)</label><input id="price" type="number" min="0" required className="field" value={form.price} onChange={set('price')} /></div>
            <div><label className="label" htmlFor="stock">Stock</label><input id="stock" type="number" min="0" required className="field" value={form.stock} onChange={set('stock')} /></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="status">Status</label>
              <select id="status" className="field" value={form.status} onChange={set('status')}><option value="draft">Draft</option><option value="live">Live</option><option value="archived">Archived</option></select></div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary">{product ? 'Save changes' : 'Add poster'}</button>
        </div>
      </form>
    </div>
  );
}
