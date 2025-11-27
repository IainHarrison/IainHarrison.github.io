import React from 'react';
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
import './styles/styles.css';

function App() {
  return (
    <div className="App">
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
