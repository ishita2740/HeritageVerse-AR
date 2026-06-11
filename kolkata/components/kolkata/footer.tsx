'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function FooterSection() {
  const stats = [
    { number: '3500+', label: 'Monuments' },
    { number: '12', label: 'Languages' },
    { number: '8', label: 'Cities' },
    { number: '∞', label: 'Stories' },
  ];

  return (
    <footer className="bg-primary text-[#f5f1e8] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-primary">
                HV
              </div>
              <span className="font-playfair text-xl font-bold">HeritageVerse AR</span>
            </div>
            <p className="text-sm text-[#f5f1e8]/80">
              Preserving culture. Empowering communities. Celebrating heritage.
            </p>
          </motion.div>

          {/* Explore Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-[#f5f1e8]/80">
              <li>
                <Link href="#monuments" className="hover:text-secondary transition-colors">
                  Monuments
                </Link>
              </li>
              <li>
                <Link href="#danger-map" className="hover:text-secondary transition-colors">
                  Danger Map
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Quiz
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Coming Soon</h4>
            <ul className="space-y-2 text-sm text-[#f5f1e8]/80">
              <li>AR App</li>
              <li>VR Experiences</li>
              <li>Community Events</li>
              <li>Museum Partnerships</li>
            </ul>
          </motion.div>

          {/* Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-[#f5f1e8]/80">
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[#f5f1e8]/20 mb-8"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-playfair text-3xl font-bold text-secondary mb-1">
                {stat.number}
              </p>
              <p className="text-sm text-[#f5f1e8]/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#f5f1e8]/70"
        >
          <p>
            © 2024 HeritageVerse AR. All rights reserved. Built for{' '}
            <span className="text-secondary font-semibold">Tradition Hacks 2026</span>
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-secondary transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              Instagram
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
