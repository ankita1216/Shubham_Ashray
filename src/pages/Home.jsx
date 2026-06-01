import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/home/Hero';
import { Overview } from '../components/home/Overview';
import { Amenities } from '../components/home/Amenities';
import { VideoSection } from '../components/home/VideoSection';
import { Gallery } from '../components/home/Gallery';
import { FloorPlans } from '../components/home/FloorPlans';
import { Location } from '../components/home/Location';
import { About } from '../components/home/About';
import { Contact } from '../components/home/Contact';
import LeadModal from '../components/common/LeadModal';
import BottomEnquiryForm from '../components/common/BottomEnquiryForm';
import { useReveal } from '../hooks/useReveal';
import logoImg from '../assets/images/logo.png';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeout, setFadeout] = useState(false);
  
  // Initialize hooks
  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
      const doneTimer = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(doneTimer);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 99999,
            background: '#06070A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeout ? 0 : 1,
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: fadeout ? 'none' : 'auto',
            overflow: 'hidden',
          }}
        >
          {/* Animated luxury backdrop glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,164,77,0.14) 0%, transparent 60%)',
              pointerEvents: 'none',
              animation: 'luxuryGlow 6s ease-in-out infinite',
            }}
          />

          {/* Blueprint-style fine luxury lines for aesthetic background detail */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(400px, 90vw)',
              height: 'min(400px, 90vw)',
              border: '1px solid rgba(201,164,77,0.03)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '1px',
              height: '240px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,164,77,0.08), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '240px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(201,164,77,0.08), transparent)',
              pointerEvents: 'none',
            }}
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, zIndex: 10 }}>
            {/* Elegant Double Ring Pulsing Logo Wrapper */}
            <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Outer micro-dashed rotating ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px dashed rgba(201,164,77,0.22)',
                  animation: 'rotateRing 16s linear infinite',
                }}
              />

              {/* Middle fine solid rotating ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 12,
                  borderRadius: '50%',
                  border: '1px solid rgba(201,164,77,0.09)',
                  borderTopColor: 'rgba(201,164,77,0.3)',
                  animation: 'rotateRingReverse 8s linear infinite',
                }}
              />

              {/* Inner core card containing the branding image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 24,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(201,164,77,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 14,
                  boxShadow: '0 0 40px rgba(201,164,77,0.12)',
                  animation: 'pulseLogo 2.5s ease-in-out infinite',
                }}
              >
                <img 
                  src={logoImg} 
                  alt="Subham Group" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Premium Text Branding */}
            <div style={{ textAlign: 'center', color: '#FFFFFF', marginTop: 4 }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.42)',
                marginBottom: 8,
                animation: 'luxuryLetterSpacing 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}>
                Subham Ashray
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 44,
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C9A44D',
                fontStyle: 'italic',
                animation: 'luxuryFadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
              }}>
                Aha Life
              </div>
            </div>

            {/* Symmetrical hair-thin loading bar */}
            <div style={{
              height: 1,
              background: 'rgba(201, 164, 77, 0.08)',
              borderRadius: 9,
              marginTop: 10,
              position: 'relative',
              animation: 'lineExpand 1.5s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, #C9A44D, transparent)',
                  borderRadius: 9,
                }}
              />
            </div>
          </div>

          <style>{`
            @keyframes pulseLogo {
              0%, 100% { transform: scale(1); opacity: 0.95; box-shadow: 0 0 30px rgba(201,164,77,0.1); }
              50% { transform: scale(1.04); opacity: 1; box-shadow: 0 0 50px rgba(201,164,77,0.22); }
            }
            @keyframes rotateRing {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateRingReverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes luxuryLetterSpacing {
              0% { letter-spacing: 0.15em; opacity: 0; filter: blur(4px); }
              35% { opacity: 0.7; filter: blur(2px); }
              100% { letter-spacing: 0.42em; opacity: 1; filter: blur(0); }
            }
            @keyframes luxuryFadeIn {
              0% { opacity: 0; transform: translateY(8px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes luxuryGlow {
              0%, 100% { opacity: 0.45; transform: scale(0.94); }
              50% { opacity: 0.85; transform: scale(1.06); }
            }
            @keyframes lineExpand {
              0% { width: 0px; opacity: 0; }
              20% { opacity: 0.8; }
              100% { width: 260px; opacity: 1; }
            }
          `}</style>
        </div>
      )}

      <div className="sa-main-wrapper">
        <Navbar scrolled={scrolled} onOpenModal={openModal} />
        <main>
          <Hero onOpenModal={openModal} />
          <Overview />
          <Amenities onOpenModal={openModal} />
          <VideoSection />
          <Gallery />
          <FloorPlans onOpenModal={openModal} />
          <Location />
          <Contact />
          <About />
        </main>
        <Footer />
        
        <LeadModal isOpen={isModalOpen} onClose={closeModal} />
        <BottomEnquiryForm />
      </div>
    </>
  );
}
