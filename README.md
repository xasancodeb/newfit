# NewFit

**Your personal stylist, on demand.** NewFit is a marketplace for booking vetted personal stylists the way you would book a ride: browse real portfolios, compare prices and reviews, and book a session in under a minute, in person or virtual.

## The business model

NewFit is a two sided marketplace with take rates on both sides of every transaction:

| Revenue stream | Rate | Notes |
| --- | --- | --- |
| Client booking fee | 5% | Added at checkout, fully transparent |
| Stylist commission | 15% | Stylists keep 85% of every booking |
| Future: NewFit+ membership | subscription | Priority booking, member pricing |
| Future: brand partnerships | affiliate | Stylists link shoppable products |
| Future: gift cards and corporate | prepaid | Team offsites, employee perks |

At an average order value of $200, NewFit earns roughly $40 per session across both fees. The launch product is fully functional with demo data; payments are Stripe ready at checkout.

## What is included

- **Landing page** with live look tiles, categories, featured stylists and social proof
- **Browse and search** with filters for specialty, city, virtual, instant book and five sort orders
- **Stylist profiles** with portfolio look galleries (signature color stories), services, transparent pricing, verified reviews and availability
- **Booking flow** in three steps: service, schedule, review and pay, with the 5% platform fee itemized, plus a confirmation screen
- **Client dashboard** with upcoming sessions, spend tracking and cancellation (persisted in localStorage for the demo)
- **Stylist recruitment page** with an interactive earnings calculator and a full application form
- **Trust layer**: vetting standards, escrow messaging and the NewFit Guarantee

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy it tonight

The app is a standard Next.js 15 project. On [Vercel](https://vercel.com): import the repo, press Deploy, done. Netlify and any Node host work too (`npm run build && npm start`).

## Tech

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS. No database or external image dependencies, so it deploys anywhere and never renders a broken asset. Swap `lib/data.ts` for an API when you connect a backend, and drop Stripe into the checkout step in `app/book/[id]/BookingClient.tsx`.
