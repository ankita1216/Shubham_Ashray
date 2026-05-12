import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { 
        if (e.isIntersecting) e.target.classList.add("sa-vis"); 
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sa-reveal, .sa-reveal-l, .sa-reveal-r").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
