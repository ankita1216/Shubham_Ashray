import { useEffect } from 'react';

export function useCounter() {
  useEffect(() => {
    const animate = (el) => {
      const rawTarget = el.dataset.target;
      const target = Number.parseFloat(rawTarget);
      if (!target) return;
      const decimalPlaces = rawTarget.includes('.') ? rawTarget.split('.')[1].length : 0;
      let cur = 0;
      const duration = 1800; // Total duration in ms
      const step = target / (duration / 16);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        const displayedValue = decimalPlaces > 0
          ? Number(cur.toFixed(decimalPlaces))
          : Math.floor(cur);
        el.textContent = displayedValue.toLocaleString('en-IN', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        });
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
      { threshold: 0.1 }
    );
    
    // Small delay to ensure DOM is settled
    const timeoutId = setTimeout(() => {
      document.querySelectorAll("[data-counter]").forEach((el) => obs.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      obs.disconnect();
    };
  }, []);
}
