'use client';

import { Landmark, Compass, Users, ShieldCheck, MapPin, Cpu } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-stretch">

          {/* Left: Image Placeholder */}
          <div className="relative h-full min-h-[450px] w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/about-image.png"
              alt="The Problem vs Our Solution - Heritage Preservation"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Right: Content */}
          <div className="space-y-10">
            {/* Header Content */}
            <div>
              <h5 className="text-sm font-bold tracking-widest text-foreground uppercase mb-2">About</h5>
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                Heritage<span className="text-secondary">Verse</span>
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-secondary/60 flex-1 max-w-[60px]"></div>
                <Landmark className="w-6 h-6 text-secondary" />
                <div className="h-px bg-secondary/60 flex-1 max-w-[60px]"></div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 leading-tight">
                Preserving India's Heritage<br />Through AI & AR
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Many cultural monuments and traditional stories are disappearing due to neglect, environmental damage, and limited digital documentation.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                HeritageVerse combines artificial intelligence, augmented reality, and community participation to preserve heritage digitally, make history more engaging, and empower citizens to contribute to cultural conservation.
              </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Card 1 */}
              <div className="rounded-2xl border border-border bg-card/30 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Preserve the Past</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Digitally preserve monuments and cultural knowledge before it's lost forever.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-border bg-card/30 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Compass className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Inspire Discovery</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Make heritage accessible and engaging for millions through immersive technology.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-border bg-card/30 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Empower Communities</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Enable citizens to contribute, report threats, and take action in heritage preservation.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl border border-border bg-card/30 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">Build for the Future</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Create a sustainable digital legacy that future generations can explore and learn from.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-20 border border-border/80 bg-card/20 rounded-[2rem] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-0 md:divide-x divide-border/60">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <Landmark className="w-10 h-10 text-secondary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-1">50+</div>
              <div className="text-sm font-medium text-muted-foreground">Heritage Sites</div>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <MapPin className="w-10 h-10 text-secondary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-1">15+</div>
              <div className="text-sm font-medium text-muted-foreground">States Covered</div>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <Users className="w-10 h-10 text-primary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-1">100+</div>
              <div className="text-sm font-medium text-muted-foreground">Community Stories</div>
            </div>
            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center px-4">
              <Cpu className="w-10 h-10 text-secondary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-1">AI</div>
              <div className="text-sm font-medium text-muted-foreground">Powered Platform</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
