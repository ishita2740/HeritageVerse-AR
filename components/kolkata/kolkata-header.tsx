'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function KolkataHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src="/logo.png" alt="HeritageVerse AR Logo" className="h-full w-full object-contain scale-150" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-md">HeritageVerse</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#monuments"
            className="text-base font-medium text-white hover:text-[#d4a574] transition-colors drop-shadow-md"
          >
            Monuments
          </Link>
          <Link
            href="#stories"
            className="text-base font-medium text-white hover:text-[#d4a574] transition-colors drop-shadow-md"
          >
            Stories
          </Link>
          <Link
            href="#danger-map"
            className="text-base font-medium text-white hover:text-[#d4a574] transition-colors drop-shadow-md"
          >
            Danger Map
          </Link>
          <Link
            href="#about"
            className="text-base font-medium text-white hover:text-[#d4a574] transition-colors drop-shadow-md"
          >
            About
          </Link>
          <Link
            href="#play"
            className="text-base font-medium text-white hover:text-[#d4a574] transition-colors drop-shadow-md"
          >
            Play
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-8 w-8 text-white drop-shadow-md" />
          ) : (
            <Menu className="h-8 w-8 text-white drop-shadow-md" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/90 backdrop-blur-md px-4 py-4 md:hidden border-b border-[#d4a574]/30"
          >
            <div className="flex flex-col gap-6 py-4">
              <Link
                href="#monuments"
                className="text-lg font-medium text-white hover:text-[#d4a574] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Monuments
              </Link>
              <Link
                href="#stories"
                className="text-lg font-medium text-white hover:text-[#d4a574] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Stories
              </Link>
              <Link
                href="#danger-map"
                className="text-lg font-medium text-white hover:text-[#d4a574] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Danger Map
              </Link>
              <Link
                href="#about"
                className="text-lg font-medium text-white hover:text-[#d4a574] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#play"
                className="text-lg font-medium text-white hover:text-[#d4a574] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Play
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
