import React, { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { floorPlansData } from '../../data/floorPlansData';
import { DecorativeShape } from '../common/DecorativeShape';
import { motion, AnimatePresence } from 'framer-motion';

export function FloorPlans({ onOpenModal }) {
  const [activeMainTab, setActiveMainTab] = useState("master");
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainTabs = [
    { id: "master", label: "Master Plan", sub: "01" },
    { id: "units", label: "Unit Plan", sub: "02" },
    { id: "blocks", label: "Block Plan", sub: "03" }
  ];

  // Helper to get current image
  const getActiveImage = () => {
    if (activeMainTab === 'master') return floorPlansData.master.image;
    if (activeMainTab === 'blocks') return floorPlansData.blocks[activeBlockIndex].image;
    return null; // Units uses a grid
  };

  return (
    <>
      <section id="floor-plans" className="relative py-24 overflow-hidden" style={{ background: COLORS.darkMid }}>
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

        <div className="sa-container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-xl">
              <SectionLabel onDark={true}>Space Anatomy</SectionLabel>
              <h2 className="sa-serif text-white text-5xl md:text-6xl font-light tracking-tighter mt-4">
                Precision <span className="italic" style={{ color: COLORS.primary }}>Engineering.</span>
              </h2>
            </div>

            {/* COMPACT TOP TABS */}
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
              {mainTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveMainTab(t.id)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeMainTab === t.id ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* BLUEPRINT DISPLAY STAGE */}
            <div className="lg:col-span-9 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMainTab + (activeMainTab === 'blocks' ? activeBlockIndex : '')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative group bg-[#1a1c12] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl"
                  style={{ height: '550px' }}
                >
                  {activeMainTab === 'units' ? (
                    /* UNITS GRID VIEW */
                    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {floorPlansData.units.map((plan, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4 items-center hover:bg-white/10 transition-all cursor-pointer" onClick={() => { setIsZoomed(plan.image) }}>
                            <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 p-2">
                              <img src={plan.image} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-sm">{plan.title}</h4>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Tap to Expand</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* MASTER & BLOCK IMAGE VIEW */
                    <div className="relative h-full flex items-center justify-center p-12">
                      {/* Scale / Coordinates Decor */}
                      <div className="absolute top-6 left-6 text-[9px] font-mono text-white/20 uppercase tracking-widest">
                        Ref_Axis: 24.089 / N
                      </div>

                      <img
                        src={getActiveImage()}
                        alt="Blueprint"
                        className={`max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ${activeMainTab === 'blocks' ? 'bg-white p-6 rounded-lg' : ''}`}
                      />

                      {/* Hover Overlay Controls */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={() => setIsZoomed(getActiveImage())}
                          className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          Inspect Details
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* BLOCK SELECTOR SUB-MENU */}
              {activeMainTab === 'blocks' && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {floorPlansData.blocks.map((block, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBlockIndex(idx)}
                      className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all ${activeBlockIndex === idx ? 'bg-primary text-black' : 'bg-white/5 text-white/40 border border-white/5'
                        }`}
                      style={{ backgroundColor: activeBlockIndex === idx ? COLORS.primary : '' }}
                    >
                      {block.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SIDEBAR SPECS */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="sticky top-24 space-y-6">
                <div className="p-8 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <h3 className="text-white text-xl font-bold mb-4">Technical Specs</h3>
                  <div className="space-y-4">
                    {[
                      { l: "Efficiency", v: "84%" },
                      { l: "Green Area", v: "70%" },
                      { l: "Open Side", v: "3-Side" }
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-[10px] text-white/30 uppercase font-bold">{s.l}</span>
                        <span className="text-sm text-white font-mono">{s.v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={onOpenModal} className="w-full mt-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: COLORS.primary, color: '#000' }}>
                    Request Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULLSCREEN ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-20"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center overflow-auto custom-scrollbar"
            >
              <img src={isZoomed} alt="Zoomed View" className="max-w-none w-auto h-[120vh] md:h-[150vh] object-contain cursor-grab active:cursor-grabbing" />
            </motion.div>

            <div className="absolute bottom-10 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] uppercase tracking-widest font-bold">
              Scroll to explore every corner
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WaveDarkToLight fromColor={COLORS.darkMid} toColor={COLORS.warmWhite} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </>
  );
}