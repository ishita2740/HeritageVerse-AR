'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShieldCheck, 
  Globe, 
  Bot, 
  Box, 
  MapPin, 
  Landmark,
  Users,
  Cpu,
  Leaf,
  Heart
} from 'lucide-react';

const features = [
  {
    title: "HERITAGE STORY ENGINE",
    icon: BookOpen,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-400",
    shadowColor: "shadow-amber-200/50",
    angle: 0,
    items: ["AI Narratives", "Oral Histories", "Local Legends", "Voice Narration"]
  },
  {
    title: "HERITAGE PROTECTION NETWORK",
    icon: ShieldCheck,
    color: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    shadowColor: "shadow-green-200/50",
    angle: 60,
    items: ["Community Reporting", "Damage Alerts", "Risk Monitoring", "Heritage Danger Map"]
  },
  {
    title: "HERITAGE PASSPORT",
    icon: Globe,
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
    shadowColor: "shadow-purple-200/50",
    angle: 120,
    items: ["Collect Stamps", "Take Quizzes", "Earn Badges", "Level Up"]
  },
  {
    title: "HERITAGE AI GUIDE",
    icon: Bot,
    color: "text-indigo-700",
    bgColor: "bg-indigo-100",
    borderColor: "border-indigo-400",
    shadowColor: "shadow-indigo-200/50",
    angle: 180,
    items: ["Ask Questions", "Cultural Insights", "Personalized", "Recommendations"]
  },
  {
    title: "3D & AR EXPLORER",
    icon: Box,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
    shadowColor: "shadow-blue-200/50",
    angle: 240,
    items: ["Interactive 3D Models", "AR Experiences", "Architecture Inspection"]
  },
  {
    title: "MONUMENT EXPLORER",
    icon: MapPin,
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-400",
    shadowColor: "shadow-orange-200/50",
    angle: 300,
    items: ["Search Monuments", "Historical Details", "Preservation Status"]
  }
];

const bottomPills = [
  {
    title: "Built for Communities",
    desc: "By the people, for the heritage.",
    icon: Users,
    color: "text-amber-800"
  },
  {
    title: "Powered by Technology",
    desc: "AI, AR & data for real impact.",
    icon: Cpu,
    color: "text-amber-800"
  },
  {
    title: "Preserve for Future",
    desc: "Safeguarding our legacy for future generations.",
    icon: Leaf,
    color: "text-amber-800"
  },
  {
    title: "Learn. Share. Protect.",
    desc: "Together, we keep heritage alive.",
    icon: Heart,
    color: "text-amber-800"
  }
];

export default function FeaturesSection() {
  const radius = 380;
  const cx = 550;
  const cy = 550;

  return (
    <section id="features" className="w-full py-20 bg-[#F8F5EF] relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full border border-amber-900/10 animate-[spin_120s_linear_infinite]" 
             style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(120, 80, 20, 0.05) 15deg 30deg)' }}></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-900/15 animate-[spin_90s_linear_infinite_reverse]" 
             style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, rgba(120, 80, 20, 0.05) 0deg 10deg, transparent 10deg 20deg)' }}></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border-2 border-amber-900/10 border-dashed"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F8F5EF_70%)]"></div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-2 md:mb-6 text-center flex flex-col items-center z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
            <div className="w-8 h-[1px] bg-amber-600/50"></div>
            <h5 className="text-xs font-bold tracking-[0.2em] text-amber-800 uppercase">Our Features</h5>
            <div className="w-8 h-[1px] bg-amber-600/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4 tracking-tight">
            Everything You Need <span className="text-amber-700 font-medium italic">to</span> Explore Heritage
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl text-center leading-relaxed font-light">
            HeritageVerse combines AI, immersive technology and community power<br className="hidden md:block" /> 
            to discover, experience and protect India's rich cultural legacy.
          </p>
        </div>

        {/* The Wheel (Scales down on smaller screens) */}
        <style>{`
          .wheel-wrapper { height: 385px; }
          @media (min-width: 640px) { .wheel-wrapper { height: 550px; } }
          @media (min-width: 768px) { .wheel-wrapper { height: 715px; } }
          @media (min-width: 1024px) { .wheel-wrapper { height: 880px; } }
          @media (min-width: 1280px) { .wheel-wrapper { height: 990px; } }
          @media (min-width: 1536px) { .wheel-wrapper { height: 1100px; } }
        `}</style>
        <div className="w-full flex justify-center items-center overflow-visible mb-16 mt-4 wheel-wrapper">
          {/* Container creates the scaling factor for responsiveness */}
          <div className="relative w-[1100px] h-[1100px] shrink-0 scale-[0.35] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.8] xl:scale-90 2xl:scale-100 origin-center transition-transform duration-500">
            
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1100 1100">
              <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(180, 140, 60, 0.2)" strokeWidth="2" strokeDasharray="6,6" />
              {features.map((f, i) => {
                const angleRad = (f.angle - 90) * (Math.PI / 180);
                const x = cx + radius * Math.cos(angleRad);
                const y = cy + radius * Math.sin(angleRad);
                return (
                  <g key={`line-${i}`}>
                    <line x1={cx} y1={cy} x2={x} y2={y} stroke="url(#goldGradient)" strokeWidth="3" opacity="0.4" />
                    <circle cx={x} cy={y} r="6" fill="#fff" stroke="rgba(180, 140, 60, 0.8)" strokeWidth="2" />
                    {/* Glowing dots along the line */}
                    <circle cx={cx + (x - cx) * 0.5} cy={cy + (y - cy) * 0.5} r="3" fill="rgba(180, 140, 60, 0.8)" className="animate-ping" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                  </g>
                );
              })}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Node */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white shadow-[0_0_60px_rgba(217,119,6,0.15)] flex flex-col items-center justify-center p-8 border-[6px] border-[#F8F5EF] z-20"
            >
              <div className="absolute inset-0 rounded-full border border-amber-200/60 m-2"></div>
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-700 shadow-inner">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold tracking-widest text-stone-800 mb-2">HERITAGEVERSE</h3>
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              </div>
              <p className="text-sm text-stone-500 text-center leading-snug">
                AI-powered platform to<br/>explore, experience and<br/>protect India's cultural heritage.
              </p>
            </motion.div>

            {/* Feature Nodes */}
            {features.map((feature, index) => {
              const angleRad = (feature.angle - 90) * (Math.PI / 180);
              const x = cx + radius * Math.cos(angleRad);
              const y = cy + radius * Math.sin(angleRad);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                  whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  className={`absolute w-[280px] h-[280px] rounded-full bg-white/95 backdrop-blur-md shadow-xl flex flex-col items-center justify-center p-6 border-[3px] ${feature.borderColor} cursor-pointer group transition-all duration-300`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                >
                  <div className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color} transition-transform group-hover:scale-110 duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-[15px] font-bold text-stone-800 mb-3 text-center leading-tight max-w-[160px] tracking-wide">
                    {feature.title}
                  </h4>
                  <ul className="text-xs text-stone-500 flex flex-col gap-1.5 w-full items-center">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${feature.bgColor.replace('bg-', 'bg-').replace('100', '400')}`}></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Outer glow on hover */}
                  <div className={`absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500 ${feature.shadowColor}`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pills Section */}
        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-stone-200">
          {bottomPills.map((pill, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/80 transition-colors">
              <div className={`w-10 h-10 rounded-full bg-[#F8F5EF] flex items-center justify-center shrink-0 ${pill.color}`}>
                <pill.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-stone-800">{pill.title}</span>
                <span className="text-xs text-stone-500 leading-snug mt-0.5">{pill.desc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
