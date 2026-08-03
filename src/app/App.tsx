import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Credentials } from './components/Credentials';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { TraceRail } from './components/TraceRail';
import './app.css';

const BUILD_LOG: { text: string; ok?: boolean }[] = [
  { text: 'resolving modules…' },
  { text: 'compiling profile.tsx' },
  { text: 'linking github.com/arjunuk1' },
  { text: 'render target: dark' },
  { text: 'build ready', ok: true },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 2250);
    const doneTimer = setTimeout(() => setIsLoading(false), 3450);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`preloader ${isExiting ? 'preloader-exit' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-log">
              {BUILD_LOG.map((line, i) => (
                <div
                  key={i}
                  className="preloader-line"
                  style={{ animationDelay: `${i * 0.28}s` }}
                >
                  <span className={line.ok ? 'ok' : 'path'}>{line.ok ? '✓' : '›'}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
            <div className="preloader-bar-track">
              <div className="preloader-bar-fill" />
            </div>
            <div className="preloader-status">
              <span>AS_PORTFOLIO</span>
              <span className="accent">v2.0</span>
            </div>
          </div>
        </div>
      )}
      <div className="app">
        <CustomCursor />
        <TraceRail />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Credentials />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
