'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, ChevronDown } from 'lucide-react';

const ROTATING_SUGGESTIONS = [
  'Meet Your AI Guide',
  'Ask about the Taj Mahal',
  'Discover hidden heritage stories',
  "Explore India's cultural treasures",
  'Find monuments near you',
  'Learn history through AI',
  'Start your heritage journey',
  'Uncover forgotten legends',
  'Explore architecture & traditions',
  'Ask anything about heritage',
];

const QUICK_PROMPTS = [
  'Tell me about the Taj Mahal',
  'Explore Rajasthan heritage',
  'Hidden stories of Hampi',
  'Recommend monuments to visit',
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'ai' as const,
  text: "👋 Welcome to HeritageVerse! I'm your AI Heritage Guide. Ask me about monuments, history, architecture, traditions, or cultural stories from across India.",
  time: new Date(),
};

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: Date;
}

function TypingIndicator() {
  return (
    <div className="hv-msg hv-msg-ai">
      <div className="hv-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function HeritageAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionVisible, setSuggestionVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate suggestions every 4s with fade transition
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setSuggestionVisible(false);
      setTimeout(() => {
        setSuggestionIndex((i) => (i + 1) % ROTATING_SUGGESTIONS.length);
        setSuggestionVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 400);
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: getAIResponse(text.trim()),
        time: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('taj mahal'))
      return '🕌 The Taj Mahal, built by Emperor Shah Jahan between 1632–1653, stands as an eternal symbol of love. This UNESCO World Heritage Site in Agra is made of 28 types of precious stones and 20,000 artisans worked on it over 22 years. The white marble changes color with light — pink at dawn, white at midday, golden at sunset.';
    if (q.includes('rajasthan'))
      return '🏰 Rajasthan is a tapestry of forts, palaces, and desert culture. From the golden Jaisalmer Fort to the majestic Mehrangarh in Jodhpur, and the romantic lake palaces of Udaipur — each monument whispers stories of Rajput valor, art, and architecture spanning 1,000+ years.';
    if (q.includes('hampi'))
      return '🪨 Hampi, the ruined capital of the Vijayanagara Empire (14th–16th century), is a surreal landscape of boulder-strewn hills, ancient temples, and royal enclosures. The Virupaksha Temple, Vittala Temple with its musical pillars, and the Stone Chariot are must-explores. A UNESCO World Heritage Site unlike any other.';
    if (q.includes('monument') || q.includes('visit') || q.includes('recommend'))
      return "🗺️ Here are some top heritage gems to explore:\n\n• 🕌 Taj Mahal, Agra — Romance & Mughal grandeur\n• 🏰 Amer Fort, Jaipur — Rajput architecture\n• 🪨 Hampi, Karnataka — Vijayanagara ruins\n• ⛪ Sun Temple, Konark — Architectural marvel\n• 🏛️ Ajanta & Ellora Caves — Ancient rock-cut wonders\n\nWhich would you like to explore deeper?";
    return "🏛️ That's a fascinating question about Indian heritage! HeritageVerse's full AI is coming soon with deep knowledge on thousands of monuments, cultural traditions, architecture styles, and historical narratives across India. For now, try asking about the Taj Mahal, Rajasthan, or Hampi!";
  };

  return (
    <>
      <style>{`
        .hv-widget * { box-sizing: border-box; }

        .hv-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          font-family: var(--font-geist-sans, 'Geist', sans-serif);
        }

        .hv-suggestion-pill {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212,165,116,0.35);
          border-radius: 24px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #4a3728;
          box-shadow: 0 4px 24px rgba(45,80,22,0.10), 0 1px 4px rgba(212,165,116,0.15);
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .dark .hv-suggestion-pill {
          background: rgba(30,24,18,0.90);
          color: #e8d4c4;
          border-color: rgba(212,165,116,0.3);
        }

        .hv-btn {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2d5016 0%, #4a7c28 50%, #d4a574 100%);
          box-shadow: 0 6px 28px rgba(45,80,22,0.35), 0 2px 8px rgba(212,165,116,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hv-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 36px rgba(45,80,22,0.45), 0 4px 12px rgba(212,165,116,0.25);
        }

        .hv-btn-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
        }

        .hv-btn-emoji { font-size: 22px; line-height: 1; }
        .hv-btn-label { font-size: 8px; font-weight: 700; color: #fff; letter-spacing: 0.04em; opacity: 0.9; }

        /* Pulse ring */
        .hv-btn::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(212,165,116,0.5);
          animation: hv-pulse 2.5s ease-in-out infinite;
        }

        @keyframes hv-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.25); }
        }

        /* ── CHAT PANEL ── */
        .hv-panel {
          position: fixed;
          bottom: 104px;
          right: 28px;
          z-index: 9999;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 560px;
          max-height: calc(100vh - 140px);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: rgba(250,247,240,0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(212,165,116,0.3);
          box-shadow:
            0 32px 80px rgba(45,80,22,0.18),
            0 8px 24px rgba(212,165,116,0.12),
            inset 0 1px 0 rgba(255,255,255,0.8);
          font-family: var(--font-geist-sans, 'Geist', sans-serif);
        }

        .dark .hv-panel {
          background: rgba(18,14,10,0.96);
          border-color: rgba(212,165,116,0.2);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(212,165,116,0.08);
        }

        /* Header */
        .hv-header {
          padding: 18px 20px 16px;
          background: linear-gradient(135deg, #2d5016 0%, #3d6b20 60%, #4a7c28 100%);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .hv-header::after {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(212,165,116,0.12);
        }

        .hv-header-icon {
          width: 44px; height: 44px;
          border-radius: 14px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          backdrop-filter: blur(8px);
        }

        .hv-header-text { flex: 1; min-width: 0; }
        .hv-header-title { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.2; }
        .hv-header-sub {
          font-size: 11px; color: rgba(255,255,255,0.75);
          display: flex; align-items: center; gap: 4px; margin-top: 2px;
        }
        .hv-online-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7ade6a;
          box-shadow: 0 0 6px #7ade6a;
          animation: hv-blink 2s ease-in-out infinite;
        }
        @keyframes hv-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .hv-close-btn {
          width: 32px; height: 32px;
          border-radius: 50%; border: none; cursor: pointer;
          background: rgba(255,255,255,0.15);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .hv-close-btn:hover { background: rgba(255,255,255,0.25); }

        /* Messages */
        .hv-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,165,116,0.3) transparent;
        }

        .hv-messages::-webkit-scrollbar { width: 4px; }
        .hv-messages::-webkit-scrollbar-track { background: transparent; }
        .hv-messages::-webkit-scrollbar-thumb { background: rgba(212,165,116,0.3); border-radius: 2px; }

        .hv-msg {
          max-width: 88%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 13.5px;
          line-height: 1.55;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .hv-msg-ai {
          align-self: flex-start;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(212,165,116,0.2);
          color: #2d2522;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 8px rgba(45,80,22,0.06);
        }

        .dark .hv-msg-ai {
          background: rgba(40,32,24,0.9);
          color: #e8d4c4;
          border-color: rgba(212,165,116,0.15);
        }

        .hv-msg-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #2d5016, #4a7c28);
          color: #fff;
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 16px rgba(45,80,22,0.25);
        }

        /* Typing dots */
        .hv-typing {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 2px;
        }
        .hv-typing span {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #d4a574;
          animation: hv-dot 1.2s ease-in-out infinite;
        }
        .hv-typing span:nth-child(2) { animation-delay: 0.2s; }
        .hv-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes hv-dot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Quick prompts */
        .hv-prompts {
          padding: 0 16px 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex-shrink: 0;
        }

        .hv-prompt-chip {
          font-size: 11.5px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(212,165,116,0.4);
          background: rgba(212,165,116,0.08);
          color: #4a3728;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .dark .hv-prompt-chip { color: #d4a574; border-color: rgba(212,165,116,0.3); background: rgba(212,165,116,0.05); }
        .hv-prompt-chip:hover { background: rgba(45,80,22,0.12); border-color: #2d5016; color: #2d5016; transform: translateY(-1px); }
        .dark .hv-prompt-chip:hover { background: rgba(212,165,116,0.12); border-color: #d4a574; color: #e8d4c4; }

        /* Input */
        .hv-input-row {
          padding: 12px 16px 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          border-top: 1px solid rgba(212,165,116,0.15);
          flex-shrink: 0;
          background: rgba(255,255,255,0.5);
        }

        .dark .hv-input-row { background: rgba(0,0,0,0.2); }

        .hv-input {
          flex: 1;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(212,165,116,0.3);
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 13.5px;
          color: #2d2522;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }

        .dark .hv-input { background: rgba(40,32,24,0.8); color: #e8d4c4; border-color: rgba(212,165,116,0.25); }
        .hv-input::placeholder { color: #9a8a7a; }
        .hv-input:focus { border-color: #d4a574; box-shadow: 0 0 0 3px rgba(212,165,116,0.15); }

        .hv-send {
          width: 40px; height: 40px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2d5016, #4a7c28);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
          box-shadow: 0 3px 12px rgba(45,80,22,0.3);
        }
        .hv-send:hover { transform: scale(1.08); box-shadow: 0 5px 18px rgba(45,80,22,0.4); }
        .hv-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        @media (max-width: 480px) {
          .hv-panel { width: calc(100vw - 16px); right: 8px; bottom: 90px; }
          .hv-fab { right: 16px; bottom: 16px; }
        }
      `}</style>

      <div className="hv-widget">
        {/* Floating button */}
        <div className="hv-fab">
          {/* Rotating suggestion pill */}
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div
                key={suggestionIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: suggestionVisible ? 1 : 0, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="hv-suggestion-pill"
              >
                ✨ {ROTATING_SUGGESTIONS[suggestionIndex]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            className="hv-btn"
            onClick={() => setIsOpen((v) => !v)}
            whileTap={{ scale: 0.93 }}
            aria-label="Open Heritage AI Assistant"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <ChevronDown size={26} color="#fff" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  className="hv-btn-inner"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <span className="hv-btn-emoji">🏛️</span>
                  <span className="hv-btn-label">Heritage AI</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Chat panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="hv-panel"
              initial={{ opacity: 0, scale: 0.88, y: 32, originX: 1, originY: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            >
              {/* Header */}
              <div className="hv-header">
                <div className="hv-header-icon">🏛️</div>
                <div className="hv-header-text">
                  <div className="hv-header-title">Heritage AI Guide</div>
                  <div className="hv-header-sub">
                    <span className="hv-online-dot" />
                    <span>Online · Powered by HeritageVerse</span>
                  </div>
                </div>
                <button
                  className="hv-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="hv-messages">
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    className={`hv-msg ${msg.role === 'ai' ? 'hv-msg-ai' : 'hv-msg-user'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, delay: i === 0 ? 0.1 : 0 }}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Quick prompts */}
              <div className="hv-prompts">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    className="hv-prompt-chip"
                    onClick={() => sendMessage(p)}
                    disabled={isTyping}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="hv-input-row">
                <input
                  ref={inputRef}
                  className="hv-input"
                  placeholder="Ask about any monument or heritage..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  disabled={isTyping}
                  maxLength={300}
                />
                <button
                  className="hv-send"
                  onClick={() => sendMessage(input)}
                  disabled={isTyping || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
