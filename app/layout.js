import { Big_Shoulders, Barlow_Condensed, Barlow } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Display face for headings and numbers: chunky, condensed, old-signage feel
const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

// Condensed face for labels, tabs and buttons
const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Body text
const body = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Spendly",
  description: "Track your spending and stay on budget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${condensed.variable} ${body.variable}`}>
      <body>
        <nav className="nav">
          <Link href="/" className="logo">Spendly</Link>
          <Link href="/">Expenses</Link>
          <Link href="/">Reports</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
