'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center">
            <img src="/logo.png" alt="HeritageVerse AR Logo" className="h-full w-full object-contain scale-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">HeritageVerse</h1>
            <span className="text-base font-medium text-foreground">AR</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#explore"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="#features"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            About
          </Link>
          <Link
            href="#community"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            Community
          </Link>
          <Link
            href="#contact"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            Contact
          </Link>
          <Link
            href="#play"
            className="text-base font-medium text-foreground hover:text-secondary transition-colors"
          >
            Play
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors">
            Log In
          </button>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#explore"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#community"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#play"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Play
            </Link>
            <div className="flex gap-2 pt-4">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors border border-border">
                Log In
              </button>
              <button className="flex-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
