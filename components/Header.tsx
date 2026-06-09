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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
            <svg
              className="h-6 w-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">HeritageVerse</h1>
            <p className="text-xs text-muted-foreground">AR</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#explore"
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors">
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
              href="#contact"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
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
