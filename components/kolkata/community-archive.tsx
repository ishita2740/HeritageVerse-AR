'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkeletonLoader } from './skeleton-loader';

type Story = {
  id: string;
  title: string;
  monument_name: string;
  story_type: string;
  content: string;
  contributor_name: string;
  upvotes: number;
};

export function CommunityArchiveSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories?limit=6');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStories(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  async function handleUpvote(storyId: string) {
    try {
      const response = await fetch(`/api/stories/${storyId}/upvote`, {
        method: 'POST',
      });
      if (response.ok) {
        setStories((prev) =>
          prev.map((s) =>
            s.id === storyId ? { ...s, upvotes: (s.upvotes || 0) + 1 } : s
          )
        );
      }
    } catch (err) {
      console.error('Error upvoting:', err);
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#eefaf3]">
        <SkeletonLoader />
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#eefaf3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Community Folk Archive
          </h2>
          <p className="text-lg text-muted-foreground">
            Stories no textbook carries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden border-l-4 border-[#2D7A4A] hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-[#2D7A4A] text-white text-xs font-bold px-2 py-1 rounded">
                    {story.story_type}
                  </span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {story.content}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  By {story.contributor_name}
                </p>

                {expandedId === story.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-muted p-3 rounded mb-4 text-sm"
                  >
                    {story.content}
                  </motion.div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(story.id)}
                    className="text-[#2D7A4A]"
                  >
                    👍 {story.upvotes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedId(expandedId === story.id ? null : story.id)
                    }
                  >
                    {expandedId === story.id ? 'Close' : 'Read'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            className="bg-[#2D7A4A] hover:bg-[#1f5731] text-white px-8 py-6 text-lg"
            size="lg"
          >
            📝 Share Your Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
