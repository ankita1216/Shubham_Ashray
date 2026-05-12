import { useEffect } from 'react';

export function useCounter() {
  useEffect(() => {
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10);
      if (!target) return;
      let cur = 0;
      const duration = 1800; // Total duration in ms
      const step = target / (duration / 16);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur).toLocaleString();
        if (cur >= target) clearInterval(iv);
      }, 16);
    };
    
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !e.target.dataset.animated) {
          e.target.dataset.animated = "1";
          animate(e.target);
        }
      }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-counter]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
