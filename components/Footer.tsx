import Link from "next/link";
import Logo from "./Logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Clients",
    links: [
      { label: "Find a stylist", href: "/stylists" },
      { label: "How it works", href: "/how-it-works" },
      { label: "My bookings", href: "/dashboard" },
    ],
  },
  {
    title: "Stylists",
    links: [
      { label: "Apply to join", href: "/become-a-stylist" },
      { label: "Earnings", href: "/become-a-stylist#earnings" },
      { label: "Standards", href: "/become-a-stylist#standards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/how-it-works" },
      { label: "Trust and safety", href: "/how-it-works#guarantee" },
      { label: "Careers", href: "/how-it-works" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-28 bg-ink text-bone">
      <div className="container-site py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs font-display text-xl font-light leading-relaxed text-bone/80">
              Your personal stylist, on demand. In person or on video, from $70.
            </p>
            <div className="mt-8 flex gap-6">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <span
                  key={s}
                  className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/50 transition-colors hover:text-bone"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bone/40">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-bone/75 transition-colors hover:text-bone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-bone/15 pt-6 text-[11px] uppercase tracking-[0.14em] text-bone/40 sm:flex-row">
          <p>© 2026 NewFit Inc.</p>
          <p>New York · Miami · Los Angeles · London</p>
        </div>
      </div>
    </footer>
  );
}
