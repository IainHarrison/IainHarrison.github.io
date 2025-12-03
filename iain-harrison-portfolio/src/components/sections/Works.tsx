import React, { useState, useMemo } from 'react';
import { projects } from '../../data/projects';
import Modal from '../ui/Modal';
import PortfolioFilter from '../ui/PortfolioFilter';
import { Project } from '../../types/project';
import { Animate } from '../animations/ScrollAnimations';
import '../animations/animations.css';

const Works: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Emit custom event for background system
    const event = new CustomEvent('worksFilterChange', {
      detail: { category }
    });
    window.dispatchEvent(event);
  };

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.categories.includes(activeCategory as any));
  }, [activeCategory]);

  return (
    <>
      <section className="works section" id="works">
        <Animate.SlideUp>
          <span className="section-subtitle">My Portfolio</span>
        </Animate.SlideUp>
        <Animate.SlideUp delay={200}>
          <h2 className="section-title">Recent Works</h2>
        </Animate.SlideUp>

        <PortfolioFilter 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="works__container bd-grid">
          {filteredProjects.map((project, index) => (
            <Animate.ScaleIn 
              key={`${activeCategory}-${project.id}`} 
              delay={400 + (index * 150)}
              className="works__img hover-lift"
            >
              <div 
                onClick={() => handleProjectClick(project)}
                style={{ cursor: 'pointer', width: '100%', height: '100%' }}
              >
                <img src={project.image} alt={project.title} />
                <div className="works__data">
                  <span className="works__title">{project.title}</span>
                </div>
              </div>
            </Animate.ScaleIn>
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
