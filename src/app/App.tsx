import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './app.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="logo-animation">AS</div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      )}
      <div className={`app ${!isLoading ? 'app-visible' : ''}`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}