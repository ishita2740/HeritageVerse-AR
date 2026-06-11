import { KolkataHeroSection } from '@/components/kolkata/hero-section';
import { MonumentGrid } from '@/components/kolkata/monument-grid';
import { ThreeDViewerSection } from '@/components/kolkata/three-d-viewer';
import { AIStorytellerSection } from '@/components/kolkata/ai-storyteller';
import { HeritageDangerMapSection } from '@/components/kolkata/danger-map';
import { TramTalesSection } from '@/components/kolkata/tram-tales';
import { AddaAISection } from '@/components/kolkata/adda-ai';
import { HeritagePassportSection } from '@/components/kolkata/heritage-passport';
import { CommunityArchiveSection } from '@/components/kolkata/community-archive';
import { AdoptAMonumentSection } from '@/components/kolkata/adopt-monument';
import { FooterSection } from '@/components/kolkata/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kolkata Heritage - HeritageVerse AR',
  description:
    'Explore Kolkata\'s 8 living monuments through AR, 3D, AI storytelling, and community-driven preservation. Earn guardian badges and help preserve cultural heritage.',
  keywords: [
    'Kolkata',
    'Heritage',
    'AR',
    'Monuments',
    'Victoria Memorial',
    'Howrah Bridge',
    'AI Storytelling',
    'Cultural Preservation',
  ],
  authors: [{ name: 'HeritageVerse AR' }],
  openGraph: {
    title: 'Kolkata Heritage - HeritageVerse AR',
    description:
      'Preserve Kolkata\'s cultural soul through AR, 3D exploration, and community engagement.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function KolkataPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* All sections in sequence */}
      <KolkataHeroSection />
      <MonumentGrid />
      <ThreeDViewerSection />
      <AIStorytellerSection />
      <HeritageDangerMapSection />
      <TramTalesSection />
      <AddaAISection />
      <HeritagePassportSection />
      <CommunityArchiveSection />
      <AdoptAMonumentSection />
      <FooterSection />
    </main>
  );
}
