"use client";

import { useState } from "react";
import { CATEGORIES, CITIES } from "@/lib/data";

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>([]);

  function toggleSpecialty(name: string) {
    setSpecialties((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  if (submitted) {
    return (
      <div className="card mt-10 flex flex-col items-center gap-3 p-14 text-center animate-fade-up">
        <span className="text-5xl">💌</span>
        <h3 className="font-display text-3xl font-semibold text-ink">Application received</h3>
        <p className="max-w-md text-ink-mute">
          Thank you for wanting to build with us. Our stylist team reviews every application
          personally and will reply within 3 business days. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card mt-10 space-y-6 p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">Full name</label>
          <input
            id="name"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
            placeholder="Jordan Rivers"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">Email</label>
          <input
            id="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="text-sm font-semibold text-ink">Primary city</label>
          <select
            id="city"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
            defaultValue=""
          >
            <option value="" disabled>Choose a city</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Somewhere else (tell us below)</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience" className="text-sm font-semibold text-ink">Years of styling experience</label>
          <select
            id="experience"
            required
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
            defaultValue=""
          >
            <option value="" disabled>Select</option>
            <option>Under 2 years</option>
            <option>2 to 5 years</option>
            <option>5 to 10 years</option>
            <option>10+ years</option>
          </select>
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-ink">Your specialties</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggleSpecialty(c.name)}
              aria-pressed={specialties.includes(c.name)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                specialties.includes(c.name)
                  ? "border-gold bg-gold/10 text-gold-dark"
                  : "border-ink/10 bg-white text-ink-mute hover:border-ink/30"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="portfolio" className="text-sm font-semibold text-ink">
          Portfolio link <span className="font-normal text-ink-mute">(Instagram, website or drive folder)</span>
        </label>
        <input
          id="portfolio"
          type="url"
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
          placeholder="https://instagram.com/yourwork"
        />
      </div>

      <div>
        <label htmlFor="story" className="text-sm font-semibold text-ink">
          Why styling? <span className="font-normal text-ink-mute">(2 or 3 sentences is perfect)</span>
        </label>
        <textarea
          id="story"
          rows={4}
          required
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
          placeholder="Tell us about a transformation you are proud of..."
        />
      </div>

      <button type="submit" className="btn-gold w-full text-base">
        Submit application
      </button>
      <p className="text-center text-xs text-ink-mute">
        By applying you agree to our stylist terms. We never share your information.
      </p>
    </form>
  );
}
