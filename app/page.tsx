import Link from "next/link";
import { STYLISTS, CATEGORIES, CITIES } from "@/lib/data";
import StylistCard from "@/components/StylistCard";
import LookCard from "@/components/LookCard";
import Avatar from "@/components/Avatar";

export default function HomePage() {
  const featured = STYLISTS.filter((s) => s.topRated).slice(0, 4);
  const heroLooks = [STYLISTS[0].looks[0], STYLISTS[2].looks[0], STYLISTS[5].looks[1]];
  const totalBookings = STYLISTS.reduce((a, s) => a + s.bookings, 0);
  const totalReviews = STYLISTS.reduce((a, s) => a + s.reviewCount, 0);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-64 h-[360px] w-[360px] rounded-full bg-clay/10 blur-3xl" />

        <div className="container-site grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="eyebrow">The stylist marketplace</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Look like the best version of{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 italic text-gold-dark">you.</span>
                <svg
                  viewBox="0 0 120 16"
                  className="absolute -bottom-1 left-0 z-0 w-full text-gold/40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 12 Q 60 2 118 10 L 118 14 Q 60 8 2 15 Z" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-mute">
              Book a vetted personal stylist the way you would book a ride. Wardrobe makeovers,
              event looks, personal shopping and closet edits, in person or on video, starting
              at $70.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/stylists" className="btn-gold text-base">
                Find your stylist
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h9.6L10.3 5.7a1 1 0 111.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/how-it-works" className="btn-ghost text-base">
                See how it works
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <div>
                <p className="font-display text-3xl font-semibold text-ink">{totalBookings.toLocaleString()}+</p>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-mute">Sessions styled</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-ink">4.93</p>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-mute">Average rating</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-ink">{totalReviews.toLocaleString()}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-mute">Verified reviews</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5 pt-10">
                <div className="animate-float">
                  <LookCard look={heroLooks[0]} compact />
                </div>
                <div className="card flex items-center gap-3 p-4">
                  <Avatar name={STYLISTS[2].name} gradient={STYLISTS[2].gradient} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{STYLISTS[2].name}</p>
                    <p className="text-xs text-ink-mute">★ {STYLISTS[2].rating} · Books today</p>
                  </div>
                  <span className="ml-auto rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-bold text-sage">
                    LIVE
                  </span>
                </div>
                <div className="animate-float [animation-delay:1.5s]">
                  <LookCard look={heroLooks[2]} compact />
                </div>
              </div>
              <div className="space-y-5">
                <div className="card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Booking confirmed</p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink">Wardrobe Reset with Amara</p>
                  <p className="mt-1 text-sm text-ink-mute">Sat 10:00 AM · SoHo, NYC</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-gold to-clay" />
                  </div>
                  <p className="mt-2 text-xs text-ink-mute">Style profile 80% complete</p>
                </div>
                <div className="animate-float [animation-delay:0.8s]">
                  <LookCard look={heroLooks[1]} compact />
                </div>
                <div className="card flex items-center gap-2 p-4">
                  <span className="text-2xl">⚡</span>
                  <p className="text-sm font-medium text-ink">
                    <span className="font-bold">7 stylists</span> available near you right now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/5 bg-white py-4">
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i} className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">What do you need?</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Styling for every moment
            </h2>
          </div>
          <Link href="/stylists" className="text-sm font-semibold text-gold-dark hover:underline">
            Browse all stylists →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/stylists?category=${encodeURIComponent(cat.name)}`}
              className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink group-hover:text-gold-dark">
                {cat.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{cat.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-gold-dark opacity-0 transition-opacity group-hover:opacity-100">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow !text-gold-light">Handpicked for you</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                This week&apos;s top rated stylists
              </h2>
            </div>
            <Link href="/stylists" className="text-sm font-semibold text-gold-light hover:underline">
              See all {STYLISTS.length} stylists →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((s) => (
              <StylistCard key={s.id} stylist={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20" id="how">
        <div className="text-center">
          <p className="eyebrow">Effortless by design</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
            Three steps to a new you
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Browse real portfolios",
              body: "Every stylist shows their actual work: looks, color stories, reviews and prices. No mystery, no cold calls.",
              emoji: "🔍",
            },
            {
              n: "02",
              title: "Book in under a minute",
              body: "Pick a service, pick a time, done. In person at your place or theirs, or virtual from anywhere on earth.",
              emoji: "📅",
            },
            {
              n: "03",
              title: "Get styled, keep glowing",
              body: "Your stylist arrives prepared with a plan. You keep a digital lookbook so every great outfit is repeatable.",
              emoji: "✨",
            },
          ].map((step) => (
            <div key={step.n} className="card relative p-8">
              <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-paper-deep">
                {step.n}
              </span>
              <span className="text-3xl">{step.emoji}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-mute">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-20">
        <div className="grid gap-6 rounded-3xl bg-paper-warm p-8 md:grid-cols-3 md:p-12">
          {[
            {
              title: "Every stylist is vetted",
              body: "Portfolio review, live styling audition and identity verification. Fewer than 8% of applicants make it in.",
              emoji: "🛡️",
            },
            {
              title: "The NewFit Guarantee",
              body: "Not thrilled after your first session? We rebook you with a new stylist free, or refund you fully. Your call.",
              emoji: "💛",
            },
            {
              title: "Fair, clear pricing",
              body: "The price you see is the price you pay, plus a small 5% booking fee that keeps the platform running. No surprises.",
              emoji: "🧾",
            },
          ].map((v) => (
            <div key={v.title}>
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-20">
        <div className="text-center">
          <p className="eyebrow">Loved loudly</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
            People do not stop talking about it
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "I booked a closet edit on a Tuesday and by Saturday I understood my own style better than I had in 35 years.",
              name: "Danielle M.",
              role: "Booked Amara in New York",
              gradient: ["#C4593A", "#8F3A2A"] as [string, string],
            },
            {
              quote:
                "My stylist found my wedding look, briefed the tailor and saved me about two thousand dollars. This app prints confidence.",
              name: "Marcus T.",
              role: "Booked Luca in New York",
              gradient: ["#3E5C6B", "#22333C"] as [string, string],
            },
            {
              quote:
                "As a plus size woman I braced for the usual disappointment. Instead I got the best styling experience of my life.",
              name: "Camila V.",
              role: "Booked Sofia in Miami",
              gradient: ["#5C4560", "#3A2B3E"] as [string, string],
            },
          ].map((t) => (
            <figure key={t.name} className="card flex flex-col p-7">
              <div className="flex gap-0.5 text-gold" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} gradient={t.gradient} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-mute">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-site pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-clay/20 blur-3xl" />
          <p className="eyebrow !text-gold-light">Are you a stylist?</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Turn your taste into a six figure business
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-paper/70">
            Set your own prices and hours. Keep 85% of every booking. We bring you clients,
            payments, scheduling and insurance so you can focus on the work you love.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/become-a-stylist" className="btn-gold text-base">
              Apply to join
            </Link>
            <Link href="/become-a-stylist#earnings" className="btn-ghost !border-paper/25 !text-paper text-base hover:!bg-paper/10">
              Calculate your earnings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
