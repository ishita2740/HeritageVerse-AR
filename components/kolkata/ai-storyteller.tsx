'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkeletonLoader, CardSkeletonLoader } from './skeleton-loader';

type Monument = {
  id: string;
  name: string;
  description: string;
  built_year: number;
  architectural_style: string;
};

type QAItem = {
  question: string;
  answer: string;
};

const MODES = ['Historian', 'Storyteller', 'Child-Friendly'];
const LANGUAGES = [
  { code: 'en', label: 'English 🇬🇧' },
  { code: 'bn', label: 'বাংলা 🇮🇳' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ta', label: 'தமிழ்' },
];

export function AIStorytellerSection() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [selectedMode, setSelectedMode] = useState('Storyteller');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [story, setStory] = useState('');
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [qaHistory, setQaHistory] = useState<QAItem[]>([]);
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    async function fetchMonuments() {
      try {
        const response = await fetch('/api/monuments?city=kolkata');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMonuments(data);
        if (data.length > 0) {
          setSelectedMonument(data[0]);
          generateStory(data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch monuments:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMonuments();
  }, []);

  async function generateStory(monument: Monument) {
    if (!monument) return;

    setGenerating(true);
    setStory('');
    try {
      const response = await fetch('/api/ai/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monumentName: monument.name,
          monumentDescription: monument.description,
          builtYear: monument.built_year,
          style: monument.architectural_style,
          mode: selectedMode,
          language: selectedLanguage === 'en' ? 'English' : selectedLanguage,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate story');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setStory((prev) => prev + chunk);
        }
      }
    } catch (err) {
      console.error('Error generating story:', err);
      setStory('Failed to generate story. Please try again.');
    } finally {
      setGenerating(false);
    }
  }

  async function handleQASubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!qaQuestion.trim() || !selectedMonument) return;

    setQaLoading(true);
    try {
      const response = await fetch('/api/ai/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monumentName: selectedMonument.name,
          monumentDescription: selectedMonument.description,
          question: qaQuestion,
          language: selectedLanguage === 'en' ? 'English' : selectedLanguage,
        }),
      });

      if (!response.ok) throw new Error('Failed to get answer');
      const data = await response.json();

      setQaHistory((prev) => [
        ...prev.slice(-2),
        { question: qaQuestion, answer: data.answer },
      ]);
      setQaQuestion('');
    } catch (err) {
      console.error('Error getting QA:', err);
    } finally {
      setQaLoading(false);
    }
  }

  function handleSpeak() {
    if (!story) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speechSynthesisRef.current = new SpeechSynthesisUtterance(story);
    speechSynthesisRef.current.rate = 0.95;

    // Language-aware voice selection
    const voices = speechSynthesis.getVoices();
    let selectedVoice = voices[0];
    if (selectedLanguage === 'bn') {
      selectedVoice = voices.find((v) => v.lang.includes('bn')) || voices[0];
    }
    speechSynthesisRef.current.voice = selectedVoice;

    speechSynthesisRef.current.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(speechSynthesisRef.current);
  }

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#f0eeff]">
        <div className="max-w-4xl mx-auto">
          <CardSkeletonLoader />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#f0eeff]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Every Monument Has a Story
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear it your way, in your language.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Monument Selector */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Select Monument
            </label>
            <select
              value={selectedMonument?.id || ''}
              onChange={(e) => {
                const monument = monuments.find((m) => m.id === e.target.value);
                if (monument) {
                  setSelectedMonument(monument);
                  generateStory(monument);
                }
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

          {/* Mode & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Narration Mode</p>
              <div className="flex gap-2 flex-wrap">
                {MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectedMode(mode);
                      generateStory(selectedMonument!);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      selectedMode === mode
                        ? 'bg-[#6B3FA0] text-white'
                        : 'bg-card border border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Language</p>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  generateStory(selectedMonument!);
                }}
                className="w-full bg-card border border-border rounded px-4 py-2 text-foreground"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Story Display */}
          <div className="bg-card rounded-lg p-6 border border-border min-h-64">
            {generating ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            ) : story ? (
              <p
                className="font-playfair italic text-lg leading-relaxed text-foreground"
                style={{ lineHeight: '1.9' }}
              >
                {story}
              </p>
            ) : (
              <p className="text-muted-foreground">Click generate or change settings to hear a story.</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => generateStory(selectedMonument!)}
              disabled={generating || !selectedMonument}
              className="bg-[#6B3FA0] hover:bg-[#522d7a] text-white"
            >
              {generating ? 'Generating...' : 'Regenerate Story'}
            </Button>
            <Button
              onClick={handleSpeak}
              disabled={!story}
              className="bg-secondary hover:bg-[#c89a5f] text-foreground"
            >
              {isSpeaking ? '⏸ Pause' : '🔊 Listen'}
            </Button>
          </div>

          {/* Q&A Section */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm font-semibold text-foreground mb-3">Ask a Question</p>
            <form onSubmit={handleQASubmit} className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder={`Ask anything about ${selectedMonument?.name}...`}
                value={qaQuestion}
                onChange={(e) => setQaQuestion(e.target.value)}
                disabled={qaLoading}
                className="bg-card border-border"
              />
              <Button
                type="submit"
                disabled={qaLoading || !qaQuestion.trim()}
                className="bg-primary hover:bg-[#1f3710] text-white"
              >
                {qaLoading ? '...' : 'Ask'}
              </Button>
            </form>

            {qaHistory.map((qa, idx) => (
              <div key={idx} className="mb-4 space-y-2">
                <p className="text-sm font-semibold text-foreground bg-muted px-3 py-2 rounded">
                  Q: {qa.question}
                </p>
                <p className="text-sm text-foreground bg-card px-3 py-2 rounded border border-border">
                  A: {qa.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
