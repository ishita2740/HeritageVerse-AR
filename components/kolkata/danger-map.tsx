'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkeletonLoader } from './skeleton-loader';

type RiskReport = {
  id: string;
  monument_name: string;
  threat_type: string;
  severity: string;
  description: string;
  created_at: string;
};

type RiskStats = {
  monumentsCovered: number;
  totalReports: number;
  monumentsAtRisk: number;
};

export function HeritageDangerMapSection() {
  const [stats, setStats] = useState<RiskStats | null>(null);
  const [reports, setReports] = useState<RiskReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, reportsRes] = await Promise.all([
          fetch('/api/risk/stats?city=kolkata'),
          fetch('/api/risk/reports?city=kolkata&limit=5'),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(reportsData);
        }
      } catch (err) {
        console.error('Error fetching risk data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="danger-map" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <CardSkeletonLoader />
        </div>
      </section>
    );
  }

  return (
    <section id="danger-map" className="py-16 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Heritage Danger Map
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Know which monuments need your attention.
          </p>

          {stats && (
            <div className="flex gap-4 flex-wrap text-sm font-semibold text-foreground">
              <span>{stats.monumentsAtRisk} monuments at risk</span>
              <span>•</span>
              <span>{stats.totalReports} citizen reports</span>
              <span>•</span>
              <span>{stats.monumentsCovered} cities covered</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card rounded-lg h-96 border border-border flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Interactive Map</p>
              <p className="text-sm text-muted-foreground">
                Leaflet.js map showing 8 Kolkata monuments
              </p>
            </div>
          </motion.div>

          {/* Reports Panel (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-6 border border-border"
          >
            <h3 className="font-playfair text-xl font-bold text-foreground mb-4">Recent Reports</h3>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 bg-muted rounded text-sm border-l-4 border-[#1A7A6A]"
                  >
                    <p className="font-semibold text-foreground mb-1">{report.monument_name}</p>
                    <p className="text-muted-foreground text-xs mb-2">{report.description}</p>
                    <div className="flex gap-2">
                      <span className="bg-[#1A7A6A] text-white text-xs px-2 py-1 rounded">
                        {report.threat_type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          report.severity === 'High'
                            ? 'bg-destructive/20 text-destructive'
                            : report.severity === 'Medium'
                              ? 'bg-[#E8651A]/20 text-[#E8651A]'
                              : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {report.severity} Severity
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No recent reports</p>
              )}
            </div>

            <Button
              onClick={() => setShowReportForm(!showReportForm)}
              className="w-full bg-[#1A7A6A] hover:bg-[#0f5a50] text-white"
            >
              Submit a Report
            </Button>

            {showReportForm && (
              <div className="mt-4 p-4 bg-muted rounded space-y-3 text-sm">
                <p className="text-foreground font-semibold">Report a Heritage Risk</p>
                <p className="text-muted-foreground text-xs">
                  Sign in to save your contribution to preservation efforts.
                </p>
                <Button size="sm" className="w-full bg-primary hover:bg-[#1f3710]">
                  Sign In
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CardSkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-muted rounded w-1/3" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 bg-muted rounded" />
        <div className="h-96 bg-muted rounded" />
      </div>
    </div>
  );
}
