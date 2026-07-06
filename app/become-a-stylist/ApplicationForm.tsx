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
      <div className="mt-12 animate-fade-up border border-ink bg-white px-8 py-16 text-center">
        <p className="label !text-rust">Received</p>
        <h3 className="mt-4 font-display text-4xl font-light text-ink">
          Thank you. <em>Truly.</em>
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mute">
          Our stylist team reviews every application personally and will reply within 3 business
          days. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-12 space-y-7 border border-line bg-white p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="meta">Full name</label>
          <input id="name" required className="field mt-2.5" placeholder="Jordan Rivers" />
        </div>
        <div>
          <label htmlFor="email" className="meta">Email</label>
          <input id="email" type="email" required className="field mt-2.5" placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="meta">Primary city</label>
          <select id="city" required className="field mt-2.5" defaultValue="">
            <option value="" disabled>Choose a city</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Somewhere else (tell us below)</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience" className="meta">Years of experience</label>
          <select id="experience" required className="field mt-2.5" defaultValue="">
            <option value="" disabled>Select</option>
            <option>Under 2 years</option>
            <option>2 to 5 years</option>
            <option>5 to 10 years</option>
            <option>10+ years</option>
          </select>
        </div>
      </div>

      <div>
        <span className="meta">Your specialties</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggleSpecialty(c.name)}
              aria-pressed={specialties.includes(c.name)}
              className={`border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                specialties.includes(c.name)
                  ? "border-ink bg-ink text-bone"
                  : "border-line bg-white text-mute hover:border-ink hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="portfolio" className="meta">
          Portfolio link <span className="normal-case tracking-normal">(Instagram, site or folder)</span>
        </label>
        <input id="portfolio" type="url" required className="field mt-2.5" placeholder="https://instagram.com/yourwork" />
      </div>

      <div>
        <label htmlFor="story" className="meta">
          Why styling? <span className="normal-case tracking-normal">(2 or 3 sentences is perfect)</span>
        </label>
        <textarea
          id="story"
          rows={4}
          required
          className="field mt-2.5"
          placeholder="Tell us about a transformation you are proud of..."
        />
      </div>

      <button type="submit" className="btn-dark w-full">Submit application</button>
      <p className="text-center text-[11px] text-mute">
        By applying you agree to our stylist terms. We never share your information.
      </p>
    </form>
  );
}
