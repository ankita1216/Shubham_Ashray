import React from 'react';
import { COLORS } from '../../constants/colors';
import logoImg from '../../assets/images/logo.png';

export function Navbar({ scrolled, onOpenModal }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? "0" : "0", // Padding handled by container
        background: scrolled ? `${COLORS.darkNavy}E6` : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}>
      <div className="sa-container flex items-center justify-between"
        style={{
          paddingTop: scrolled ? "4px" : "8px",
          paddingBottom: scrolled ? "4px" : "8px",
          transition: "padding 0.3s ease"
        }}>
      <div className="flex items-center">
        <img 
          src={logoImg} 
          alt="Subham Ashray" 
          style={{ 
            height: scrolled ? "56px" : "80px", 
            width: "auto",
            transition: "height 0.3s ease" 
          }} 
        />
      </div>
      <div className="hidden lg:flex items-center gap-12">
        <ul className="flex items-center gap-9" style={{ listStyle: "none" }}>
          {["Overview", "Amenities", "Walkthrough Video", "Gallery", "Floor Plans", "Location", "Contact", "About"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="sa-nav-link sa-sans">{item}</a>
            </li>
          ))}
        </ul>
        <button 
          onClick={onOpenModal}
          className="sa-btn-primary sa-sans" 
          style={{ padding: "10px 24px", fontSize: 13, textDecoration: "none", border: "none" }}
        >
          Book Site Visit
        </button>
      </div>
      </div>
    </nav>
  );
}
