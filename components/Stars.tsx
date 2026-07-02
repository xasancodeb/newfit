export default function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gold" aria-hidden="true">
        <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
      </svg>
      <span className="text-sm font-semibold text-ink">{rating.toFixed(2)}</span>
    </span>
  );
}
