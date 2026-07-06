import { Look } from "@/lib/types";
import Motif from "./Motif";
import Grain from "./Grain";

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/**
 * A portfolio look rendered as an editorial palette study: a grained
 * color field carrying a garment line drawing, flanked by the rest of
 * the color story. No stock photos, nothing to load, nothing to break.
 */
export default function LookCard({
  look,
  index,
  compact = false,
}: {
  look: Look;
  index?: number;
  compact?: boolean;
}) {
  const field = look.palette[0];
  const rest = look.palette.slice(1);
  const fieldIsLight = luminance(field) > 0.6;
  const inkOnField = fieldIsLight
    ? [...look.palette].sort((a, b) => luminance(a) - luminance(b))[0]
    : [...look.palette].sort((a, b) => luminance(b) - luminance(a))[0];

  return (
    <div className="group border border-line bg-white transition-colors duration-300 hover:border-ink/50">
      <div className={`relative flex ${compact ? "h-36" : "h-52"}`}>
        <div className="relative flex-[3] overflow-hidden" style={{ backgroundColor: field }}>
          <Grain />
          <span className="absolute inset-0" style={{ color: inkOnField }} aria-hidden="true">
            <Motif
              name={look.motif}
              className="absolute left-1/2 top-1/2 h-[70%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-105"
              strokeWidth={1.1}
            />
          </span>
          {typeof index === "number" && (
            <span
              className="absolute left-3 top-2.5 font-display text-sm"
              style={{ color: inkOnField }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          {rest.map((c, i) => (
            <div key={i} className="relative flex-1" style={{ backgroundColor: c }}>
              <Grain opacity={0.25} />
            </div>
          ))}
        </div>
      </div>
      <div className={`border-t border-line ${compact ? "px-4 py-3.5" : "px-5 py-4"}`}>
        <h3 className="font-display text-lg font-normal leading-snug text-ink">{look.title}</h3>
        <p className="mt-0.5 font-display text-sm italic text-mute">{look.vibe}</p>
        {!compact && (
          <p className="meta mt-3">{look.tags.join(" / ")}</p>
        )}
      </div>
    </div>
  );
}
