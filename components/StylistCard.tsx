import Link from "next/link";
import { Stylist } from "@/lib/types";
import { formatMoney } from "@/lib/data";
import Avatar from "./Avatar";
import Stars from "./Stars";

export default function StylistCard({ stylist }: { stylist: Stylist }) {
  return (
    <Link
      href={`/stylists/${stylist.id}`}
      className="card group block overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      {/* Signature color banner built from the stylist's look palettes */}
      <div className="relative h-24">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(120deg, ${stylist.gradient[0]}, ${stylist.gradient[1]})` }}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-2.5">
          {stylist.looks[0].palette.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="absolute left-5 top-4 flex gap-2">
          {stylist.topRated && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark shadow-sm">
              ★ Top Rated
            </span>
          )}
          {stylist.risingStar && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-clay shadow-sm">
              ↑ Rising Star
            </span>
          )}
          {stylist.instantBook && (
            <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-paper shadow-sm backdrop-blur">
              ⚡ Instant Book
            </span>
          )}
        </div>
      </div>

      <div className="relative px-5 pb-5">
        <div className="-mt-8 mb-3 flex items-end justify-between">
          <Avatar name={stylist.name} gradient={stylist.gradient} size="lg" className="ring-4 ring-white" />
          <Stars rating={stylist.rating} className="mb-1" />
        </div>

        <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-gold-dark">
          {stylist.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-ink-mute">{stylist.tagline}</p>

        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink-mute">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18s6-5.1 6-9.5A6 6 0 004 8.5C4 12.9 10 18 10 18zm0-7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
          </svg>
          {stylist.neighborhood}, {stylist.city}
          {stylist.virtual && <span className="chip ml-1 !py-0.5">Virtual available</span>}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {stylist.specialties.slice(0, 3).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4">
          <div>
            <p className="text-xs text-ink-mute">
              {stylist.reviewCount} reviews · {stylist.bookings.toLocaleString()} bookings
            </p>
            <p className="mt-0.5 text-sm font-semibold text-ink">
              From {formatMoney(stylist.startingPrice)}
            </p>
          </div>
          <span className="rounded-full bg-paper-warm px-3 py-1.5 text-xs font-semibold text-ink-soft">
            Next: {stylist.nextAvailable}
          </span>
        </div>
      </div>
    </Link>
  );
}
