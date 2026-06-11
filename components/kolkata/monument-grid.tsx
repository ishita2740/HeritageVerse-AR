'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkeletonLoader } from './skeleton-loader';
import { getRiskColor } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Monument = {
  id: string;
  name: string;
  location: string;
  built_year: number;
  risk_level: string;
  image_url: string;
  description: string;
  city: string;
};

export function MonumentGrid() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [filteredMonuments, setFilteredMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  useEffect(() => {
    async function fetchMonuments() {
      try {
        setLoading(true);
        const response = await fetch('/api/monuments?city=Kolkata');
        if (!response.ok) throw new Error('Failed to fetch monuments');
        const data = await response.json();
        setMonuments(data);
        setFilteredMonuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchMonuments();
  }, []);

  useEffect(() => {
    let filtered = monuments;

    if (riskFilter !== 'all') {
      filtered = filtered.filter((m) => m.risk_level.toLowerCase() === riskFilter.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMonuments(filtered);
  }, [search, riskFilter, monuments]);

  if (error) {
    return (
      <section id="monuments" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center p-8 bg-card rounded-lg border-2 border-destructive">
            <p className="text-destructive font-semibold">Error: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="monuments" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Kolkata&apos;s Living Heritage
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            8 monuments. Centuries of stories. Some need your help today.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <Input
            type="text"
            placeholder="Search monuments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border-border"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant={riskFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('all')}
              className={riskFilter === 'all' ? 'bg-primary' : ''}
            >
              All
            </Button>
            <Button
              variant={riskFilter === 'low' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('low')}
              className={riskFilter === 'low' ? 'bg-primary' : ''}
            >
              Safe
            </Button>
            <Button
              variant={riskFilter === 'medium' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('medium')}
              className={riskFilter === 'medium' ? 'bg-primary' : ''}
            >
              Medium Risk
            </Button>
            <Button
              variant={riskFilter === 'high' ? 'default' : 'outline'}
              onClick={() => setRiskFilter('high')}
              className={riskFilter === 'high' ? 'bg-primary' : ''}
            >
              High Risk
            </Button>
          </div>
        </motion.div>

        {/* Monument Grid */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {filteredMonuments.map((monument) => (
              <MonumentCard key={monument.id} monument={monument} />
            ))}
          </motion.div>
        )}

        {!loading && filteredMonuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No monuments found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MonumentCard({ monument }: { monument: Monument }) {
  const riskColor = getRiskColor(monument.risk_level);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -6 }}
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-border"
    >
      {/* Image Area */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={monument.image_url || '/images/monument-placeholder.jpg'}
          alt={monument.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Risk Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold"
          style={{ backgroundColor: riskColor }}
        >
          {monument.risk_level.charAt(0).toUpperCase() + monument.risk_level.slice(1)} Risk
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-playfair text-lg font-bold text-foreground mb-1 line-clamp-2">
          {monument.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {monument.location} • {monument.built_year}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
            {monument.city}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-[#E8651A] hover:bg-[#c85015] text-white flex-1">
            Explore in 3D
          </Button>
          <button className="p-2 rounded hover:bg-muted transition-colors">
            <svg
              className="w-5 h-5 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="hidden group-hover:block absolute bottom-4 right-4 text-[#E8651A] font-bold">
        Explore →
      </div>
    </motion.div>
  );
}
