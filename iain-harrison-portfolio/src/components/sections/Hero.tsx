import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="home" id="home">
      <div className="home__container bd-grid">
        <div className="home__data">
          <div className="home__img">
            <img src="/assets/img/perfil.png" alt="Iain Harrison Profile" />
          </div>

          <h1 className="home__title">Iain Harrison</h1>
          <span className="home__profession">Games Developer</span>

          <div className="home__social">
            <a 
              href="https://www.linkedin.com/in/iain-harrison/" 
              className="home__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className='bx bxl-linkedin'></i>
            </a>
            <a 
              href="https://github.com/IainHarrison" 
              className="home__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className='bx bxl-github'></i>
            </a>
            <a 
              href="https://iainharrison.itch.io/" 
              className="home__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className='bx bx-dock-top'></i>
            </a>
          </div>

          <a 
            download="" 
            href="/assets/Iain Harrison CV 2025.pdf" 
            className="button home__button"
          >
            Download my CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
