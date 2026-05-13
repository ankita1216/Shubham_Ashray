import React, { useState, useCallback, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { galleryData } from '../../data/galleryData';

export function Gallery() {
  const [active, setActive] = useState(0);
  const total = galleryData.length;

  const next = useCallback(() => setActive((prev) => (prev + 1) % total), [total]);
  const prev = useCallback(() => setActive((prev) => (prev - 1 + total) % total), [total]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden py-24 px-6 md:px-12"
        style={{ background: COLORS.luxBeige }}
      >
        {/* Subtle Background Accent */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: `${COLORS.primary}15` }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <SectionLabel onDark={false}>Portfolio</SectionLabel>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none" style={{ color: COLORS.textDark }}>
                Visual <span className="italic font-serif" style={{ color: COLORS.primary }}>Excellence.</span>
              </h2>
            </div>

            <div className="hidden md:block text-right">
              <p className="text-xs uppercase tracking-widest opacity-40 mb-2">Viewing Project</p>
              <div className="text-4xl font-mono font-bold" style={{ color: COLORS.textDark }}>
                {(active + 1).toString().padStart(2, '0')} <span className="text-lg opacity-20">/ {total.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Main Showcase Stage */}
          <div className="relative group">
            <div className="aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl relative">
              {galleryData.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${idx === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Elegant Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Content Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                    <div className="max-w-lg">
                      <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70 mb-2">Featured Design</p>
                      <h3 className="text-2xl md:text-4xl font-serif italic">{item.label}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full border border-white/20 bg-black/10 backdrop-blur-md text-white pointer-events-auto flex items-center justify-center hover:bg-white hover:text-black transition-all transform hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full border border-white/20 bg-black/10 backdrop-blur-md text-white pointer-events-auto flex items-center justify-center hover:bg-white hover:text-black transition-all transform hover:scale-110"
              >
                →
              </button>
            </div>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex justify-center mt-10 gap-3">
            {galleryData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className="h-1.5 transition-all duration-500 rounded-full"
                style={{
                  width: idx === active ? '40px' : '8px',
                  backgroundColor: idx === active ? COLORS.primary : `${COLORS.textDark}20`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.luxBeige} toColor={COLORS.darkMid} />
    </>
  );
}