import { MotifName } from "@/lib/types";

/**
 * Thin-stroke garment line drawings used in place of photography.
 * Drawn on a 48x48 grid, inherit currentColor, scale cleanly.
 */
const PATHS: Record<MotifName, React.ReactNode> = {
  hanger: (
    <>
      <path d="M24 16v-2.6c0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7-1.2 2.7-2.7S28.2 5.3 26.7 5.3h-2.2c-1.6 0-2.9 1.3-2.9 2.9" />
      <path d="M24 16 5.5 30.5c-.8.6-.3 1.9.7 1.9h35.6c1 0 1.5-1.3.7-1.9L24 16z" />
    </>
  ),
  blazer: (
    <>
      <path d="M18 7.5 24 11l6-3.5 6.5 4.5-2.5 7-3.5-2V42h-13V17l-3.5 2-2.5-7L18 7.5z" />
      <path d="M24 11l-4.5 9L24 36l4.5-16L24 11z" />
      <path d="M20.5 42v-5M27.5 42v-5" opacity="0.5" />
    </>
  ),
  dress: (
    <>
      <path d="M19 6.5c1.6 1.5 3.1 2.2 5 2.2s3.4-.7 5-2.2" />
      <path d="M19 6.5 20.5 15 14 40.5c3.2 1.7 6.8 2.6 10 2.6s6.8-.9 10-2.6L27.5 15 29 6.5" />
      <path d="M20.5 15h7" opacity="0.5" />
    </>
  ),
  coat: (
    <>
      <path d="M17.5 7.5 24 10.5l6.5-3 5.5 4-2 6.5-3-1.5V43H15V16.5l-3 1.5-2-6.5 5.5-4z" />
      <path d="M20.5 11 24 17l3.5-6" />
      <path d="M24 17v26" opacity="0.55" />
      <path d="M15 30h4.5M28.5 30H33" opacity="0.4" />
    </>
  ),
  trousers: (
    <>
      <path d="M17 6.5h14l2.5 35.5h-6.5L24 20.5 21 42h-6.5L17 6.5z" />
      <path d="M17 11h14" opacity="0.5" />
    </>
  ),
  shoe: (
    <>
      <path d="M9 40.5c0-7 3-11.5 3-18.5 0-1.8 1.2-3 2.8-3 4 0 6.2 5.5 10.2 8.6 5.4 4.2 13.5 2.6 13.5 8.4v4.5H9z" />
      <path d="M9 36.5h29.5" opacity="0.5" />
      <path d="M14 40.5v-6" opacity="0.5" />
    </>
  ),
  bag: (
    <>
      <rect x="12" y="18" width="24" height="23" />
      <path d="M18 18v-4.5a6 6 0 0 1 12 0V18" />
      <path d="M12 25h24" opacity="0.5" />
    </>
  ),
  shirt: (
    <>
      <path d="M17 8l7 3.5L31 8l8 5.5-3.5 6-3.5-1.8V42h-16V17.7L12.5 19.5 9 13.5 17 8z" />
      <path d="M21 8.8c.9 1.2 1.8 1.8 3 1.8s2.1-.6 3-1.8" opacity="0.5" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="24" cy="19" rx="10.5" ry="14" />
      <ellipse cx="24" cy="19" rx="7" ry="10.5" opacity="0.4" />
      <path d="M24 33v9M17 42h14" />
    </>
  ),
  scissors: (
    <>
      <circle cx="13.5" cy="13.5" r="4.5" />
      <circle cx="13.5" cy="34.5" r="4.5" />
      <path d="M17.5 16.5 39 37M17.5 31.5 39 11" />
    </>
  ),
  swatch: (
    <>
      <rect x="9" y="14" width="11" height="27" transform="rotate(-14 14.5 27.5)" />
      <rect x="19" y="11" width="11" height="29" />
      <rect x="28" y="14" width="11" height="27" transform="rotate(14 33.5 27.5)" />
    </>
  ),
};

export default function Motif({
  name,
  className = "",
  strokeWidth = 1.3,
}: {
  name: MotifName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
