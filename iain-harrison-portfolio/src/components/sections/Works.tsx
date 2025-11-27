import React, { useState } from 'react';
import { projects } from '../../data/projects';
import Modal from '../ui/Modal';
import { Project } from '../../types/project';

const Works: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    // If project has external link only, open it directly
    if (project.links.external && !project.links.itchio && !project.links.github && !project.links.demo) {
      window.open(project.links.external, '_blank');
      return;
    }
    
    // Otherwise, open modal
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section className="works section" id="works">
        <span className="section-subtitle">My Portfolio</span>
        <h2 className="section-title">Recent Works</h2>

        <div className="works__container bd-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="works__img" 
              onClick={() => handleProjectClick(project)}
              style={{ cursor: 'pointer' }}
            >
              <img src={project.image} alt={project.title} />
              <div className="works__data">
                <span className="works__title">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Works;
