import { useState, useEffect } from 'react';
import './Navbar.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', index: '00' },
    { name: 'About', href: '#about', index: '01' },
    { name: 'Skills', href: '#skills', index: '02' },
    { name: 'Credentials', href: '#credentials', index: '03' },
    { name: 'Log', href: '#experience', index: '04' },
    { name: 'Work', href: '#projects', index: '05' },
    { name: 'Contact', href: '#contact', index: '06' },
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo cursor-target" onClick={handleLinkClick}>
          <span className="logo-mark">AS</span>
          <span className="logo-tag">/ portfolio</span>
        </a>

        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="navbar-item">
              <a href={link.href} className="navbar-link cursor-target">
                <span className="link-index">{link.index}</span>
                <span className="link-name">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`navbar-toggle cursor-target ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${isOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link, i) => (
            <li key={link.name} style={{ transitionDelay: `${i * 0.05}s` }}>
              <a href={link.href} onClick={handleLinkClick}>
                <span className="link-index">{link.index}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
