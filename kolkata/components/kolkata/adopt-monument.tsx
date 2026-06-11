'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkeletonLoader } from './skeleton-loader';

type Monument = {
  id: string;
  name: string;
  risk_level: string;
};

type AdoptionSummary = {
  monument_id: string;
  monument_name: string;
  total_pledged: number;
  adopter_count: number;
};

export function AdoptAMonumentSection() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [adoptions, setAdoptions] = useState<AdoptionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonument, setSelectedMonument] = useState<string | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [monumentsRes, adoptionsRes] = await Promise.all([
          fetch('/api/monuments?city=kolkata'),
          fetch('/api/adoptions/summary?city=kolkata'),
        ]);

        if (monumentsRes.ok) {
          const monumentsData = await monumentsRes.json();
          setMonuments(monumentsData);
        }

        if (adoptionsRes.ok) {
          const adoptionsData = await adoptionsRes.json();
          setAdoptions(adoptionsData);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handlePledge() {
    if (!selectedMonument || !pledgeAmount) return;

    const monument = monuments.find((m) => m.id === selectedMonument);
    if (!monument) return;

    try {
      const response = await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monumentId: selectedMonument,
          monumentName: monument.name,
          amount: pledgeAmount,
          adopterName: 'Guardian',
          city: 'Kolkata',
        }),
      });

      if (response.ok) {
        alert('Thank you for supporting Kolkata heritage!');
        setPledgeAmount(null);
        setSelectedMonument(null);
      }
    } catch (err) {
      console.error('Error pledging:', err);
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#fffaee]">
        <SkeletonLoader />
      </section>
    );
  }

  // Get featured monuments (high/medium risk prioritized)
  const featuredMonuments = monuments
    .filter((m) => m.risk_level === 'high' || m.risk_level === 'medium')
    .slice(0, 4);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#fffaee]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Adopt a Monument
          </h2>
          <p className="text-lg text-muted-foreground">
            Be part of preserving Kolkata&apos;s heritage.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Every pledge — even ₹10 — counts toward preservation awareness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredMonuments.map((monument) => {
            const adoptionData = adoptions.find(
              (a) => a.monument_id === monument.id
            );
            const progress = adoptionData
              ? (adoptionData.total_pledged / 50000) * 100
              : 0;

            return (
              <motion.div
                key={monument.id}
                whileHover={{ y: -4 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair text-lg font-bold text-foreground line-clamp-2">
                    {monument.name}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded text-white ${
                      monument.risk_level === 'high'
                        ? 'bg-destructive'
                        : 'bg-[#E8651A]'
                    }`}
                  >
                    {monument.risk_level.charAt(0).toUpperCase() +
                      monument.risk_level.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Help preserve this historic monument
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#C8800A] h-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{adoptionData?.total_pledged || 0} / ₹50,000 target
                  </p>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  {adoptionData?.adopter_count || 0} guardians have adopted
                </p>

                <Button
                  onClick={() => setSelectedMonument(monument.id)}
                  className="w-full bg-[#C8800A] hover:bg-[#a86908] text-white"
                  size="sm"
                >
                  Pledge Now
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pledge Modal */}
        {selectedMonument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-card rounded-lg p-8 max-w-sm"
            >
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                Choose Your Pledge
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPledgeAmount(amount)}
                    className={`p-3 rounded font-semibold transition-all ${
                      pledgeAmount === amount
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-border'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Custom amount"
                onChange={(e) => setPledgeAmount(parseInt(e.target.value))}
                className="w-full bg-muted border border-border rounded px-3 py-2 mb-6"
              />

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setSelectedMonument(null);
                    setPledgeAmount(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePledge}
                  disabled={!pledgeAmount}
                  className="flex-1 bg-primary hover:bg-[#1f3710]"
                >
                  Pledge
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
