import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NewFit · Your personal stylist, on demand",
    template: "%s · NewFit",
  },
  description:
    "Book vetted personal stylists for wardrobe makeovers, event styling, personal shopping, closet edits and virtual consults. In person or from anywhere.",
  keywords: [
    "personal stylist",
    "book a stylist",
    "wardrobe makeover",
    "personal shopping",
    "event styling",
    "fashion consultant",
  ],
  openGraph: {
    title: "NewFit · Your personal stylist, on demand",
    description: "The marketplace for booking world class personal stylists.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
