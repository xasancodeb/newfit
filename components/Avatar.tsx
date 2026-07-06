interface AvatarProps {
  name: string;
  gradient: [string, string];
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
  xl: "h-28 w-28 text-4xl",
};

/** Flat typographic monogram tile. Deliberately not a photo, not a gradient. */
export default function Avatar({ name, gradient, size = "md", className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className={`flex shrink-0 items-center justify-center font-display font-normal text-bone ${sizes[size]} ${className}`}
      style={{ backgroundColor: gradient[1] }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
