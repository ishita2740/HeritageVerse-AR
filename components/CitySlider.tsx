'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const cities = [
  {
    id: 1,
    name: 'Taj Mahal',
    region: 'Agra',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Hampi',
    region: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Jaipur',
    region: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1586902419420-d8bae76c9b8f?w=500&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'Varanasi',
    region: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846ca8?w=500&h=600&fit=crop',
  },
  {
    id: 5,
    name: 'Ajanta Caves',
    region: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1578926078328-123456789012?w=500&h=600&fit=crop',
  },
  {
    id: 6,
    name: 'Konark Temple',
    region: 'Odisha',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=600&fit=crop',
  },
];

export default function CitySlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % cities.length);
  const prev = () => setCurrent((prev) => (prev - 1 + cities.length) % cities.length);

  return (
    <section id="explore" className="w-full py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Explore India's <span className="text-secondary">Heritage</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover cultural treasures across every state.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Display */}
          <div className="relative h-96 overflow-hidden rounded-2xl bg-muted shadow-2xl">
            <div className="relative w-full h-full">
              {cities.map((city, index) => (
                <div
                  key={city.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* City Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-sm font-semibold text-secondary mb-2">
                      {cities[current].region}
                    </p>
                    <h3 className="text-4xl font-bold">{cities[current].name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur p-2 hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="Previous city"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur p-2 hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="Next city"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Thumbnails Carousel */}
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4 px-2">
            {cities.map((city, index) => (
              <button
                key={city.id}
                onClick={() => setCurrent(index)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden transition-all transform hover:scale-110 ${index === current
                    ? 'ring-2 ring-secondary shadow-lg scale-110'
                    : 'opacity-60 hover:opacity-100'
                  }`}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover"
                />
                {index === current && (
                  <div className="absolute inset-0 bg-secondary/20" />
                )}
              </button>
            ))}
          </div>

          {/* Indicator Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {cities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${index === current
                    ? 'bg-secondary w-8'
                    : 'bg-muted-foreground/40 w-2 hover:bg-muted-foreground/60'
                  }`}
                aria-label={`Go to city ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
