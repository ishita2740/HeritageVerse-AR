'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Landmark, X, ChevronLeft, ChevronRight, Search, Filter, ChevronDown } from 'lucide-react';

const cities = [
  {
    id: 1,
    name: 'Gateway of India',
    region: 'MUMBAI',
    city: 'Mumbai',
    state: 'Maharashtra',
    image: '/mumbai.png',
    desc: "Discover the city's monuments, colonial architecture, maritime heritage, and vibrant cultural legacy through interactive exploration.",
  },
  {
    id: 2,
    name: 'Howrah Bridge',
    region: 'KOLKATA',
    city: 'Kolkata',
    state: 'West Bengal',
    image: '/kolkata.webp',
    desc: "Discover the city's monuments, cultural legacy, local legends, and historical narratives through interactive exploration.",
  },
  {
    id: 3,
    name: 'Mysore Palace',
    region: 'MYSORE',
    city: 'Mysore',
    state: 'Karnataka',
    image: '/mysore.webp',
    desc: "Discover the city's royal palaces, Dravidian architecture, artistic traditions, and rich cultural heritage through interactive exploration.",
  },
  {
    id: 4,
    name: 'Ancient Ghats',
    region: 'VARANASI',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    image: '/varanasi.webp',
    desc: "Discover the city's ancient ghats, spiritual traditions, timeless rituals, and living cultural heritage through interactive exploration.",
  },
  {
    id: 5,
    name: 'India Gate',
    region: 'DELHI',
    city: 'Delhi',
    state: 'Delhi',
    image: '/new_delhi.png',
    desc: "Discover the city's iconic landmarks, Mughal heritage, freedom struggle history, and architectural grandeur through interactive exploration.",
  },
  {
    id: 6,
    name: 'Shaniwar Wada',
    region: 'PUNE',
    city: 'Pune',
    state: 'Maharashtra',
    image: '/pune.webp',
    desc: "Discover the city's Maratha forts, Peshwa heritage, vibrant culture, and historical landmarks through interactive exploration.",
  }
];

