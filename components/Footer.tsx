import Link from "next/link";
import Logo from "./Logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "For clients",
    links: [
      { label: "Find a stylist", href: "/stylists" },
      { label: "How it works", href: "/how-it-works" },
      { label: "My bookings", href: "/dashboard" },
      { label: "Gift NewFit", href: "/how-it-works" },
    ],
  },
  {
    title: "For stylists",
    links: [
      { label: "Become a stylist", href: "/become-a-stylist" },
      { label: "Earnings calculator", href: "/become-a-stylist#earnings" },
      { label: "Stylist standards", href: "/become-a-stylist#standards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NewFit", href: "/how-it-works" },
      { label: "Trust and safety", href: "/how-it-works#guarantee" },
      { label: "Careers", href: "/how-it-works" },
      { label: "Press", href: "/how-it-works" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Your personal stylist, on demand. Book vetted style professionals for wardrobe
            makeovers, event looks, personal shopping and more, in person or virtual.
          </p>
          <div className="mt-6 flex gap-3">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <span
                key={s}
                className="cursor-pointer rounded-full border border-paper/20 px-4 py-1.5 text-xs font-medium text-paper/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-paper/70 transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/40 sm:flex-row">
          <p>© 2026 NewFit Inc. All rights reserved.</p>
          <p>Made with taste in New York, Miami, LA and London.</p>
        </div>
      </div>
    </footer>
  );
}
