import { Github, Heart } from 'lucide-react';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            Made with <Heart size={13} className="heart-icon" /> by Arjun Sharma
          </p>
          <p className="footer-copyright">© {currentYear} All rights reserved</p>
        </div>

        <a
          href="https://github.com/Arjunuk1"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github cursor-target"
          aria-label="GitHub Profile"
        >
          <Github size={18} />
          <span>EOF</span>
        </a>
      </div>
    </footer>
  );
}
