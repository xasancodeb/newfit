import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-baseline" aria-label="NewFit home">
      <span
        className={`font-display text-[22px] font-medium tracking-tight ${
          light ? "text-bone" : "text-ink"
        }`}
      >
        NewFit
      </span>
      <span className="ml-0.5 inline-block h-1.5 w-1.5 bg-rust transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
