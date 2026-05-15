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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize hooks
  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
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
  );
}
