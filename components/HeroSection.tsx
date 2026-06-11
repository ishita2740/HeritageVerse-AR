'use client';

import { ArrowDown, MessageSquare } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&h=900&fit=crop")',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-balance text-5xl font-bold text-white sm:text-6xl md:text-7xl leading-tight">
              Preserving the Past.
              <br />
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                Inspiring the Future.
              </span>
            </h1>
            <p className="text-balance text-lg text-gray-200 sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Discover monuments in immersive 3D, hear AI-powered cultural stories, and help preserve heritage for future generations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <a href="#explore" className="group relative inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3 font-semibold text-primary hover:bg-secondary/90 transition-all hover:shadow-lg transform hover:scale-105">
              <span>Explore Now</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-sm">
              <span>💬</span>
              <span>AI Guide</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
