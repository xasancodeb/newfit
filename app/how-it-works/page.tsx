import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How NewFit works: browse vetted stylist portfolios, book in under a minute and get styled in person or virtually, backed by the NewFit Guarantee.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="container-site py-16 text-center">
        <p className="eyebrow">How NewFit works</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
          Great style, delivered like a great ride
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-mute">
          You would not walk to a random garage to find a driver. Why walk into a random store
          hoping for style advice? NewFit brings the professional to you, on your terms and your
          budget.
        </p>
      </section>

      <section className="container-site pb-16">
        <div className="space-y-6">
          {[
            {
              n: "1",
              title: "Tell us the moment",
              body: "A wedding, a promotion, a fresh start, a closet that stopped making sense. Pick from six service types or just browse. Filters cover city, budget, specialty, virtual and instant booking.",
              detail: "Average time to find a match: 4 minutes",
              emoji: "🧭",
            },
            {
              n: "2",
              title: "Judge them by their work",
              body: "Every stylist profile is a living portfolio: signature looks with full color stories, verified reviews from real clients, transparent pricing and true availability. What you see is exactly what you book.",
              detail: "Fewer than 8% of stylist applicants are accepted",
              emoji: "🖼️",
            },
            {
              n: "3",
              title: "Book and pay in one place",
              body: "Choose a service, a time and a place: your home, their studio or a video call. Pay securely through NewFit. Your money is held in escrow and released to the stylist only after your session happens.",
              detail: "Free cancellation up to 24 hours before",
              emoji: "🔐",
            },
            {
              n: "4",
              title: "Get styled, keep the results",
              body: "Your stylist arrives with a plan built from your notes. After the session you keep a digital lookbook, shopping lists and outfit formulas, so the transformation outlives the appointment.",
              detail: "93% of clients rebook within 6 months",
              emoji: "✨",
            },
          ].map((step) => (
            <div key={step.n} className="card flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-gold/15 to-clay/15 text-4xl">
                {step.emoji}
              </div>
              <div className="flex-1">
                <p className="eyebrow">Step {step.n}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-mute">{step.body}</p>
              </div>
              <p className="shrink-0 rounded-2xl bg-paper-warm px-5 py-4 text-sm font-semibold text-ink-soft md:max-w-[200px] md:text-center">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-paper" id="guarantee">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-gold-light">Trust and safety</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              The NewFit Guarantee
            </h2>
            <p className="mt-4 leading-relaxed text-paper/70">
              Style is personal, so trust has to be structural. Every stylist passes a portfolio
              review, a live styling audition and identity verification before they can accept a
              single booking. Payments sit in escrow until your session is complete. And if your
              first session is not a hit, we rebook you with a different stylist free of charge,
              or refund you in full. Your choice, no forms, no fight.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { emoji: "🪪", title: "ID verified", body: "Every stylist, every time" },
              { emoji: "🎭", title: "Live auditions", body: "Skills proven before onboarding" },
              { emoji: "🏦", title: "Escrow payments", body: "Released only after your session" },
              { emoji: "🔁", title: "First session promise", body: "Free rebooking or full refund" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
                <span className="text-2xl">{f.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-paper/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="text-center">
          <p className="eyebrow">Six ways in</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
            Pick your starting point
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/stylists?category=${encodeURIComponent(cat.name)}`}
              className="card group p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-ink-mute">{cat.blurb}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/stylists" className="btn-gold text-base">Start browsing stylists</Link>
        </div>
      </section>
    </>
  );
}
