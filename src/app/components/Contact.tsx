import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Send, MapPin } from 'lucide-react';
import './Contact.css';

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  const contactLinks = [
    {
      icon: <Github size={28} />,
      title: 'GitHub',
      value: '@Arjunuk1',
      link: 'https://github.com/Arjunuk1',
      color: '#667eea'
    },
    {
      icon: <Mail size={28} />,
      title: 'Email',
      value: 'arjun251898@gmail.com',
      link: 'mailto:arjun251898@gmail.com',
      color: '#f093fb'
    },
    {
      icon: <MapPin size={28} />,
      title: 'Location',
      value: 'India',
      color: '#4facfe'
    }
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-head">
          <span className={`section-eyebrow ${isVisible ? 'animate-in' : ''}`}>06 // Contact</span>
          <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
            <span>Let's build something</span>
          </h2>
          <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
            Let's build something amazing together
          </p>
        </div>

        <div className="contact-content">
          <div
            className={`contact-info reveal ${isVisible ? 'animate-in' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="info-card">
              <h3 className="info-title">Let's Connect</h3>
              <p className="info-description">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out through any of the channels below.
              </p>

              <div className="contact-methods">
                {contactLinks.map((contact, index) => (
                  <div key={index} className="contact-method">
                    <div className="method-icon">{contact.icon}</div>
                    <div className="method-info">
                      <h4 className="method-title">{contact.title}</h4>
                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="method-value cursor-target"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="method-value">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`contact-cta reveal ${isVisible ? 'animate-in' : ''}`}
            style={{ transitionDelay: '0.25s' }}
          >
            <div className="cta-card">
              <div className="cta-icon">
                <Send size={32} />
              </div>
              <h3 className="cta-title">Ready to Collaborate?</h3>
              <p className="cta-description">
                Check out my projects on GitHub and let's create something incredible together!
              </p>
              <div className="cta-buttons">
                <a
                  href="https://github.com/Arjunuk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button primary cursor-target"
                >
                  <Github size={18} />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
