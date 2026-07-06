import type { Metadata } from "next";
import { STYLIST_KEEP_RATE } from "@/lib/data";
import Motif from "@/components/Motif";
import Grain from "@/components/Grain";
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
      <section className="relative overflow-hidden bg-ink text-bone">
        <Grain opacity={0.15} />
        <span className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 text-bone/10 lg:block" aria-hidden="true">
          <Motif name="scissors" className="h-[420px] w-[420px]" strokeWidth={0.6} />
        </span>
        <div className="container-site relative py-20 md:py-24">
          <p className="label !text-bone/50">For stylists</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
            Your taste is a business. <em>We built the storefront.</em>
          </h1>
          <p className="mt-6 max-w-xl text-bone/70">
            NewFit brings you clients who are ready to book, handles payments and scheduling, and
            showcases your work the way it deserves. You keep {keepPct}% of every booking.
          </p>
          <div className="mt-12 grid gap-px border border-bone/20 bg-bone/20 sm:grid-cols-3">
            {[
              [`${keepPct}%`, "You keep, on every single booking"],
              ["$4,200", "Average monthly earnings, top quartile"],
              ["$0", "Marketing spend required from you"],
            ].map(([stat, label]) => (
              <div key={label} className="bg-ink p-7">
                <p className="font-display text-4xl font-light text-bone">{stat}</p>
                <p className="meta mt-2 !text-bone/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="label">Why stylists choose NewFit</p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
              Everything but the styling, handled
            </h2>
            <div className="mt-10 border-t border-line">
              {[
                { title: "Clients come to you", body: "Our marketing engine and search put your portfolio in front of people actively looking to book. No more chasing DMs." },
                { title: "Payments and escrow", body: "Clients pay upfront. Funds land in your account 24 hours after each session. No invoices, no awkward money talk." },
                { title: "Your calendar, your rules", body: "Set your prices, hours, travel radius and services. Instant book or request approval, you decide." },
                { title: "Insurance included", body: "Every in person session is covered by our liability policy at no cost to you." },
                { title: "Grow with data", body: "See what converts, when demand spikes in your city and how your profile compares. Raise prices with confidence." },
              ].map((f, i) => (
                <div key={f.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-6">
                  <span className="font-display text-sm text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl font-normal text-ink">{f.title}</h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-mute">{f.body}</p>
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

      <section className="border-y border-line bg-white py-20" id="standards">
        <div className="container-site">
          <p className="label">The bar is high on purpose</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
            How we vet, in three rounds
          </h2>
          <p className="mt-4 max-w-xl text-sm text-mute">
            Clients trust NewFit because fewer than 8% of applicants make it in. That trust is why
            our stylists stay fully booked.
          </p>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              { n: "Round 1", title: "Portfolio review", body: "Show us your range: real clients, real transformations, your point of view. Instagram links welcome." },
              { n: "Round 2", title: "Live styling audition", body: "A 45 minute video session where you style a mystery brief in real time with one of our lead stylists." },
              { n: "Round 3", title: "Verification and onboarding", body: "ID check, background screen and a launch session where we build your profile to convert." },
            ].map((r) => (
              <div key={r.n} className="bg-white p-8">
                <p className="label !text-rust">{r.n}</p>
                <h3 className="mt-3 font-display text-2xl font-normal text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20" id="apply">
        <div className="mx-auto max-w-2xl">
          <p className="label text-center">Ready when you are</p>
          <h2 className="mt-4 text-center font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
            Apply in two minutes
          </h2>
          <p className="mt-4 text-center text-sm text-mute">
            We review every application personally and reply within 3 business days.
          </p>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
