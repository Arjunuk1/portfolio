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
      value: 'Contact via GitHub',
      link: 'https://github.com/Arjunuk1',
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
        <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
          Get In Touch
        </h2>
        <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
          Let's build something amazing together
        </p>

        <div className="contact-content">
          <div
            className={`contact-info ${isVisible ? 'animate-in' : ''}`}
            style={{ animationDelay: '0.2s' }}
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
                    <div 
                      className="method-icon"
                      style={{ background: `linear-gradient(135deg, ${contact.color} 0%, ${contact.color}88 100%)` }}
                    >
                      {contact.icon}
                    </div>
                    <div className="method-info">
                      <h4 className="method-title">{contact.title}</h4>
                      {contact.link ? (
                        <a 
                          href={contact.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="method-value"
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
            className={`contact-cta ${isVisible ? 'animate-in' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="cta-card">
              <div className="cta-icon">
                <Send size={48} />
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
                  className="cta-button primary"
                >
                  <Github size={20} />
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
