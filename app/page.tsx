import Link from "next/link";
import { STYLISTS, CATEGORIES, CITIES } from "@/lib/data";
import StylistCard from "@/components/StylistCard";
import Motif from "@/components/Motif";
import Grain from "@/components/Grain";

export default function HomePage() {
  const featured = STYLISTS.filter((s) => s.topRated).slice(0, 4);
  const hero = STYLISTS[0];
  const heroLook = hero.looks[0];
  const totalBookings = STYLISTS.reduce((a, s) => a + s.bookings, 0);
  const totalReviews = STYLISTS.reduce((a, s) => a + s.reviewCount, 0);

  return (
    <>
      <section className="container-site">
        <div className="grid gap-10 border-b border-line py-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-20">
          <div className="flex animate-fade-up flex-col justify-center">
            <p className="label">The stylist marketplace</p>
            <h1 className="mt-6 font-display text-[52px] font-light leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[86px]">
              Dress like you
              <br />
              <em className="font-light">meant it.</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-mute">
              NewFit is where you book a vetted personal stylist the way you would book a ride.
              Wardrobe overhauls, event looks, closet edits and personal shopping, in person or
              on video, from $70.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/stylists" className="btn-dark">
                Find your stylist
              </Link>
              <Link href="/how-it-works" className="link-line">
                How it works
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <Link
              href={`/stylists/${hero.id}`}
              className="group relative block h-full min-h-[480px] overflow-hidden border border-line"
              style={{ backgroundColor: heroLook.palette[0] }}
            >
              <Grain />
              <span className="absolute inset-0 text-bone/90" aria-hidden="true">
                <Motif
                  name={heroLook.motif}
                  className="absolute left-1/2 top-[42%] h-[55%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-[1.04]"
                  strokeWidth={0.9}
                />
              </span>
              <span className="absolute left-5 top-5 font-display text-sm text-bone/90">
                Look 01
              </span>
              <div className="absolute inset-x-0 bottom-0 border-t border-bone/25 bg-ink/25 px-5 py-4 backdrop-blur-sm">
                <p className="font-display text-xl text-bone">{heroLook.title}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-bone/70">
                  {hero.name} · {hero.neighborhood}, {hero.city}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-[72px] flex h-1.5">
                {heroLook.palette.map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-line border-b border-line md:grid-cols-4">
          {[
            [`${totalBookings.toLocaleString()}`, "Sessions styled"],
            ["4.93", "Average rating"],
            [`${totalReviews.toLocaleString()}`, "Verified reviews"],
            [`${CITIES.length}`, "Cities and counting"],
          ].map(([stat, label]) => (
            <div key={label} className="px-4 py-6 text-center md:py-8">
              <p className="font-display text-3xl font-light text-ink md:text-4xl">{stat}</p>
              <p className="meta mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="overflow-hidden border-b border-line bg-ink py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-bone/60"
            >
              {city}
              <span className="h-1 w-1 bg-rust" />
            </span>
          ))}
        </div>
      </div>

      <section className="container-site py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Services</p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
              Styling for every moment
            </h2>
          </div>
          <Link href="/stylists" className="link-line">
            All stylists
          </Link>
        </div>

        <div className="mt-12 border-t border-line">
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
              <p className="hidden text-sm leading-relaxed text-mute sm:block">{cat.blurb}</p>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-5 w-5 text-mute transition-all group-hover:translate-x-1 group-hover:text-rust"
                aria-hidden="true"
              >
                <path d="M3 12h17M14 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink py-20 text-bone">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label !text-bone/50">The directory</p>
              <h2 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl">
                This week&apos;s most booked
              </h2>
            </div>
            <Link href="/stylists" className="link-line !text-bone !decoration-bone/30 hover:!text-bone hover:!decoration-rust">
              View all {STYLISTS.length}
            </Link>
          </div>
          <div className="mt-12 grid gap-px border border-line/20 bg-line/20 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((s) => (
              <StylistCard key={s.id} stylist={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <p className="label">The process</p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
          Three steps, one better mirror
        </h2>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Browse real portfolios",
              body: "Every stylist shows their actual work: signature looks, color stories, verified reviews and exact prices. No mystery, no cold calls.",
            },
            {
              n: "02",
              title: "Book in under a minute",
              body: "Pick a service, a time and a place: your home, their studio, or a video call from anywhere on earth. Pay securely through NewFit.",
            },
            {
              n: "03",
              title: "Keep the results",
              body: "Your stylist arrives with a plan. You keep a digital lookbook and outfit formulas, so the transformation outlives the appointment.",
            },
          ].map((step) => (
            <div key={step.n} className="bg-bone p-8 md:p-10">
              <p className="font-display text-5xl font-light text-line">{step.n}</p>
              <h3 className="mt-6 font-display text-2xl font-normal text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-20">
        <div className="border-y border-ink py-14 text-center md:py-20">
          <p className="label">The NewFit Guarantee</p>
          <p className="mx-auto mt-6 max-w-3xl font-display text-3xl font-light leading-snug text-ink sm:text-4xl">
            If your first session does not thrill you, the next one is on us.
            <em> A new stylist free, or your money back. Your call.</em>
          </p>
          <p className="meta mx-auto mt-6 max-w-md">
            Every stylist is portfolio reviewed, auditioned live and identity verified.
            Fewer than 8% of applicants make it in.
          </p>
        </div>
      </section>

      <section className="container-site pb-20">
        <p className="label">Client notes</p>
        <div className="mt-8 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {[
            {
              quote:
                "I booked a closet edit on a Tuesday and by Saturday I understood my own style better than I had in 35 years.",
              name: "Danielle M.",
              role: "New York",
            },
            {
              quote:
                "My stylist found my wedding look, briefed the tailor and saved me about two thousand dollars.",
              name: "Marcus T.",
              role: "New York",
            },
            {
              quote:
                "As a plus size woman I braced for the usual disappointment. I got the best styling experience of my life.",
              name: "Camila V.",
              role: "Miami",
            },
          ].map((t) => (
            <figure key={t.name} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <blockquote className="font-display text-xl font-light leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="meta mt-5">
                {t.name} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink py-20 text-bone">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label !text-bone/50">For stylists</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Your taste is a business. We built the storefront.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/70">
              Set your own prices and hours. Keep 85% of every booking. We bring the clients,
              payments, scheduling and insurance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <Link href="/become-a-stylist" className="btn-light">
                Apply to join
              </Link>
              <Link
                href="/become-a-stylist#earnings"
                className="link-line !text-bone !decoration-bone/30 hover:!decoration-rust"
              >
                Calculate earnings
              </Link>
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <div className="relative h-72 w-72 border border-bone/20">
              <Grain opacity={0.2} />
              <Motif name="hanger" className="absolute inset-0 m-auto h-40 w-40 text-bone/80" strokeWidth={0.9} />
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.24em] text-bone/50">
                Est. 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