export default function CitySlider() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start near the middle
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const statesList = ['All', 'Maharashtra', 'West Bengal', 'Karnataka', 'Uttar Pradesh', 'Delhi'];

  const filteredCities = cities.filter(city => {
    const matchesState = selectedState === 'All' || city.state === selectedState;
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          city.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  // Reset to first slide when filters change to avoid out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchQuery, selectedState]);

  // Auto-play / Auto-rotate feature
  useEffect(() => {
    // Disable auto-play if filtering down to 1 item or if user is hovering
    if (filteredCities.length <= 1 || hoveredIndex !== null) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCities.length);
    }, 3500); // Rotate every 3.5 seconds

    return () => clearInterval(interval);
  }, [filteredCities.length, hoveredIndex]);

  // Auto-dismiss the coming soon modal after 2.5s
  useEffect(() => {
    if (selectedCity) {
      const timer = setTimeout(() => setSelectedCity(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [selectedCity]);

  const handleCardClick = (index: number, city: typeof cities[0]) => {
    setSelectedCity(city);
  };

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
  };

  const handleHoverEnd = () => {
    setHoveredIndex(null);
  };

  const handleNext = () => {
    if (filteredCities.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCities.length);
  };

  const handlePrev = () => {
    if (filteredCities.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCities.length) % filteredCities.length);
  };

  const getCardProps = (index: number) => {
    const len = filteredCities.length;
    if (len === 0) return { x: 0, y: 0, scale: 1, zIndex: 0, opacity: 0, filter: '', pointerEvents: 'none' as const };
    
    // Robust circular math that perfectly handles negative numbers in JS
    let diff = index - currentIndex;
    diff = ((diff % len) + len) % len;
    
    if (diff > Math.floor(len / 2)) {
      diff -= len;
    }

    const isHovered = hoveredIndex === index;
    const isCenter = diff === 0;

    let x = diff * 220; 
    let scale = isCenter ? 1 : 0.92; // Subtle scaling for premium depth
    let zIndex = 50 - Math.abs(diff);
    let y = isCenter ? -10 : 0; // Natural center lift
    let brightness = isCenter ? 1 : 0.65;
    
    // Smooth fade out for cards far away
    let opacity = 1;
    if (Math.abs(diff) > 2) opacity = 0;

    // Hover interactions
    if (isHovered) {
      y = -30; // Strong lift to "pop it up"
      scale = 1.05; // Noticeable scale up so it "comes out"
      brightness = 1; // Fully highlighted
      zIndex = 60; // Bring to absolute front over all other cards
    }

    return {
      x,
      y,
      scale,
      zIndex,
      opacity,
      filter: `brightness(${brightness})`,
      pointerEvents: Math.abs(diff) > 2 ? 'none' as const : 'auto' as const,
    };
  };

  return (
    <section id="explore" className="w-full pt-[100px] pb-[100px] bg-[#F5E3CC] overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-amber-800/40"></div>
            <MapPin className="w-5 h-5 text-amber-800" />
            <div className="w-12 h-[1px] bg-amber-800/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight">
            Explore India's Heritage
          </h2>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto font-light">
            Discover cultural treasures across every state.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-4 px-4 relative z-40">
          {/* Search Bar */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-900/40 group-focus-within:text-amber-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search monuments or cities (e.g. Mumbai)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white/90 transition-all text-stone-700 placeholder:text-stone-400 font-medium"
            />
          </div>
          
          {/* State Filter Dropdown */}
          <div className="md:w-72 relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-900/40 group-focus-within:text-amber-600 transition-colors pointer-events-none z-10" />
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white/90 transition-all text-stone-700 font-medium appearance-none cursor-pointer"
            >
              {statesList.map(s => (
                <option key={s} value={s} className="text-stone-700">{s === 'All' ? 'All States' : s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-900/40 pointer-events-none" />
          </div>
        </div>

        {/* Overlapping Carousel Container */}
        {filteredCities.length > 0 ? (
          <div className="relative w-full h-[600px] flex justify-center items-center perspective-1000">
            {filteredCities.map((city, index) => {
              const props = getCardProps(index);
              const isCenter = index === currentIndex;
              
              return (
              <motion.div
                key={city.id}
                onClick={() => handleCardClick(index, city)}
                onHoverStart={() => handleHoverStart(index)}
                onHoverEnd={handleHoverEnd}
                animate={{
                  x: props.x,
                  y: props.y,
                  scale: props.scale,
                  zIndex: props.zIndex,
                  opacity: props.opacity,
                  filter: props.filter,
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeInOut"
                }}
                className={`absolute w-[340px] md:w-[400px] h-[500px] rounded-[24px] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.15)]`}
                style={{
                  pointerEvents: props.pointerEvents,
                }}
              >
                {/* Image */}
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-serif font-bold text-white mb-1 leading-tight drop-shadow-md">
                    {city.name}
                  </h3>
                  <p className="text-white/80 font-medium text-sm tracking-wide uppercase">
                    {city.region}
                  </p>
                  
                  {/* Subtle active state indicator */}
                  <motion.div 
                    initial={false}
                    animate={{ height: hoveredIndex === index ? 'auto' : 0, opacity: hoveredIndex === index ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mt-4 text-amber-200 text-sm font-medium hover:text-white transition-colors">
                      <span>Explore Monument</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredIndex === index && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 rounded-[24px] border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-12 z-50 p-4 rounded-full bg-white/80 hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-amber-900 transition-transform hover:scale-110 active:scale-95 border border-amber-200/50"
            aria-label="Previous Monument"
            style={{ display: filteredCities.length <= 1 ? 'none' : 'block' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-12 z-50 p-4 rounded-full bg-white/80 hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-amber-900 transition-transform hover:scale-110 active:scale-95 border border-amber-200/50"
            aria-label="Next Monument"
            style={{ display: filteredCities.length <= 1 ? 'none' : 'block' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        ) : (
          <div className="w-full h-[400px] flex flex-col items-center justify-center text-stone-500 bg-white/30 backdrop-blur-sm rounded-3xl border border-amber-200/30">
            <Search className="w-12 h-12 mb-4 opacity-20 text-amber-900" />
            <p className="text-xl font-medium text-stone-600">No monuments found.</p>
            <p className="text-sm mt-2 opacity-70">Try adjusting your search or filter.</p>
          </div>
        )}
        
        {/* Navigation Hints */}
        {filteredCities.length > 1 && (
          <div className="mt-12 flex justify-center gap-4">
            {filteredCities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-amber-800' : 'w-2 bg-amber-800/30 hover:bg-amber-800/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Coming Soon Modal */}
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedCity(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#F8F5EF] rounded-3xl p-10 max-w-md w-[90%] shadow-2xl border border-amber-200/60 text-center"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-500 hover:bg-stone-300/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6 text-amber-700">
                  <Landmark className="w-8 h-8" />
                </div>

                {/* Coming Soon Text */}
                <h3 className="text-3xl font-serif font-bold text-stone-800 mb-4">
                  Coming Soon
                </h3>
                <p className="text-stone-600 text-base mb-4 leading-relaxed">
                  We're building a rich digital heritage experience for <span className="font-semibold text-amber-800">{selectedCity.city}</span>.
                </p>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                  {selectedCity.desc}
                </p>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="w-8 h-[1px] bg-amber-600/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <div className="w-8 h-[1px] bg-amber-600/40"></div>
                </div>

                <p className="text-sm font-medium text-stone-700 tracking-wide">
                  Launching soon.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
