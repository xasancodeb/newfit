"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { STYLISTS, CATEGORIES, CITIES } from "@/lib/data";
import StylistCard from "@/components/StylistCard";

type SortKey = "recommended" | "rating" | "price-low" | "price-high" | "experience";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Highest rated" },
  { key: "price-low", label: "Price: low to high" },
  { key: "price-high", label: "Price: high to low" },
  { key: "experience", label: "Most experienced" },
];

export default function BrowseClient() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") ?? "All");
  const [city, setCity] = useState("All cities");
  const [virtualOnly, setVirtualOnly] = useState(false);
  const [instantOnly, setInstantOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");

  const results = useMemo(() => {
    let list = [...STYLISTS];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.specialties.some((sp) => sp.toLowerCase().includes(q)) ||
          s.looks.some((l) => l.tags.some((t) => t.includes(q)))
      );
    }
    if (category !== "All") list = list.filter((s) => s.specialties.includes(category));
    if (city !== "All cities") list = list.filter((s) => s.city === city);
    if (virtualOnly) list = list.filter((s) => s.virtual);
    if (instantOnly) list = list.filter((s) => s.instantBook);

    switch (sort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        list.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-high":
        list.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "experience":
        list.sort((a, b) => b.yearsExperience - a.yearsExperience);
        break;
      default:
        list.sort((a, b) => b.rating * Math.log(b.bookings + 1) - a.rating * Math.log(a.bookings + 1));
    }
    return list;
  }, [query, category, city, virtualOnly, instantOnly, sort]);

  return (
    <div className="container-site py-12">
      <div className="max-w-2xl">
        <p className="eyebrow">Find a stylist</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {STYLISTS.length} exceptional stylists, one of them is yours
        </h1>
        <p className="mt-3 text-ink-mute">
          Every profile is a real portfolio: looks, reviews, prices and availability.
        </p>
      </div>

      <div className="sticky top-16 z-40 -mx-5 mt-8 border-y border-ink/5 bg-paper/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M8 3a5 5 0 103.1 8.9l4 4a1 1 0 001.4-1.4l-4-4A5 5 0 008 3zM5 8a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, specialty, city or vibe"
              className="w-full rounded-full border border-ink/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-ink-mute/70 focus:border-gold"
              aria-label="Search stylists"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-gold"
            aria-label="Filter by specialty"
          >
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-gold"
            aria-label="Filter by city"
          >
            <option>All cities</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-gold"
            aria-label="Sort results"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setVirtualOnly(!virtualOnly)}
            aria-pressed={virtualOnly}
            className={`rounded-full border px-4 py-3 text-sm font-medium transition-colors ${
              virtualOnly ? "border-gold bg-gold/10 text-gold-dark" : "border-ink/10 bg-white text-ink-mute hover:border-ink/25"
            }`}
          >
            💻 Virtual
          </button>
          <button
            onClick={() => setInstantOnly(!instantOnly)}
            aria-pressed={instantOnly}
            className={`rounded-full border px-4 py-3 text-sm font-medium transition-colors ${
              instantOnly ? "border-gold bg-gold/10 text-gold-dark" : "border-ink/10 bg-white text-ink-mute hover:border-ink/25"
            }`}
          >
            ⚡ Instant book
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-mute">
        {results.length} {results.length === 1 ? "stylist" : "stylists"}
        {category !== "All" && <> in <span className="font-semibold text-ink">{category}</span></>}
        {city !== "All cities" && <> around <span className="font-semibold text-ink">{city}</span></>}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((s) => (
            <StylistCard key={s.id} stylist={s} />
          ))}
        </div>
      ) : (
        <div className="card mt-6 flex flex-col items-center gap-3 p-16 text-center">
          <span className="text-4xl">🪞</span>
          <h2 className="font-display text-2xl font-semibold text-ink">No matches, yet</h2>
          <p className="max-w-sm text-sm text-ink-mute">
            Try clearing a filter or two. New stylists join NewFit every week, so your perfect
            match may be onboarding right now.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
              setCity("All cities");
              setVirtualOnly(false);
              setInstantOnly(false);
            }}
            className="btn-primary mt-2"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
