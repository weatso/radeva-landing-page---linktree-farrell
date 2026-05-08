import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// 1. Setup Font
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant", // Ini kunci agar connect ke CSS @theme
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Ini kunci agar connect ke CSS @theme
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radeva Wedding Organizer | Exclusive Wedding Planner",
  description: "Mewujudkan pernikahan impian dengan sentuhan kemewahan dan presisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-radeva-900 text-gold-100 antialiased selection:bg-gold-500 selection:text-radeva-900">
        {children}
      </body>
    </html>
  );
}