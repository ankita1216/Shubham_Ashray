import React, { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { floorPlansData } from '../../data/floorPlansData';
import { DecorativeShape } from '../common/DecorativeShape';
import { motion, AnimatePresence } from 'framer-motion';

export function FloorPlans({ onOpenModal }) {
  const [activeMainTab, setActiveMainTab] = useState("master"); // master, units, blocks
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  const mainTabs = [
    { id: "master", label: "Master Plan" },
    { id: "units", label: "Unit Plan" },
    { id: "blocks", label: "Block" }
  ];

  return (
    <>
      <section id="floor-plans" className="sa-sans sa-noise sa-section" style={{ background: COLORS.darkMid, position: "relative", overflow: "hidden", minHeight: '900px' }}>
        <div className="absolute -top-24 right-0" style={{ width: 450, height: 450, background: `radial-gradient(circle, ${COLORS.primary}0F 0%, transparent 70%)`, pointerEvents: "none" }} />
        
        <DecorativeShape 
          size={500} 
          opacity={0.14} 
          rotate={160} 
          className="-bottom-32 -right-32" 
        />

        <div className="sa-container">
          <div className="sa-reveal"><SectionLabel onDark={true}>Layouts & Plans</SectionLabel></div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, color: "#fff", marginBottom: 20 }}>
                Architectural <span style={{ color: COLORS.primary }}>Excellence</span>
              </h2>
              <p className="sa-reveal sa-d2" style={{ fontSize: 16, color: COLORS.mutedDark, lineHeight: 1.8, maxWidth: 520 }}>
                Explore our meticulously designed site layouts, unit configurations, and block-wise detailing.
              </p>
            </div>

            {/* MAIN TABS */}
            <div className="sa-reveal sa-d3 flex gap-2 p-1.5 rounded-2xl w-fit"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {mainTabs.map((t) => (
                <button 
                  key={t.id} 
                  style={{ 
                    background: activeMainTab === t.id ? COLORS.primary : 'transparent',
                    color: activeMainTab === t.id ? COLORS.darkNavy : 'rgba(255,255,255,0.4)',
                  }}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-bold tracking-wide ${activeMainTab === t.id ? "shadow-lg shadow-black/20" : "hover:text-white/70"}`}
                  onClick={() => setActiveMainTab(t.id)}
                >
                  {t.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeMainTab === 'master' && (
                <motion.div
                  key="master"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full max-w-5xl rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-4 lg:p-8 backdrop-blur-sm">
                    <img 
                      src={floorPlansData.master.image} 
                      alt="Master Plan" 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                      style={{ filter: 'contrast(1.05) brightness(1.05)' }}
                    />
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">The Master Plan</h3>
                        <p className="text-white/50 text-sm">Strategic placement of 9 towers with 70% open landscape.</p>
                      </div>
                      <button 
                        onClick={onOpenModal}
                        className="sa-btn-primary px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                      >
                        Enquire for Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeMainTab === 'units' && (
                <motion.div
                  key="units"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {floorPlansData.units.map((plan, idx) => (
                    <div key={idx} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-3 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white mb-4">
                        <img 
                          src={plan.image} 
                          alt={plan.title} 
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-lg font-bold text-white mb-4">{plan.title}</h4>
                        <button 
                          onClick={onOpenModal}
                          className="w-full py-3 rounded-lg border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#15170F] transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeMainTab === 'blocks' && (
                <motion.div
                  key="blocks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-10"
                >
                  {/* SUB TABS FOR BLOCKS */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {floorPlansData.blocks.map((block, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveBlockIndex(idx)}
                        style={{
                          background: activeBlockIndex === idx ? COLORS.primary : 'rgba(255,255,255,0.05)',
                          color: activeBlockIndex === idx ? COLORS.darkNavy : 'rgba(255,255,255,0.4)',
                        }}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeBlockIndex === idx ? "" : "hover:bg-white/10"}`}
                      >
                        {block.name}
                      </button>
                    ))}
                  </div>

                  <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-4 lg:p-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeBlockIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={floorPlansData.blocks[activeBlockIndex].image} 
                          alt={floorPlansData.blocks[activeBlockIndex].name} 
                          className="w-full h-auto rounded-xl shadow-xl bg-white p-4"
                        />
                        <div className="mt-8 text-center">
                          <h3 className="text-xl font-bold text-white mb-2">{floorPlansData.blocks[activeBlockIndex].name} Layout</h3>
                          <p className="text-white/40 text-sm mb-6">Detailed floor-wise planning for {floorPlansData.blocks[activeBlockIndex].name}.</p>
                          <button 
                            onClick={onOpenModal}
                            className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition-all"
                          >
                            Download Full Block Plan
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkMid} toColor={COLORS.warmWhite} />
    </>
  );
}
