/**
 * Subtle fabric-grain overlay that keeps flat color tiles from
 * feeling like vector mockups. Pure SVG, no assets.
 */
export default function Grain({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <filter id="nf-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#nf-grain)"
        opacity={opacity}
        style={{ mixBlendMode: "soft-light" }}
      />
    </svg>
  );
}
