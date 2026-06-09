'use client';

import {
  Box,
  Smartphone,
  Sparkles,
  MapPin,
  Trophy,
  Users,
  Mic,
  BookOpen,
  AlertTriangle,
  Zap,
} from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Box,
    title: '3D Monument Viewer',
    description: 'Explore interactive 3D models of monuments rotating in your browser with detailed architectural information.',
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'AR Explorer',
    description: 'Point your camera at a monument and see AR overlays revealing hidden stories and historical information.',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'AI Storytelling',
    description: 'Discover monuments through 3 AI-powered narrative modes: immersive stories, local legends, and historical facts.',
  },
  {
    id: 4,
    icon: BookOpen,
    title: 'AI Q&A',
    description: 'Ask any question about monuments and get instant, intelligent answers powered by advanced AI.',
  },
  {
    id: 5,
    icon: Trophy,
    title: 'Heritage Passport',
    description: 'Collect digital stamps as you explore monuments. Gamified preservation with Guardian Levels and achievements.',
  },
  {
    id: 6,
    icon: Users,
    title: 'Community Archive',
    description: 'Contribute oral history, folk tales, and local legends. Preserve cultural stories for future generations.',
  },
  {
    id: 7,
    icon: Mic,
    title: 'Voice Narrations',
    description: 'Listen to AI-generated audio narrations of heritage stories in multiple languages including local regional tongues.',
  },
  {
    id: 8,
    icon: MapPin,
    title: 'Heritage Danger Map',
    description: 'Live map of India showing monument risk levels. Report damage and contribute to preservation efforts.',
  },
  {
    id: 9,
    icon: AlertTriangle,
    title: 'Risk Tracker',
    description: 'Citizen damage reporting system. Help identify threats to heritage sites and alert preservation experts.',
  },
  {
    id: 10,
    icon: Zap,
    title: 'Heritage Quiz',
    description: 'Test your knowledge with engaging quizzes about Indian monuments and earn Guardian points.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Powerful <span className="text-secondary">Features</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            HeritageVerse brings monuments to life with cutting-edge AR, AI, and community-driven preservation tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all hover:border-secondary hover:-translate-y-1 hover:bg-gradient-to-br hover:from-card hover:to-muted/50"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 p-3 group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-secondary to-accent px-8 py-3 font-semibold text-primary hover:shadow-lg transition-all hover:scale-105">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}
