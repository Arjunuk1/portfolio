import { useEffect, useRef, useState } from 'react';
import { GraduationCap, BookOpen, Code, Lightbulb } from 'lucide-react';
import './Experience.css';

export function Experience() {
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

  const timeline = [
    {
      year: '2026 - Present',
      title: 'Data Structures & Algorithms',
      icon: <Code size={24} />,
      description: 'Currently mastering DSA concepts using Java, solving complex problems and improving algorithmic thinking.',
      achievements: [
        'Learning DSA in Java',
        'Solving algorithmic problems',
        'Building strong problem-solving skills'
      ]
    },
    {
      year: '2025',
      title: 'IoT Projects & System Programming',
      icon: <Lightbulb size={24} />,
      description: 'Learned C and C++ programming languages, built IoT projects with Arduino and ESP32, and mastered Linux in late 2025.',
      achievements: [
        'Learned C and C++ languages',
        'Built multiple IoT projects',
        'Mastered Linux operating system'
      ]
    },
    {
      year: '2024 - Present',
      title: 'BE in Computer Science',
      icon: <GraduationCap size={24} />,
      description: 'Pursuing Bachelor of Engineering in Computer Science and Engineering, building strong fundamentals.',
      achievements: [
        'Core CS fundamentals',
        'Software Engineering principles',
        'Continuous learning and growth'
      ]
    },
    {
      year: '2024',
      title: 'Programming Foundation',
      icon: <BookOpen size={24} />,
      description: 'Started the programming journey by learning Python as the first language, building a strong foundation in coding.',
      achievements: [
        'Learned Python programming',
        'Built first programs and projects',
        'Developed coding fundamentals'
      ]
    }
  ];

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience-container">
        <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
          Learning Journey
        </h2>
        <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
          My path in technology and continuous learning
        </p>

        <div className="timeline">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`timeline-item ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-icon">
                {item.icon}
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
                <ul className="timeline-achievements">
                  {item.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
