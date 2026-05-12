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
import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  // Initialize hooks
  useReveal();
  useCounter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sa-main-wrapper">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Overview />
        <Amenities />
        <VideoSection />
        <Gallery />
        <FloorPlans />
        <Location />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
