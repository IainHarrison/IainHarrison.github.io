import React from 'react';
import { Animate } from '../animations/ScrollAnimations';
import '../animations/animations.css';

const Hero: React.FC = () => {
  return (
    <section className="home" id="home">
      <div className="home__container bd-grid">
        <div className="home__data">
          <Animate.ScaleIn delay={200}>
            <div className="home__img hover-lift">
              <img src="/assets/img/perfil.png" alt="Iain Harrison Profile" />
            </div>
          </Animate.ScaleIn>

          <Animate.SlideUp delay={400}>
            <h1 className="home__title">
              <Animate.Typewriter 
                text="Iain Harrison" 
                speed={100}
                delay={600}
              />
            </h1>
          </Animate.SlideUp>
          
          <Animate.SlideUp delay={1200}>
            <span className="home__profession">
              <Animate.Typewriter 
                text="Interactive Experiences Developer" 
                speed={80}
                delay={1400}
              />
            </span>
          </Animate.SlideUp>

          <div style={{ marginTop: '2rem' }}>
            <Animate.SlideUp delay={1800}>
              <div className="home__social">
              <a 
                href="https://www.linkedin.com/in/iain-harrison/" 
                className="home__social-link hover-scale"
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: '2000ms' }}
              >
                <i className='bx bxl-linkedin'></i>
              </a>
              {/* <a
                href="https://github.com/IainHarrison"
                className="home__social-link hover-scale"
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: '2150ms' }}
              >
                <i className='bx bxl-github'></i>
              </a> */}
              <a 
                href="https://iainharrison.itch.io/" 
                className="home__social-link hover-scale"
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: '2300ms' }}
              >
                <i className='bx bx-dock-top'></i>
              </a>
              </div>
            </Animate.SlideUp>
          </div>

          <Animate.BounceIn delay={2600}>
            <a 
              download="" 
              href="/assets/Iain Harrison CV 2025.pdf" 
              className="button home__button hover-lift"
            >
              Download my CV
            </a>
          </Animate.BounceIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
