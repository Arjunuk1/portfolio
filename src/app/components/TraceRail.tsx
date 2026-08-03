import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: '00 · HOME' },
  { id: 'about', label: '01 · ABOUT' },
  { id: 'skills', label: '02 · SKILLS' },
  { id: 'credentials', label: '03 · CRED' },
  { id: 'experience', label: '04 · LOG' },
  { id: 'projects', label: '05 · WORK' },
  { id: 'contact', label: '06 · CONTACT' },
];

export function TraceRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
      if (dotRef.current) dotRef.current.style.top = `${pct}%`;

      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          current = s.id;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="trace-rail" aria-hidden="true">
      <div className="trace-rail-line">
        <div ref={fillRef} className="trace-rail-fill" style={{ height: `${progress}%` }} />
        <div ref={dotRef} className="trace-rail-dot" style={{ top: `${progress}%` }} />
        <div className="trace-rail-marks">
          {SECTIONS.map((s) => (
            <span key={s.id} className={`trace-mark ${active === s.id ? 'is-active' : ''}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
