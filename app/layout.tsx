import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import AuthButton from "@/components/AuthButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "M.Saad — Blog",
    template: "%s | M.Saad Blog",
  },
  description:
    "Engineer Saad’s articles on Chemical Engineering, AI, Space, and Community.",
  metadataBase: new URL("https://blog.saadengineer.works"),
  openGraph: {
    type: "website",
    url: "https://blog.saadengineer.works/",
    siteName: "M.Saad Blog",
    title: "M.Saad — Blog",
    description:
      "Engineer Saad’s articles on Chemical Engineering, AI, Space, and Community.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Cheme1569231",
    creator: "@Cheme1569231",
    title: "M.Saad — Blog",
    description:
      "Engineer Saad’s articles on Chemical Engineering, AI, Space, and Community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-neutral-100">
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50 border-b border-neutral-800">
          <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wider">M.Saad • Blog</Link>
            <nav className="text-sm flex items-center space-x-6">
              <Link className="hover:text-blue-400" href="/">Articles</Link>
              <a className="hover:text-blue-400" href="https://saadengineer.works">Portfolio</a>
              <AuthButton />
            </nav>
          </div>
        </header>
        {children}
        <Analytics />
        <footer className="border-t border-neutral-800 mt-16">
          <div className="max-w-4xl mx-auto px-5 py-10 text-sm text-neutral-400">
            © {new Date().getFullYear()} M.Saad — ChemE × AI. <a className="text-blue-400 hover:text-blue-300" href="https://saadengineer.works">Portfolio</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
