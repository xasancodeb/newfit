export default function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-3.5 w-3.5 self-center text-ink"
        aria-hidden="true"
      >
        <path d="M10 2.5l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 7.8l5-.7L10 2.5z" strokeLinejoin="round" />
      </svg>
      <span className="text-sm font-semibold tracking-tight text-ink">{rating.toFixed(2)}</span>
    </span>
  );
}
