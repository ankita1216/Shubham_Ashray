import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/colors";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  requirement: "",
  location: "",
};

export default function BottomEnquiryForm() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const heroThreshold = windowHeight * 0.8;
      // Hide form slightly before or as the footer comes into view
      // Footer height is roughly 400px-500px, so hiding around 250px from bottom is good
      const footerThreshold = documentHeight - windowHeight - 250; 
      
      if (scrollY > heroThreshold && scrollY < footerThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger on mount to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShow = isVisible;

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // small delay for UX feel
    await new Promise((r) => setTimeout(r, 600));
    console.log("Bottom enquiry captured:", formData);
    setFormData(initialFormData);
    setIsSubmitting(false);
    navigate("/thank-you");
  };

  const inputStyle = {
    height: "42px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "10px",
    padding: "0 14px",
    fontSize: "13px",
    color: "#fff",
    outline: "none",
    transition: "all 0.3s ease",
    width: "100%",
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.aside
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            padding: "0 16px 16px",
            pointerEvents: "none"
          }}
        >
          <div style={{
            maxWidth: "1140px",
            margin: "0 auto",
            width: "100%",
            pointerEvents: "auto"
          }}>
            <div style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              background: COLORS.darkMid,
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(201,164,77,0.2)`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              padding: "14px 20px"
            }}>
              {/* Gold top accent line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${COLORS.primary} 30%, ${COLORS.primary} 70%, transparent)`
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Brand badge - hidden on very small screens */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  paddingRight: "16px",
                  minWidth: "80px"
                }} className="hidden md:flex">
                  <Home size={14} style={{ color: COLORS.primary, marginBottom: "2px" }} />
                  <span style={{ fontSize: "8px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.2em", color: COLORS.primary }}>
                    Site Visit
                  </span>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "nowrap",
                    overflowX: "auto"
                  }}
                  className="sa-no-scrollbar"
                >
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    style={{ ...inputStyle, flex: "1 1 120px" }}
                  />

                  <input
                    required
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    style={{ ...inputStyle, flex: "1 1 120px" }}
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    style={{ ...inputStyle, flex: "1 1 150px" }}
                    className="hidden lg:block"
                  />

                  <select
                    required
                    value={formData.requirement}
                    onChange={(e) => update("requirement", e.target.value)}
                    style={{ ...inputStyle, flex: "0 0 110px", cursor: "pointer" }}
                    className="hidden sm:block"
                  >
                    <option value="" disabled style={{ background: COLORS.darkMid, color: "#fff" }}>BHK</option>
                    <option value="2bhk" style={{ background: COLORS.darkMid, color: "#fff" }}>2 BHK</option>
                    <option value="3bhk" style={{ background: COLORS.darkMid, color: "#fff" }}>3 BHK</option>
                  </select>

                  <select
                    required
                    value={formData.location}
                    onChange={(e) => update("location", e.target.value)}
                    style={{ ...inputStyle, flex: "0 0 110px", cursor: "pointer" }}
                    className="hidden md:block"
                  >
                    <option value="" disabled style={{ background: COLORS.darkMid, color: "#fff" }}>Location</option>
                    <option value="dharapur" style={{ background: COLORS.darkMid, color: "#fff" }}>Dharapur</option>
                    <option value="guwahati" style={{ background: COLORS.darkMid, color: "#fff" }}>Guwahati</option>
                  </select>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flexShrink: 0,
                      height: "42px",
                      borderRadius: "10px",
                      padding: "0 24px",
                      fontSize: "11px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      background: COLORS.primary,
                      color: COLORS.darkNavy,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: `0 8px 20px ${COLORS.primary}33`
                    }}
                  >
                    {isSubmitting ? "..." : (
                      <>
                        Book <Send size={12} />
                      </>
                    )}
                  </motion.button>
                </form>

              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
