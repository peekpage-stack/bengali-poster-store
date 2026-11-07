import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShieldCheck, Tag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/format';
import PosterArt from '../components/PosterArt.jsx';
import ProductCard from '../components/ProductCard.jsx';
import useFetch from '../hooks/useFetch';
import { getProducts } from '../services/catalog';
import { EmptyState, SectionHeading } from '../components/ui.jsx';

export default function Cart() {
  const { items, setQty, removeItem, toggleWish, subtotal, discount, total, promo, applyPromo, removePromo, clearCart } = useCart();
  const { data: suggestions } = useFetch(() => getProducts({ limit: 4, sort: 'rating' }));
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const apply = (e) => {
    e.preventDefault();
    setError(applyPromo(code) ? '' : 'That code is not valid. Try BENGAL10.');
    setCode('');
  };

  if (!items.length) return <EmptyState title="Your bag is empty" text="Add a poster or two and they will wait here for you." to="/shop" cta="Browse posters" />;

  return (
    <>
      <header className="page-x pb-2 pt-10">
        <h1 className="flex flex-wrap items-baseline gap-4 text-5xl md:text-6xl">Your art collection <span className="font-bangla text-2xl text-terracotta">আপনার শিল্প সংগ্রহ</span></h1>
        <p className="mt-2 text-muted">Review your selected posters before checkout.</p>
      </header>

      <section className="page-x grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <p className="font-semibold">{items.length} {items.length === 1 ? 'artwork' : 'artworks'}</p>
            <button onClick={clearCart} className="text-muted underline hover:text-danger">Empty bag</button>
          </div>
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.key} className="card flex gap-4 p-4 sm:gap-6 sm:p-5">
                <Link to={`/product/${i.slug}`} className="w-24 shrink-0 sm:w-32"><PosterArt product={i} /></Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bangla text-sm text-terracotta">{i.bn}</p>
                      <Link to={`/product/${i.slug}`} className="font-serif text-xl leading-snug hover:text-terracotta sm:text-2xl">{i.title}</Link>
                      <p className="mt-1 text-xs text-muted">Size {i.size} · {i.format === 'teak' ? 'Handcrafted teak frame' : 'Rolled in archival tube'}</p>
                    </div>
                    <p className="font-semibold">{formatINR(i.price * i.qty)}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex items-center rounded border border-line">
                      <button className="p-2" onClick={() => setQty(i.key, i.qty - 1)} aria-label="Decrease quantity"><Minus size={15} /></button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button className="p-2" onClick={() => setQty(i.key, i.qty + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
                    </div>
                    <div className="flex gap-4 text-xs text-muted">
                      <button onClick={() => { toggleWish(i.slug); removeItem(i.key); }} className="inline-flex items-center gap-1 hover:text-terracotta"><Heart size={14} /> Save to wishlist</button>
                      <button onClick={() => removeItem(i.key)} className="inline-flex items-center gap-1 hover:text-danger"><Trash2 size={14} /> Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-32">
          <h2 className="text-2xl">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            {promo && <div className="flex justify-between text-terracotta-dark"><dt className="flex items-center gap-1"><Tag size={14} /> {promo}</dt><dd>-{formatINR(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted">Insured pan-India shipping</dt><dd className="font-semibold text-terracotta">Free</dd></div>
          </dl>

          {promo ? (
            <button onClick={removePromo} className="mt-4 text-xs text-muted underline">Remove code {promo}</button>
          ) : (
            <form onSubmit={apply} className="mt-5">
              <label className="label" htmlFor="promo">Promo code</label>
              <div className="flex gap-2">
                <input id="promo" className="field uppercase" placeholder="BENGAL10" value={code} onChange={(e) => setCode(e.target.value)} />
                <button className="btn btn-outline h-11 shrink-0">Apply</button>
              </div>
              {error && <p className="mt-1.5 text-xs text-danger" role="alert">{error}</p>}
            </form>
          )}

          <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
            <span className="font-semibold">Total</span>
            <span className="font-serif text-4xl">{formatINR(total)}</span>
          </div>
          <p className="text-xs text-faint">Inclusive of all taxes.</p>
          <Link to="/checkout" className="btn btn-primary mt-5 w-full">Proceed to checkout</Link>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted underline">Continue exploring</Link>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted"><ShieldCheck size={14} /> 256-bit secure payments</p>
        </aside>
      </section>

      <section className="page-x section">
        <SectionHeading title="Complete your gallery wall" to="/shop" linkLabel="View all" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{(suggestions || []).map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>
    </>
  );
}
