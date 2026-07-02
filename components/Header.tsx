"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/stylists", label: "Find a stylist" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/become-a-stylist", label: "Become a stylist" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/85 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-ink/5 text-ink"
                  : "text-ink-mute hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-mute transition-colors hover:bg-ink/5 hover:text-ink"
          >
            My bookings
          </Link>
          <Link href="/stylists" className="btn-primary !px-5 !py-2.5">
            Book now
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/5 bg-paper px-5 py-4 md:hidden" aria-label="Mobile">
          {[...NAV, { href: "/dashboard", label: "My bookings" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-ink/5"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/stylists" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            Book now
          </Link>
        </nav>
      )}
    </header>
  );
}
