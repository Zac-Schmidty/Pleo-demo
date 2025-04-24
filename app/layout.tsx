import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from 'sonner'
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zac's Pleo Demo",
  description: "My Sales Engineering Demo for Pleo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
      >
        <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xl">
                    P
                  </div>
                  <span className="text-xl font-semibold text-black">Pleo Demo</span>
                </Link>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/ideal-client">Ideal Client</NavLink>
                <NavLink href="/employee">Employee Expenses</NavLink>
                <NavLink href="/manager">Manager Review</NavLink>
              </div>
              {/* Mobile menu button */}
              <div className="sm:hidden">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/ideal-client">Ideal Client</MobileNavLink>
            <MobileNavLink href="/employee">Employee Expenses</MobileNavLink>
            <MobileNavLink href="/manager">Manager Review</MobileNavLink>
          </div>
        </div>

        <main className="min-h-[calc(100vh-4rem)] bg-gray-100">
          {children}
        </main>

        <footer className="border-t bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600">
              <p>Built by Zac Schmidt • Sales Engineering Demo</p>
            </div>
          </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className={cn(
        "text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium",
        "transition-colors duration-200",
        "hover:bg-pink-50"
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-pink-50"
    >
      {children}
    </Link>
  )
}
