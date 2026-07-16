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
      skills: [
        { name: 'Java', level: 90 },
        { name: 'C++', level: 82 },
        { name: 'C', level: 78 },
        { name: 'Python', level: 75 },
        { name: 'JavaScript', level: 88 },
        { name: 'TypeScript', level: 72 }
      ]
    },
    {
      title: 'Frontend',
      icon: <Globe size={28} />,
      skills: [
        { name: 'React', level: 85 },
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'Vite', level: 82 }
      ]
    },
    {
      title: 'Backend',
      icon: <Server size={28} />,
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 86 },
        { name: 'Spring Boot', level: 72 },
        { name: 'REST APIs', level: 92 },
        { name: 'JWT Authentication', level: 84 }
      ]
    },
    {
      title: 'Databases',
      icon: <Database size={28} />,
      skills: [
        { name: 'MongoDB', level: 86 },
        { name: 'MySQL', level: 80 }
      ]
    },
    {
      title: 'Core Computer Science',
      icon: <Cpu size={28} />,
      skills: [
        { name: 'DSA', level: 88 },
        { name: 'OOP', level: 90 },
        { name: 'DBMS', level: 82 },
        { name: 'OS', level: 80 },
        { name: 'CN', level: 78 },
        { name: 'System Design', level: 72 }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: <Terminal size={28} />,
      skills: [
        { name: 'Git', level: 88 },
        { name: 'GitHub', level: 90 },
        { name: 'Linux', level: 80 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 84 },
        { name: 'Vercel', level: 86 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
          Technical Skills
        </h2>
        <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
          Technologies and tools I work with
        </p>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`skill-category ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(catIndex * 0.1) + (skillIndex * 0.1)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
