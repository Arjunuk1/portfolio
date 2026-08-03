import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Cpu, Globe, Terminal, Database } from 'lucide-react';
import './Skills.css';

export function Skills() {
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

  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={28} />,
      skills: ['Java', 'C++', 'C', 'Python', 'JavaScript', 'TypeScript']
    },
    {
      title: 'Frontend',
      icon: <Globe size={28} />,
      skills: ['React', 'HTML', 'CSS', 'Vite']
    },
    {
      title: 'Backend',
      icon: <Server size={28} />,
      skills: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'JWT Authentication']
    },
    {
      title: 'Databases',
      icon: <Database size={28} />,
      skills: ['MongoDB', 'MySQL']
    },
    {
      title: 'Core Computer Science',
      icon: <Cpu size={28} />,
      skills: ['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'System Design']
    },
    {
      title: 'Tools & Platforms',
      icon: <Terminal size={28} />,
      skills: ['Git', 'GitHub', 'Linux', 'VS Code', 'Postman', 'Vercel']
    }
  ];

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills-container">
        <div className="skills-head">
          <span className={`section-eyebrow ${isVisible ? 'animate-in' : ''}`}>02 // Skills</span>
          <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
            <span>What I build with</span>
          </h2>
          <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
            Technologies and tools I work with
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`skill-category reveal ${isVisible ? 'animate-in' : ''}`}
              style={{ transitionDelay: `${catIndex * 0.08}s` }}
            >
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <span className="category-index">0{catIndex + 1}</span>
              </div>

              <div className="skills-chips">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-chip"
                    style={{ transitionDelay: `${(catIndex * 0.08) + (skillIndex * 0.04)}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
