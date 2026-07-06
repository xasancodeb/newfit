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

  const selectCls =
    "border border-line bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink outline-none transition-colors focus:border-ink";

  return (
    <div className="container-site py-14">
      <div className="max-w-3xl border-b border-line pb-10">
        <p className="label">The directory</p>
        <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-ink sm:text-6xl">
          {STYLISTS.length} stylists. <em>One is yours.</em>
        </h1>
        <p className="mt-4 text-mute">
          Every profile is a working portfolio: looks, reviews, prices, availability.
        </p>
      </div>

      <div className="sticky top-[60px] z-40 -mx-5 border-b border-line bg-bone/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, specialty, city, vibe"
            className="field min-w-[220px] flex-1 !py-3 text-sm normal-case"
            aria-label="Search stylists"
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls} aria-label="Filter by specialty">
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>

          <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls} aria-label="Filter by city">
            <option>All cities</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls} aria-label="Sort results">
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setVirtualOnly(!virtualOnly)}
            aria-pressed={virtualOnly}
            className={`border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
              virtualOnly ? "border-ink bg-ink text-bone" : "border-line bg-white text-mute hover:border-ink hover:text-ink"
            }`}
          >
            Virtual
          </button>
          <button
            onClick={() => setInstantOnly(!instantOnly)}
            aria-pressed={instantOnly}
            className={`border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
              instantOnly ? "border-ink bg-ink text-bone" : "border-line bg-white text-mute hover:border-ink hover:text-ink"
            }`}
          >
            Instant book
          </button>
        </div>
      </div>

      <p className="meta mt-8">
        {results.length} {results.length === 1 ? "stylist" : "stylists"}
        {category !== "All" && <> / {category}</>}
        {city !== "All cities" && <> / {city}</>}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((s) => (
            <StylistCard key={s.id} stylist={s} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-white px-8 py-20 text-center">
          <h2 className="font-display text-3xl font-light text-ink">No matches, yet</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-mute">
            Try clearing a filter or two. New stylists join NewFit every week, so your match may
            be onboarding right now.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
              setCity("All cities");
              setVirtualOnly(false);
              setInstantOnly(false);
            }}
            className="btn-outline mt-8"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
