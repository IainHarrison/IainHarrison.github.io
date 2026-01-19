import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Works from './components/sections/Works';
import Testimonials from './components/sections/Testimonials';
import SkillsShowcase from './components/sections/SkillsShowcase';
import ProjectInMind from './components/sections/ProjectInMind';
import Contact from './components/sections/Contact';
import SectionBackground from './components/animations/SectionBackground';
import './styles/styles.css';

// Setup mouse tracking 3D effect on cards
const setup3DCardEffects = () => {
  const cards = document.querySelectorAll('.works__img, .testimonial-card');

  cards.forEach(card => {
    const element = card as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      element.style.setProperty('--mouse-x', x.toString());
      element.style.setProperty('--mouse-y', y.toString());
    };

    const handleMouseEnter = () => {
      element.classList.add('mouse-tracking');
    };

    const handleMouseLeave = () => {
      element.classList.remove('mouse-tracking');
      element.style.setProperty('--mouse-x', '0.5');
      element.style.setProperty('--mouse-y', '0.5');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

function App() {
  useEffect(() => {
    // Setup after initial render and on DOM changes
    const timer = setTimeout(setup3DCardEffects, 500);

    // Re-setup when works filter changes (new cards may be rendered)
    const handleFilterChange = () => {
      setTimeout(setup3DCardEffects, 300);
    };
    window.addEventListener('worksFilterChange', handleFilterChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('worksFilterChange', handleFilterChange);
    };
  }, []);

  return (
    <div className="App">
      <SectionBackground />
      <Header />
      <main className="l-main">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Works />
        <Testimonials />
        <SkillsShowcase />
        <ProjectInMind />
        <Contact />
      </main>
    </div>
  );
}

export default App;
