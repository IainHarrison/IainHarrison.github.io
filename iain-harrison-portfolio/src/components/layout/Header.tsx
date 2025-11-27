import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <a href="#home" className="nav__link active" onClick={() => scrollToSection('home')}>
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link" onClick={() => scrollToSection('about')}>
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="#skills" className="nav__link" onClick={() => scrollToSection('skills')}>
                Skills
              </a>
            </li>
            <li className="nav__item">
              <a href="#works" className="nav__link" onClick={() => scrollToSection('works')}>
                Works
              </a>
            </li>
            <li className="nav__item">
              <a href="#testimonials" className="nav__link" onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </a>
            </li>
            <li className="nav__item">
              <a href="#skills-showcase" className="nav__link" onClick={() => scrollToSection('skills-showcase')}>
                Skills Showcase
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link" onClick={() => scrollToSection('contact')}>
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
