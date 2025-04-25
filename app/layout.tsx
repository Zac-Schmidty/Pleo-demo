"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from 'sonner'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <div className="min-h-screen flex flex-col">
          <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row sm:items-center py-4 sm:h-16 gap-4 sm:gap-8">
                <span className="text-xl font-bold text-black mr-8">Pleo Demo</span>
                <div className="hidden sm:flex space-x-1">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/ideal-client">Ideal Client</NavLink>
                  <NavLink href="/employee">Employee</NavLink>
                  <NavLink href="/manager">Manager</NavLink>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-1 p-4 sm:p-8">
            {children}
          </main>
        </div>

        <footer className="border-t bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600">
              <p>Built by Zac Schmidt • Sales Engineering Demo</p>
            </div>
          </div>
        </footer>

        <Toaster />

        {/* Update mobile menu too */}
        <div className="sm:hidden border-t bg-white">
          <div className="flex flex-col py-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ideal-client">Ideal Client</NavLink>
            <NavLink href="/employee">Employee</NavLink>
            <NavLink href="/manager">Manager</NavLink>
          </div>
        </div>
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
        isActive 
          ? "bg-pink-50 text-pink-600" 
          : "text-gray-600 hover:text-black hover:bg-gray-50"
      )}
    >
      {children}
    </Link>
  )
}
