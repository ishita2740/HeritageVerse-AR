'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Monument = {
  id: string;
  name: string;
  description: string;
  built_year: number;
  architectural_style: string;
  image_url: string;
};

export function ThreeDViewerSection() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [loading, setLoading] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    async function fetchMonuments() {
      try {
        const response = await fetch('/api/monuments?city=kolkata');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMonuments(data);
        if (data.length > 0) setSelectedMonument(data[0]);
      } catch (err) {
        console.error('Failed to fetch monuments:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMonuments();
  }, []);

  if (loading || !selectedMonument) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="h-96 bg-card rounded-lg animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Walk Through History
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore monuments in full 3D. No visit required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: 3D Viewer (55%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            {/* 3D Canvas Placeholder */}
            <div className="relative w-full bg-gradient-to-br from-[#2d5016] to-[#1a3510] rounded-lg h-96 flex items-center justify-center border-4 border-[#d4a574] overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <div className="text-center z-10">
                <p className="text-white text-lg font-semibold mb-2">
                  {selectedMonument.name}
                </p>
                <p className="text-[#d4a574] text-sm">3D Model Ready</p>
              </div>
            </div>

            {/* Monument Selector */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Select Monument
              </label>
              <select
                value={selectedMonument.id}
                onChange={(e) => {
                  const monument = monuments.find((m) => m.id === e.target.value);
                  if (monument) setSelectedMonument(monument);
                }}
                className="w-full bg-card border border-border rounded px-4 py-2 text-foreground"
              >
                {monuments.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Machine Slider */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Time Machine: Historical vs Present
              </p>
              <div className="relative h-40 rounded-lg overflow-hidden border-2 border-border">
                {/* Present Image */}
                <Image
                  src={selectedMonument.image_url || '/images/monument-placeholder.jpg'}
                  alt="Present"
                  fill
                  className="object-cover"
                />

                {/* Historical Image Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedMonument.image_url})`,
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    opacity: 0.7,
                  }}
                />

                {/* Slider Handle */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-10"
                />

                {/* Visual Divider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#d4a574] transition-all duration-100"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#d4a574] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#2d5016]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/40 px-2 py-1 rounded">
                  Historical · {selectedMonument.built_year}
                </div>
                <div className="absolute bottom-2 right-2 text-xs font-bold text-white bg-black/40 px-2 py-1 rounded">
                  Present · 2024
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Info Panel (45%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card rounded-lg p-6 border border-border"
          >
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
              {selectedMonument.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Built {selectedMonument.built_year} · {selectedMonument.architectural_style}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Architecture Highlights
                </p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>• {selectedMonument.architectural_style} style</li>
                  <li>• Constructed in {selectedMonument.built_year}</li>
                  <li>• Iconic Kolkata landmark</li>
                </ul>
              </div>
            </div>

            <Button
              className="w-full bg-[#6B3FA0] hover:bg-[#522d7a] text-white mb-3"
              size="sm"
            >
              Listen to AI Narration
            </Button>

            <Button
              variant="outline"
              className="w-full"
              size="sm"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
