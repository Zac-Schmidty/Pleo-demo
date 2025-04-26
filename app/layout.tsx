"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from 'sonner'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinkWithClose = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <NavLink href={href} onClick={() => setMobileMenuOpen(false)}>
      {children}
    </NavLink>
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
      >
        <div className="min-h-screen flex flex-col">
          <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <div className="flex items-center h-16">
                <span className="text-xl font-bold text-black mr-4 sm:mr-8">Pleo Demo</span>
                {/* Desktop Navigation */}
                <div className="hidden sm:flex space-x-1">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/ideal-client">Ideal Client</NavLink>
                  <NavLink href="/employee">Employee</NavLink>
                  <NavLink href="/manager">Manager</NavLink>
                </div>
                {/* Mobile Menu Button */}
                <button 
                  className="ml-auto sm:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t bg-white absolute w-full shadow-lg top-16 left-0">
              <div className="flex flex-col py-2 px-2 sm:px-4">
                <NavLinkWithClose href="/">Home</NavLinkWithClose>
                <NavLinkWithClose href="/ideal-client">Ideal Client</NavLinkWithClose>
                <NavLinkWithClose href="/employee">Employee</NavLinkWithClose>
                <NavLinkWithClose href="/manager">Manager</NavLinkWithClose>
              </div>
            </div>
          )}

          <main className="flex-1 px-1 py-4 sm:p-8">
            {children}
          </main>
        </div>

        <footer className="border-t bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
              <p>Built by Zac Schmidt • Sales Engineering Demo </p>
              <a 
                href="https://www.linkedin.com/in/zac-schmidt-b35b05284/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}

function NavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      onClick={onClick}
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
