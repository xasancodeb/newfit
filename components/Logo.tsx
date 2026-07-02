import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="NewFit home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-clay text-lg font-bold text-white shadow-card transition-transform group-hover:rotate-6">
        N
      </span>
      <span className={`font-display text-2xl font-semibold tracking-tight ${light ? "text-paper" : "text-ink"}`}>
        New<span className="text-gold">Fit</span>
      </span>
    </Link>
  );
}
