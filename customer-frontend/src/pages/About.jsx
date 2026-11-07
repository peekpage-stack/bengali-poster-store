import { Link } from 'react-router-dom';
import { Newsletter, PageHeader } from '../components/ui.jsx';

const VALUES = [
  ['Restore, never reinvent', 'Every print starts from a period lithograph, manuscript or photograph. We clean and colour-match; we do not redraw.'],
  ['Print like an archive', 'Cotton rag, pigment inks and slow curing, so a poster still looks right a century from now.'],
  ['Pay the makers fairly', 'Our printers, framers and illustrators in Calcutta are paid above local rates and credited on every release.'],
];

export default function About() {
  return (
    <>
      <PageHeader title="Our story" bn="আমাদের কথা" subtitle="PeekPage began in a North Kolkata printing lane, with a simple belief: Bengali design deserves a place on every wall." />

      <section className="page-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl md:text-5xl">From College Street to your living room</h2>
          <div className="mt-5 max-w-prose space-y-4 font-serif text-xl leading-relaxed text-muted">
            <p>Calcutta's walls have always spoken: cinema hoardings, Pujo banners, handbills for poetry readings. Most of that visual memory was never archived.</p>
            <p>We collect the surviving pieces, restore them with the original printers' families where possible, and release them in small numbered editions. Each one ships with a certificate of provenance.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start">
          {[['2019', 'Founded in Shobhabazar'], ['148', 'Artworks in the catalogue'], ['45,000+', 'Collectors across India'], ['100 yrs', 'Archival print life']].map(([n, l]) => (
            <div key={l} className="card p-6"><p className="font-serif text-4xl text-terracotta">{n}</p><p className="mt-1 text-sm text-muted">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="page-x section">
          <h2 className="text-4xl md:text-5xl">What we stand for</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {VALUES.map(([t, d]) => (<div key={t} className="card p-6"><h3 className="text-2xl">{t}</h3><p className="mt-2 text-muted">{d}</p></div>))}
          </div>
        </div>
      </section>

      <section className="page-x section text-center">
        <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl">Ready to start your wall?</h2>
        <div className="mt-6 flex justify-center gap-3"><Link to="/shop" className="btn btn-primary">Shop posters</Link><Link to="/contact" className="btn btn-outline">Talk to the studio</Link></div>
      </section>
      <Newsletter />
    </>
  );
}
