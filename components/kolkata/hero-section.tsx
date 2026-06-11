'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function KolkataHeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#6B0000] text-[#C8A020] py-2 text-center text-sm italic font-playfair">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          স্বাগতম · Exploring Kolkata — City of Joy · Living Heritage · Eternal Culture
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-black overflow-hidden pt-12">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/kolkata-hero.jpg"
          >
            <source
              src="/kolkata.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="w-32 h-32 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Bengali Welcome */}
          <motion.h2
            variants={itemVariants}
            className="text-[#d4a574] font-noto-bengali text-3xl md:text-4xl mb-4"
          >
            স্বাগতম কলকাতায়
          </motion.h2>

          {/* English Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-cream italic text-lg md:text-xl mb-6 text-[#fefdfb]"
          >
            Welcome to the City of Joy
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ letterSpacing: '-0.05em' }}
          >
            Preserving Kolkata&apos;s Soul
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#fefdfb] mb-10 max-w-2xl"
          >
            Every monument. Every story. Every guardian.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-wrap justify-center"
          >
            <a
              href="#monuments"
              className="px-8 py-6 bg-[#2d5016] hover:bg-[#1f3710] text-[#f5f1e8] rounded font-semibold text-lg transition-colors"
            >
              Explore Monuments
            </a>
            <a
              href="#danger-map"
              className="px-8 py-6 border-2 border-[#fefdfb] text-[#fefdfb] hover:bg-[#fefdfb]/10 rounded font-semibold text-lg transition-colors"
            >
              View Danger Map
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-[#d4a574] text-center text-sm">
            Scroll to explore
          </div>
        </motion.div>
      </section>
    </>
  );
}
