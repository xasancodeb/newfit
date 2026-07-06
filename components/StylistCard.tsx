import Link from "next/link";
import { Stylist } from "@/lib/types";
import { formatMoney } from "@/lib/data";
import Motif from "./Motif";
import Grain from "./Grain";

/** Editorial directory tile: palette-study banner, serif name, small-caps meta. */
export default function StylistCard({ stylist }: { stylist: Stylist }) {
  const look = stylist.looks[0];

  return (
    <Link
      href={`/stylists/${stylist.id}`}
      className="group block border border-line bg-white transition-colors duration-300 hover:border-ink"
    >
      <div className="relative h-44 overflow-hidden" style={{ backgroundColor: stylist.gradient[1] }}>
        <Grain />
        <span className="absolute inset-0 text-bone/90" aria-hidden="true">
          <Motif
            name={look.motif}
            className="absolute left-1/2 top-1/2 h-[68%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-105"
            strokeWidth={1}
          />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex h-2">
          {look.palette.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {stylist.topRated && (
            <span className="bg-bone px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink">
              Top rated
            </span>
          )}
          {stylist.risingStar && (
            <span className="bg-bone px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-rust">
              Rising
            </span>
          )}
          {stylist.instantBook && (
            <span className="border border-bone/50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-bone">
              Instant book
            </span>
          )}
        </div>
        <span className="absolute bottom-4 right-4 mb-2 font-display text-sm text-bone/90">
          ★ {stylist.rating.toFixed(2)}
        </span>
      </div>

      <div className="px-5 pb-5 pt-4">
        <h3 className="font-display text-[22px] font-normal leading-tight text-ink underline-offset-4 group-hover:underline group-hover:decoration-line">
          {stylist.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-mute">{stylist.tagline}</p>
        <p className="meta mt-3">
          {stylist.neighborhood}, {stylist.city}
          {stylist.virtual && " · Virtual"}
        </p>
        <p className="meta mt-1.5 normal-case tracking-normal text-mute">
          {stylist.specialties.join(" / ")}
        </p>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <p className="text-sm text-ink">
            From <span className="font-display text-lg">{formatMoney(stylist.startingPrice)}</span>
          </p>
          <p className="meta">
            {stylist.reviewCount} reviews · Next {stylist.nextAvailable}
          </p>
        </div>
      </div>
    </Link>
  );
}
