'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkeletonLoader } from './skeleton-loader';

type TramStop = {
  id: string;
  name: string;
  story: string;
  year?: number;
};

export function TramTalesSection() {
  const [tramStops, setTramStops] = useState<TramStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<TramStop | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    async function fetchTramStops() {
      try {
        const response = await fetch('/api/tram-stops');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTramStops(data);
        if (data.length > 0) setSelectedStop(data[0]);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTramStops();
  }, []);

  function handleSpeak() {
    if (!selectedStop?.story) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(selectedStop.story);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#fffbe8]">
        <SkeletonLoader />
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#fffbe8]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Tram Tales
          </h2>
          <p className="text-lg text-muted-foreground">
            Stories from Kolkata&apos;s last living trams.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            The trams are disappearing. Their stories don&apos;t have to.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Timeline */}
          <div className="relative">
            <div className="h-1 bg-[#C8A020] rounded" />

            {/* Tram Stops */}
            <div className="flex justify-between mt-4 overflow-x-auto pb-4">
              {tramStops.map((stop, idx) => (
                <motion.button
                  key={stop.id}
                  onClick={() => setSelectedStop(stop)}
                  className={`flex flex-col items-center flex-shrink-0 transition-all ${
                    selectedStop?.id === stop.id
                      ? 'scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm ${
                      selectedStop?.id === stop.id
                        ? 'bg-[#C8A020] border-[#C8A020] text-[#2d5016]'
                        : 'bg-[#fefdfb] border-[#C8A020] text-[#2d5016]'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-xs font-playfair mt-2 text-center text-foreground max-w-[80px]">
                    {stop.name}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Story Card */}
          {selectedStop && (
            <motion.div
              key={selectedStop.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-lg p-8 border-l-4 border-[#C8A020]"
            >
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                {selectedStop.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedStop.year || 'Historic'} · Tram Stop Stories
              </p>
              <p className="text-foreground font-playfair italic leading-relaxed mb-6">
                {selectedStop.story}
              </p>

              <Button
                onClick={handleSpeak}
                className="bg-[#C8A020] hover:bg-[#a88818] text-[#2d5016]"
              >
                {isSpeaking ? '⏸ Pause' : '🔊 Hear This Story'}
              </Button>
            </motion.div>
          )}

          {/* Info Badge */}
          <div className="text-center">
            <span className="inline-block bg-[#C83050] text-white px-4 py-2 rounded-full text-sm font-semibold">
              {tramStops.length} stops · {tramStops.length} stories · 1 dying tradition
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
