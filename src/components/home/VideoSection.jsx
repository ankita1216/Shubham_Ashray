import React, { useRef, useState } from 'react';
import { COLORS } from '../../constants/colors';
import { WaveDarkToLight } from '../common/Dividers';

export function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <section className="sa-sans py-24" style={{ background: COLORS.darkBlue, position: 'relative' }}>
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${COLORS.darkMid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.darkMid} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="sa-container relative z-10">
          {/* Header Section */}
          <div className="max-w-3xl mb-16">
            <h2 className="sa-serif text-white text-4xl md:text-5xl mb-4 leading-tight">
              Experience Your <span style={{ color: COLORS.pink }}>Future Home</span> Today
            </h2>
            <div className="h-1 w-20 mb-6" style={{ background: COLORS.pink }} />
            <p className="text-lg opacity-80" style={{ color: COLORS.mutedDark, maxWidth: '600px' }}>
              Step inside Subham Ashray through an immersive cinematic experience.
              Visualize every detail, from the sun-drenched balconies to the premium finishes.
            </p>
          </div>

          {/* Video Container */}
          <div
            className="sa-reveal group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 shadow-2xl"
            style={{
              minHeight: 500,
              background: '#000',
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={handleTogglePlay}
          >
            {/* The Actual Video */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
              loop
              muted
              playsInline
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-architecture-23133-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Dark Gradient Overlay for Readability */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-30' : 'opacity-60'}`}
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Content Overlay */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ${isPlaying ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>

              {/* Play Button */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: COLORS.pink }} />
                <div className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: 90,
                    height: 90,
                    background: `linear-gradient(135deg, ${COLORS.pink} 0%, #ff4d97 100%)`,
                    boxShadow: `0 0 40px ${COLORS.pink}88`
                  }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5.14V19.14L19 12.14L8 5.14Z" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <span className="uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block text-white/70">Virtual Tour</span>
                <h3 className="sa-serif text-white text-3xl font-semibold mb-2">The Cinematic Walkthrough</h3>
                <p style={{ color: COLORS.mutedDark }} className="text-sm font-light">Click to experience the project in 3D</p>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Now Streaming</span>
                </div>
                <span className="text-white text-sm font-medium">Subham Ashray · Interior View</span>
              </div>

              {/* Controls Hint */}
              <div className="px-4 py-2 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-[10px] text-white/60 uppercase tracking-tight">
                {isPlaying ? 'Click to Pause' : 'Click to Play'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDarkToLight fromColor={COLORS.darkBlue} toColor={COLORS.softCream} />
    </>
  );
}