// Printed-paper placeholder. Pass a real `product.image` and it renders the photo instead.
export default function PosterArt({ product, frame = 'none', className = '' }) {
  const [a, b] = product.tone || ['#3a302a', '#c2652a'];
  const frameClass =
    frame === 'teak' ? 'border-[10px] border-[#6b4426]' : frame === 'oak' ? 'border-[10px] border-[#1f1b18]' : '';

  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden bg-paper ${frameClass} ${className}`}>
      {product.image ? (
        <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={product.title}
          className="flex h-full w-full flex-col items-center justify-between p-[9%] text-center"
          style={{ background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)` }}
        >
          <span className="block h-px w-1/3 bg-white/50" />
          <span className="font-bangla text-[clamp(1.4rem,5.5vw,2.6rem)] font-semibold leading-tight text-white drop-shadow-sm">
            {product.bn}
          </span>
          <span className="font-serif text-[clamp(0.6rem,1.6vw,0.8rem)] italic tracking-wide text-white/80">
            {product.title}
          </span>
        </div>
      )}
      <span className="pointer-events-none absolute inset-[5%] border border-white/25" />
    </div>
  );
}
