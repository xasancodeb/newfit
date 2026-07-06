import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/data";
import Motif from "@/components/Motif";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How NewFit works: browse vetted stylist portfolios, book in under a minute and get styled in person or virtually, backed by the NewFit Guarantee.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="container-site border-b border-line py-16 md:py-20">
        <p className="label">How NewFit works</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink sm:text-7xl">
          Great style, delivered like a <em>great ride.</em>
        </h1>
        <p className="mt-6 max-w-xl text-mute">
          You would not walk into a random garage hoping to find a driver. Why walk into a random
          store hoping for style advice? NewFit brings the professional to you, on your terms and
          your budget.
        </p>
      </section>

      <section className="container-site">
        {[
          {
            n: "01",
            title: "Tell us the moment",
            body: "A wedding, a promotion, a fresh start, a closet that stopped making sense. Pick from six service types or just browse. Filters cover city, budget, specialty, virtual and instant booking.",
            detail: "Average time to a match: 4 minutes",
          },
          {
            n: "02",
            title: "Judge them by their work",
            body: "Every stylist profile is a living portfolio: signature looks with full color stories, verified reviews from real clients, transparent pricing and true availability. What you see is exactly what you book.",
            detail: "Fewer than 8% of applicants accepted",
          },
          {
            n: "03",
            title: "Book and pay in one place",
            body: "Choose a service, a time and a place: your home, their studio or a video call. Pay securely through NewFit. Your money is held in escrow and released to the stylist only after your session happens.",
            detail: "Free cancellation up to 24 hours before",
          },
          {
            n: "04",
            title: "Get styled, keep the results",
            body: "Your stylist arrives with a plan built from your notes. After the session you keep a digital lookbook, shopping lists and outfit formulas, so the transformation outlives the appointment.",
            detail: "93% of clients rebook within 6 months",
          },
        ].map((step) => (
          <div
            key={step.n}
            className="grid gap-6 border-b border-line py-10 md:grid-cols-[6rem_1fr_240px] md:gap-10 md:py-14"
          >
            <p className="font-display text-5xl font-light text-line md:text-6xl">{step.n}</p>
            <div>
              <h2 className="font-display text-3xl font-light text-ink">{step.title}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-mute">{step.body}</p>
            </div>
            <p className="meta self-center border-l-2 border-rust pl-4 md:justify-self-end">
              {step.detail}
            </p>
          </div>
        ))}
      </section>

      <section className="border-b border-line bg-ink py-20 text-bone" id="guarantee">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="label !text-bone/50">Trust and safety</p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl">
              The NewFit Guarantee
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-bone/70">
              Style is personal, so trust has to be structural. Every stylist passes a portfolio
              review, a live styling audition and identity verification before they can accept a
              single booking. Payments sit in escrow until your session is complete. And if your
              first session is not a hit, we rebook you with a different stylist free of charge,
              or refund you in full. Your choice, no forms, no fight.
            </p>
          </div>
          <div className="grid gap-px self-start border border-bone/20 bg-bone/20 sm:grid-cols-2">
            {[
              { title: "ID verified", body: "Every stylist, every time" },
              { title: "Live auditions", body: "Skills proven before onboarding" },
              { title: "Escrow payments", body: "Released only after your session" },
              { title: "First session promise", body: "Free rebooking or full refund" },
            ].map((f) => (
              <div key={f.title} className="bg-ink p-7">
                <h3 className="font-display text-xl font-normal">{f.title}</h3>
                <p className="meta mt-2 !text-bone/50">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <p className="label">Six ways in</p>
        <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
          Pick your starting point
        </h2>
        <div className="mt-10 border-t border-line">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/stylists?category=${encodeURIComponent(cat.name)}`}
              className="group grid grid-cols-[3rem_2.5rem_1fr_auto] items-center gap-4 border-b border-line py-6 transition-colors hover:bg-white sm:grid-cols-[4rem_3rem_1fr_1fr_auto] sm:gap-8"
            >
              <span className="font-display text-sm text-mute">{String(i + 1).padStart(2, "0")}</span>
              <Motif name={cat.motif} className="h-9 w-9 text-ink" />
              <h3 className="font-display text-2xl font-light text-ink transition-colors group-hover:text-rust sm:text-3xl">
                {cat.name}
              </h3>
              <p className="hidden text-sm text-mute sm:block">{cat.blurb}</p>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-mute transition-all group-hover:translate-x-1 group-hover:text-rust" aria-hidden="true">
                <path d="M3 12h17M14 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/stylists" className="btn-dark">Start browsing stylists</Link>
        </div>
      </section>
    </>
  );
}
