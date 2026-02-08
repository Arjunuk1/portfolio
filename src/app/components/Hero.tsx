import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import './Hero.css';

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const toRotate = [
    "BTech CSE Student",
    "Backend Developer",
    "IoT Enthusiast",
    "Problem Solver"
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentText = toRotate[loopNum % toRotate.length];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      } else {
        setTypedText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        
        if (currentIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero">
      <div 
        className="hero-gradient"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      ></div>
      <div className="hero-content">
        <div className="hero-text fade-in">
          <h1 className="hero-name slide-up">Arjun Sharma</h1>
          <div className="hero-subtitle">
            <span className="typing-text">{typedText}</span>
            <span className="cursor">|</span>
          </div>
          <a 
            href="https://github.com/Arjunuk1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <Github size={24} />
            <span>View GitHub Profile</span>
          </a>
        </div>
      </div>
      <div className="gradient-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </section>
  );
}