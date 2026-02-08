import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Cpu, Globe, Terminal } from 'lucide-react';
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
      title: 'Frontend',
      icon: <Globe size={28} />,
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Tailwind CSS', level: 85 }
      ]
    },
    {
      title: 'Backend',
      icon: <Server size={28} />,
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 75 },
        { name: 'REST APIs', level: 90 }
      ]
    },
    {
      title: 'IoT & Hardware',
      icon: <Cpu size={28} />,
      skills: [
        { name: 'Arduino', level: 85 },
        { name: 'ESP32', level: 82 },
        { name: 'Sensors', level: 85 }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <Terminal size={28} />,
      skills: [
        { name: 'Git/GitHub', level: 88 },
        { name: 'Linux', level: 80 },
        { name: 'VS Code', level: 90 },
        { name: 'WSL', level: 85 }
      ]
    },
    {
      title: 'Languages',
      icon: <Code2 size={28} />,
      skills: [
        { name: 'JavaScript', level: 88 },
        { name: 'Java', level: 78 },
        { name: 'Python', level: 75 },
        { name: 'C/C++', level: 72 }
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
