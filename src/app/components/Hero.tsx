import { useState, useEffect, useRef } from 'react';
import { FileText, Github, Linkedin, ArrowDown } from 'lucide-react';
import './Hero.css';

const ROLES = ['BE CSE Student', 'Backend Developer', 'AI Enthusiast', 'Problem Solver'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0101010101';

function useScramble(words: string[]) {
  const [display, setDisplay] = useState(words[0]);
  const frame = useRef(0);
  const wordIndex = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const runWord = (target: string) => {
      let progress = 0;
      const totalFrames = target.length * 3;

      const tick = () => {
        if (cancelled) return;
        progress++;
        const revealed = Math.floor((progress / totalFrames) * target.length);
        const next = target
          .split('')
          .map((ch, i) => {
            if (i < revealed) return ch;
            if (ch === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        setDisplay(next);

        if (progress < totalFrames) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
          setTimeout(() => {
            wordIndex.current = (wordIndex.current + 1) % words.length;
            runWord(words[wordIndex.current]);
          }, 1800);
        }
      };
      tick();
    };

    const startDelay = setTimeout(() => runWord(words[0]), 900);

    return () => {
      cancelled = true;
      clearTimeout(startDelay);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return display;
}

export function Hero() {
  const roleText = useScramble(ROLES);
  const resumeUrl = "/Arjun-Sharma-Resume-2026.pdf";
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const inBounds =
        e.clientX > rect.left - 200 &&
        e.clientX < rect.right + 200 &&
        e.clientY > rect.top - 200 &&
        e.clientY < rect.bottom + 200;
      if (inBounds) {
        panel.style.transform = `rotateY(${relX * 6}deg) rotateX(${-relY * 6}deg)`;
      } else {
        panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const readout = [
    { label: 'STATUS', value: 'BE CSE — 3rd Year' },
    { label: 'FOCUS', value: 'DSA in Java, Full-Stack, AI' },
    { label: 'STACK', value: 'Node · Express · MongoDB' },
    { label: 'BASED IN', value: 'India' },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <h1 className="hero-name">
            <span className="name-line">Arjun</span>
            <span className="name-line accent">Sharma</span>
          </h1>

          <div className="hero-role">
            <span className="role-bracket">[</span>
            <span className="role-text cursor-text">{roleText}</span>
            <span className="role-bracket">]</span>
          </div>

          <p className="hero-desc">
            I build backend systems and full-stack products — sharpening my
            Data Structures &amp; Algorithms in Java while shipping real
            projects with Node.js, Express and MongoDB.
          </p>

          <div className="social-links">
            <a
              href="https://github.com/Arjunuk1"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link cursor-target"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/arjunsharma-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link cursor-target"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link hero-link-primary cursor-target"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        <div className="hero-panel-wrap">
          <div ref={panelRef} className="hero-panel">
            <div className="panel-header">
              <span>readout.log</span>
              <span className="panel-dot" />
            </div>
            {readout.map((row) => (
              <div key={row.label} className="panel-row">
                <span className="panel-label">{row.label}</span>
                <span className="panel-value">{row.value}</span>
              </div>
            ))}
            <div className="panel-footer">
              <div className="panel-bar">
                <div className="panel-bar-fill" />
              </div>
              <span>compiling career…</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue cursor-target">
        <span>SCROLL</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
