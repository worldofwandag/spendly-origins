import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Geometric sans with chunky numerals, close to the fintech reference
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spendly",
  description: "Track your spending and stay on budget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
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
