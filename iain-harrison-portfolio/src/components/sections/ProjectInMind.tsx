import React from 'react';

const ProjectInMind: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="project section">
      <div className="project__container bd-grid">
        <div className="project__data">
          <h2 className="section-title project__title">Do you have a project in mind</h2>
          <p className="project__description">
            If you have a project you would like realised do not hesitate to get in touch for a chat about how I can help, contact me directly here.
          </p>
          <button 
            className="button button__light" 
            onClick={scrollToContact}
          >
            Contact Me
          </button>
        </div>

        <img src="/assets/img/projectmind.png" alt="Project collaboration" className="project__img" />
      </div>
    </section>
  );
};

export default ProjectInMind;
