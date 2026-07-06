"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/stylists", label: "Stylists" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/become-a-stylist", label: "For stylists" },
  { href: "/dashboard", label: "My bookings" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md">
      <div className="container-site flex h-[60px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-ink underline decoration-rust underline-offset-8"
                  : "text-mute hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/stylists" className="btn-dark !px-6 !py-3">
            Book a stylist
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bone px-5 py-6 md:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-display text-2xl text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/stylists" onClick={() => setOpen(false)} className="btn-dark mt-6 w-full">
            Book a stylist
          </Link>
        </nav>
      )}
    </header>
  );
}
