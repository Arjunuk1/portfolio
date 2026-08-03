import { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Lightbulb } from 'lucide-react';
import './About.css';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const highlights = [
    { icon: <Code size={22} />, title: 'Algorithm Engineer', desc: 'Crafting efficient logic with DSA' },
    { icon: <Cpu size={22} />, title: 'AI Solution Architect', desc: 'Controlling and customizing AI-driven systems' },
    { icon: <Lightbulb size={22} />, title: 'Tech Innovator', desc: 'Building practical tech solutions from scratch' },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-head">
          <span className={`section-eyebrow ${isVisible ? 'animate-in' : ''}`}>01 // About</span>
          <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
            <span>Who I am, briefly</span>
          </h2>
        </div>

        <div className="about-grid">
          <p className={`about-text reveal ${isVisible ? 'animate-in' : ''}`}>
            I'm a Computer Science student passionate about backend
            development, Data Structures &amp; Algorithms, and building
            scalable software solutions. I enjoy turning ideas into
            real-world applications, exploring modern technologies, and
            continuously improving my problem-solving skills through
            hands-on projects and coding challenges.
          </p>

          <div className="about-highlights">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className={`highlight-item reveal ${isVisible ? 'animate-in' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className="highlight-index">0{i + 1}</span>
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
