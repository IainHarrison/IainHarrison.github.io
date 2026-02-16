import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../../types/project';

interface ModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed or no project
  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          width: '800px',
          display: 'flex',
          flexDirection: 'column' as const
        }}
      >
        <div 
          className="modal-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            borderBottom: '1px solid #eee'
          }}
        >
          <div className="title" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {project.title}
          </div>
          <button 
            className="close-button" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            &times;
          </button>
        </div>
        <div 
          className="modal-body"
          style={{
            padding: '20px',
            lineHeight: '1.6',
            overflow: 'auto',
            flex: '1'
          }}
        >
          {project.details.videoUrl && (
            <div className="project-media">
              {project.details.videoUrl.endsWith('.mp4') ? (
                <video width="90%" controls>
                  <source src={project.details.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  style={{ width: '40%', marginBottom: '1%', marginLeft: 'auto', marginRight: 'auto' }} 
                  src={project.details.videoUrl} 
                  alt={`${project.title} demo`}
                />
              )}
            </div>
          )}

          {project.details.images && project.details.images.length > 0 && (
            <div className="game-showcase">
              <div className="game-images">
                <div className="game-image-grid">
                  {project.details.images.map((image, index) => (
                    <div key={index} className="game-image-container">
                      <img src={image} alt={`${project.title} screenshot ${index + 1}`} className="gameplay-image" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <h3>Project Overview</h3>
          <p>{project.details.overview}</p>

          {project.details.teamMembers && project.details.teamMembers.length > 0 && (
            <>
              <h3>Team</h3>
              <ul>
                <li><strong>Developer:</strong> Iain Harrison (me)</li>
                {project.details.teamMembers.map((member, index) => (
                  <li key={index}>
                    <strong>{member.role}:</strong>{' '}
                    {member.linkedinUrl ? (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {member.name} <i className='bx bxl-linkedin-square'></i>
                      </a>
                    ) : (
                      member.name
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3>My Role</h3>
          <p>{project.details.role}</p>

          <h3>Technologies Used</h3>
          <ul>
            {project.details.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>

          <h3>Key Contributions</h3>
          <ul>
            {project.details.contributions.map((contribution, index) => (
              <li key={index}>{contribution}</li>
            ))}
          </ul>

          {project.details.challenges && (
            <>
              <h3>Challenges & Solutions</h3>
              <p>{project.details.challenges}</p>
            </>
          )}

          <h3>Outcomes</h3>
          <ul>
            {project.details.outcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </div>

        {(project.links.itchio || project.links.external || project.links.github || project.links.demo) && (
          <div 
            className="modal-footer"
            style={{
              padding: '20px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            {project.links.itchio && (
              <a href={project.links.itchio} className="works__link__open" target="_blank" rel="noopener noreferrer">
                <i className='bx bx-game'></i> Play on itch.io
              </a>
            )}
            {project.links.external && (
              <a href={project.links.external} className="works__link__open" target="_blank" rel="noopener noreferrer">
                <i className='bx bx-link-alt'></i> View Project
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} className="works__link__open" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-github'></i> View Code
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} className="works__link__open" target="_blank" rel="noopener noreferrer">
                <i className='bx bx-play'></i> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
