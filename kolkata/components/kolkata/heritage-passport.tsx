'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkeletonLoader } from './skeleton-loader';

export function HeritagePassportSection() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Heritage Guardian Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Earn stamps, climb levels, become a legend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Heritage Passport */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-8 border-4 border-[#C83050]"
          >
            <h3 className="font-playfair text-2xl font-bold text-[#C83050] mb-6">
              Heritage Passport
            </h3>

            {/* Passport Stamps */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl transition-all ${
                    i < 3
                      ? 'bg-[#C83050] text-white shadow-lg'
                      : 'border-2 border-dashed border-muted text-muted'
                  }`}
                >
                  {i < 3 ? '✓' : '○'}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Guardian Level</p>
              <div className="bg-muted rounded-full h-3">
                <div
                  className="bg-[#C83050] h-full rounded-full transition-all"
                  style={{ width: '35%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                35% toward next level
              </p>
            </div>

            <div className="bg-muted rounded px-4 py-3 text-center">
              <p className="text-lg font-bold text-foreground">
                Story Seeker
              </p>
              <p className="text-xs text-muted-foreground">Level 3 · 120 Points</p>
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quiz */}
            <div className="bg-card rounded-lg p-8 border-4 border-[#C83050]">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                Heritage Quiz
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Difficulty
                  </label>
                  <div className="flex gap-2">
                    {['Tourist', 'Explorer', 'Guardian'].map((level) => (
                      <Button
                        key={level}
                        size="sm"
                        className={`flex-1 ${
                          level === 'Explorer'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:bg-border'
                        }`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-3">
                    Which year was Victoria Memorial completed?
                  </p>
                  <div className="space-y-2">
                    {['A. 1906', 'B. 1911', 'C. 1921', 'D. 1925'].map((option) => (
                      <Button
                        key={option}
                        className="w-full justify-start text-left bg-muted hover:bg-border text-foreground"
                        size="sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-[#C83050] hover:bg-[#a8254b] text-white">
                  Next Question
                </Button>
              </div>
            </div>

            {/* Guardian Score */}
            <div className="bg-card rounded-lg p-8 border-4 border-[#C83050]">
              <h3 className="font-playfair text-xl font-bold text-foreground mb-4">
                Your Guardian Score
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#C83050]">120</p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="text-xs text-muted-foreground">Level</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Quiz: <span className="text-foreground font-semibold">60 pts</span>
                </p>
                <p className="text-muted-foreground">
                  Stamps: <span className="text-foreground font-semibold">40 pts</span>
                </p>
                <p className="text-muted-foreground">
                  Reports: <span className="text-foreground font-semibold">20 pts</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
