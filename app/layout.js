// import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Spendly",
  description: "Track your spending and stay on budget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
