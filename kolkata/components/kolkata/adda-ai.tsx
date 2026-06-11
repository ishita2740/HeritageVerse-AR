'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const PERSONAS = [
  {
    id: 'tagore',
    name: 'Rabindranath Tagore',
    role: 'Poet · Philosopher · Nobel Laureate',
    color: '#6B3FA0',
  },
  {
    id: 'ray',
    name: 'Satyajit Ray',
    role: 'Filmmaker · Humanist · Artist',
    color: '#6B3FA0',
  },
  {
    id: 'bose',
    name: 'Subhas Chandra Bose',
    role: 'Leader · Revolutionary · Visionary',
    color: '#6B3FA0',
  },
];

export function AddaAISection() {
  const [selectedPersona, setSelectedPersona] = useState<typeof PERSONAS[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !selectedPersona) return;

    const userMessage = input;
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/adda/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: selectedPersona.id,
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();

      setMessages((prev) => [...prev, { role: 'model', text: data.response }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'I seem to have lost my words. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#f0ebe0]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Adda AI
          </h2>
          <p className="text-lg text-muted-foreground italic">
            Have an intellectual conversation with Kolkata&apos;s greatest minds.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Because some conversations transcend time.
          </p>
        </motion.div>

        {!selectedPersona ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {PERSONAS.map((persona) => (
              <motion.button
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                whileHover={{ y: -4 }}
                className="bg-card rounded-lg p-8 border-2 border-border hover:border-[#6B3FA0] transition-all text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4"
                  style={{ backgroundColor: persona.color }}
                >
                  {persona.name.split(' ')[0][0]}
                  {persona.name.split(' ')[1][0]}
                </div>
                <h3 className="font-playfair text-xl font-bold text-foreground mb-1">
                  {persona.name}
                </h3>
                <p className="text-sm text-muted-foreground">{persona.role}</p>
                <Button
                  className="mt-4 w-full bg-[#6B3FA0] hover:bg-[#522d7a] text-white"
                  size="sm"
                >
                  Start Adda
                </Button>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-lg border-2 border-border max-w-2xl mx-auto"
          >
            {/* Chat Header */}
            <div className="bg-[#6B3FA0] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-playfair text-lg font-bold">
                  {selectedPersona.name}
                </h3>
                <p className="text-xs text-purple-100">
                  Powered by AI · Inspired by documented writings
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedPersona(null);
                  setMessages([]);
                }}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm mt-8">
                  <p>Ask {selectedPersona.name} anything...</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-3 max-w-xs ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted border border-border italic font-playfair'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 px-4 py-3">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce animation-delay-100" />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce animation-delay-200" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-border p-4 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${selectedPersona.name}...`}
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#6B3FA0] hover:bg-[#522d7a] text-white"
              >
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
