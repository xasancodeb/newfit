import { Look } from "@/lib/types";

/**
 * A portfolio "look" rendered as an art-directed moodboard tile:
 * color story swatches, vibe line and tags. Fully self contained,
 * no external images, always renders perfectly.
 */
export default function LookCard({ look, compact = false }: { look: Look; compact?: boolean }) {
  return (
    <div className="card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={`relative flex ${compact ? "h-28" : "h-40"} w-full`}>
        {look.palette.map((color, i) => (
          <div
            key={i}
            className="h-full flex-1 transition-all duration-500 group-hover:first:flex-[1.6]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-card backdrop-blur">
          {look.emoji}
        </span>
      </div>
      <div className={compact ? "p-4" : "p-5"}>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{look.title}</h3>
        <p className="mt-0.5 text-sm italic text-ink-mute">{look.vibe}</p>
        {!compact && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {look.tags.map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
