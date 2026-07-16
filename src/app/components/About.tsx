import { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Lightbulb } from 'lucide-react';
import './About.css';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
          About Me
        </h2>
        
        <div className={`about-card ${isVisible ? 'animate-in' : ''}`}>
          <div className="card-glow"></div>
          <div className="about-content">
            <p className="about-text">
              I'm a Computer Science student passionate about backend development, Data Structures & Algorithms, and building scalable software solutions. I enjoy turning ideas into real-world applications, exploring modern technologies, and continuously improving my problem-solving skills through hands-on projects and coding challenges.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Code size={28} />
                </div>
                <h3>Algorithm Engineer</h3>
                <p>Crafting efficient logic with DSA</p>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Cpu size={28} />
                </div>
                <h3>AI Solution Architect</h3>
                <p>Controlling and customizing AI-driven systems</p>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Lightbulb size={28} />
                </div>
                <h3>Tech Innovator</h3>
                <p>Building practical tech solutions from scratch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
