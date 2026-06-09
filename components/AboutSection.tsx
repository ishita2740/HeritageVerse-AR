'use client';

import { Heart, Users, Globe } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { icon: Globe, value: '500+', label: 'Monuments' },
    { icon: Users, value: '50K+', label: 'Community Members' },
    { icon: Heart, value: '100%', label: 'Preservation Focused' },
  ];

  return (
    <section id="about" className="w-full py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Image */}
          <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1504681869696-d977e3a5e232?w=600&h=500&fit=crop"
              alt="Heritage Preservation"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
                About <span className="text-secondary">HeritageVerse</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                HeritageVerse AR is on a mission to preserve India&apos;s rich cultural heritage for future generations through technology, community engagement, and digital storytelling.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every monument has a story to tell. By combining AR, AI, and crowdsourced knowledge, we create immersive experiences that connect people to their heritage while supporting real preservation efforts.
              </p>
            </div>

            {/* Mission Points */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Preserve the Past</h3>
                  <p className="text-muted-foreground">Digitally preserve monuments and cultural knowledge before it&apos;s lost forever.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Inspire Discovery</h3>
                  <p className="text-muted-foreground">Make heritage accessible and engaging for millions through immersive technology.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Empower Communities</h3>
                  <p className="text-muted-foreground">Enable citizens to contribute, report threats, and take action in heritage preservation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/50 p-8 text-center hover:border-secondary transition-colors group"
              >
                <div className="inline-flex rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 p-3 group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors mb-4">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-4xl font-bold text-secondary">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
