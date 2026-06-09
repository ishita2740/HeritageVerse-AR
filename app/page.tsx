'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CitySlider from '@/components/CitySlider';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="bg-background">
      <Header />
      <HeroSection />
      <CitySlider />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
