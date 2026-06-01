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
          className="sa-preloader-container"
          style={{
            opacity: fadeout ? 0 : 1,
            pointerEvents: fadeout ? 'none' : 'auto',
          }}
        >
          {/* Animated luxury backdrop glow */}
          <div className="sa-preloader-glow" />

          {/* Blueprint-style fine luxury lines for aesthetic background detail */}
          <div className="sa-preloader-bg-circle" />
          <div className="sa-preloader-bg-line-v" />
          <div className="sa-preloader-bg-line-h" />
          
          <div className="sa-preloader-content">
            {/* Elegant Double Ring Pulsing Logo Wrapper */}
            <div className="sa-preloader-logo-wrap">
              {/* Outer micro-dashed rotating ring */}
              <div className="sa-preloader-ring-outer" />

              {/* Middle fine solid rotating ring */}
              <div className="sa-preloader-ring-middle" />

              {/* Inner core card containing the branding image */}
              <div className="sa-preloader-logo-inner">
                <img 
                  src={logoImg} 
                  alt="Subham Group" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Premium Text Branding */}
            <div style={{ textAlign: 'center', color: '#FFFFFF', marginTop: 4 }}>
              <div className="sa-preloader-brand-title">
                Subham Ashray
              </div>
              <div className="sa-preloader-brand-subtitle">
                Aha Life
              </div>
            </div>

            {/* Symmetrical hair-thin loading bar */}
            <div className="sa-preloader-bar">
              <div className="sa-preloader-bar-inner" />
            </div>
          </div>

          <style>{`
            .sa-preloader-container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100vw;
              height: 100dvh;
              z-index: 99999;
              background: #06070A;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
              overflow: hidden;
              --loading-bar-width: 260px;
            }
            .sa-preloader-glow {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-image: radial-gradient(circle at 50% 50%, rgba(201,164,77,0.14) 0%, transparent 60%);
              pointer-events: none;
              animation: luxuryGlow 6s ease-in-out infinite;
            }
            .sa-preloader-bg-circle {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: min(400px, 90vw);
              height: min(400px, 90vw);
              border: 1px solid rgba(201,164,77,0.03);
              border-radius: 50%;
              pointer-events: none;
            }
            .sa-preloader-bg-line-v {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 1px;
              height: 240px;
              background: linear-gradient(to bottom, transparent, rgba(201,164,77,0.08), transparent);
              pointer-events: none;
            }
            .sa-preloader-bg-line-h {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 240px;
              height: 1px;
              background: linear-gradient(to right, transparent, rgba(201,164,77,0.08), transparent);
              pointer-events: none;
            }
            .sa-preloader-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 28px;
              z-index: 10;
            }
            .sa-preloader-logo-wrap {
              position: relative;
              width: 180px;
              height: 180px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .sa-preloader-ring-outer {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 50%;
              border: 1px dashed rgba(201,164,77,0.22);
              animation: rotateRing 16s linear infinite;
            }
            .sa-preloader-ring-middle {
              position: absolute;
              top: 12px;
              left: 12px;
              right: 12px;
              bottom: 12px;
              border-radius: 50%;
              border: 1px solid rgba(201,164,77,0.09);
              border-top-color: rgba(201,164,77,0.3);
              animation: rotateRingReverse 8s linear infinite;
            }
            .sa-preloader-logo-inner {
              position: absolute;
              top: 24px;
              left: 24px;
              right: 24px;
              bottom: 24px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(201,164,77,0.28);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 14px;
              box-shadow: 0 0 40px rgba(201,164,77,0.12);
              animation: pulseLogo 2.5s ease-in-out infinite;
            }
            .sa-preloader-brand-title {
              font-family: 'Outfit', sans-serif;
              font-size: 16px;
              font-weight: 600;
              letter-spacing: 0.42em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.42);
              margin-bottom: 8px;
              animation: luxuryLetterSpacing 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .sa-preloader-brand-subtitle {
              font-family: 'Cormorant Garamond', serif;
              font-size: 44px;
              font-weight: 300;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              color: #C9A44D;
              font-style: italic;
              animation: luxuryFadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
            }
            .sa-preloader-bar {
              height: 1px;
              background: rgba(201, 164, 77, 0.08);
              border-radius: 9px;
              margin-top: 10px;
              position: relative;
              animation: lineExpand 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .sa-preloader-bar-inner {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: linear-gradient(90deg, transparent, #C9A44D, transparent);
              border-radius: 9px;
            }

            @media (max-width: 480px) {
              .sa-preloader-container {
                --loading-bar-width: 180px;
              }
              .sa-preloader-bg-circle {
                width: min(280px, 85vw);
                height: min(280px, 85vw);
              }
              .sa-preloader-bg-line-v {
                height: 180px;
              }
              .sa-preloader-bg-line-h {
                width: 180px;
              }
              .sa-preloader-content {
                gap: 20px;
              }
              .sa-preloader-logo-wrap {
                width: 130px;
                height: 130px;
              }
              .sa-preloader-ring-middle {
                top: 8px;
                left: 8px;
                right: 8px;
                bottom: 8px;
              }
              .sa-preloader-logo-inner {
                top: 16px;
                left: 16px;
                right: 16px;
                bottom: 16px;
                padding: 10px;
                box-shadow: 0 0 25px rgba(201,164,77,0.1);
              }
              .sa-preloader-brand-title {
                font-size: 12px;
                letter-spacing: 0.32em;
                margin-bottom: 6px;
              }
              .sa-preloader-brand-subtitle {
                font-size: 32px;
                letter-spacing: 0.12em;
              }
            }

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
              100% { width: var(--loading-bar-width, 260px); opacity: 1; }
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
