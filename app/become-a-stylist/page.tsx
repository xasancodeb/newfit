import type { Metadata } from "next";
import { STYLIST_KEEP_RATE } from "@/lib/data";
import EarningsCalculator from "./EarningsCalculator";
import ApplicationForm from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Become a stylist",
  description:
    "Build a styling business on NewFit. Set your own prices, keep 85% of every booking and let us handle clients, payments and scheduling.",
};

export default function BecomeAStylistPage() {
  const keepPct = Math.round(STYLIST_KEEP_RATE * 100);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-plum/30 blur-3xl" />
        <div className="container-site relative py-20 text-center">
          <p className="eyebrow !text-gold-light">For stylists</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Your taste is a business. We built the storefront.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-paper/70">
            NewFit brings you clients who are ready to book, handles payments and scheduling,
            and showcases your work the way it deserves. You keep {keepPct}% of every booking.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { stat: `${keepPct}%`, label: "You keep, on every single booking" },
              { stat: "$4,200", label: "Average monthly earnings, top quartile" },
              { stat: "0", label: "Marketing dollars you need to spend" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
                <p className="font-display text-4xl font-semibold text-gold-light">{s.stat}</p>
                <p className="mt-1 text-sm text-paper/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow">Why stylists choose NewFit</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Everything but the styling, handled
            </h2>
            <div className="mt-8 space-y-6">
              {[
                { emoji: "📣", title: "Clients come to you", body: "Our marketing engine and search put your portfolio in front of people actively looking to book. No more chasing DMs." },
                { emoji: "💳", title: "Payments and escrow", body: "Clients pay upfront. Funds are held safely and land in your account 24 hours after each session. No invoices, no awkward money talk." },
                { emoji: "🗓️", title: "Your calendar, your rules", body: "Set your prices, your hours, your travel radius and your services. Instant book or request approval, you decide." },
                { emoji: "🛡️", title: "Insurance included", body: "Every in person session is covered by our liability policy at no cost to you." },
                { emoji: "📈", title: "Grow with data", body: "See what services convert, when demand spikes in your city and how your profile compares. Raise your prices with confidence." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper-warm text-2xl">
                    {f.emoji}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mute">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="earnings" className="lg:sticky lg:top-24">
            <EarningsCalculator />
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-16" id="standards">
        <div className="container-site">
          <div className="text-center">
            <p className="eyebrow">The bar is high on purpose</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              How we vet, in three rounds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-mute">
              Clients trust NewFit because fewer than 8% of applicants make it in. That trust is
              why our stylists stay fully booked.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: "Round 1", title: "Portfolio review", body: "Show us your range: real clients, real transformations, your point of view. Instagram links welcome." },
              { n: "Round 2", title: "Live styling audition", body: "A 45 minute video session where you style a mystery brief in real time with one of our lead stylists." },
              { n: "Round 3", title: "Verification and onboarding", body: "ID check, background screen and a launch session where we build your profile to convert." },
            ].map((r) => (
              <div key={r.n} className="card p-7">
                <p className="eyebrow">{r.n}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-mute">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16" id="apply">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Apply in two minutes
            </h2>
            <p className="mt-3 text-ink-mute">
              We review every application personally and reply within 3 business days.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
