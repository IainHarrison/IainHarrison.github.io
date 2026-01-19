import React, { useState, useMemo } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Section IDs for active tracking
  const sectionIds = useMemo(() => [
    'home', 'about', 'skills', 'works', 'testimonials', 'skills-showcase', 'contact'
  ], []);

  const activeSection = useActiveSection({ sectionIds, offset: 100 });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <i className='bx bx-menu'></i>
        </div>

        <div>
          <button 
            className="nav__logo" 
            onClick={() => scrollToSection('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Iain
          </button>
        </div>

        <div className={`nav__menu ${isMenuOpen ? 'show' : ''}`} id="nav-menu">
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <i className='bx bx-x'></i>
          </div>

          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className={`nav__link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#about" className={`nav__link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="#skills" className={`nav__link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}>
                Skills
              </a>
            </li>
            <li className="nav__item">
              <a href="#works" className={`nav__link ${activeSection === 'works' ? 'active' : ''}`} onClick={() => scrollToSection('works')}>
                Works
              </a>
            </li>
            <li className="nav__item">
              <a href="#testimonials" className={`nav__link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </a>
            </li>
            <li className="nav__item">
              <a href="#skills-showcase" className={`nav__link ${activeSection === 'skills-showcase' ? 'active' : ''}`} onClick={() => scrollToSection('skills-showcase')}>
                Skills Showcase
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className={`nav__link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>
                Contact me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
