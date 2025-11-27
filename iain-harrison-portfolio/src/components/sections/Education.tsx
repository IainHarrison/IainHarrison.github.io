import React from 'react';
import { educationData } from '../../data/education';

const Education: React.FC = () => {
  return (
    <section className="education section">
      <span className="section-subtitle">Qualification</span>
      <h2 className="section-title">My Education</h2>

      <div className="education__container bd-grid">
        {educationData.map((edu, index) => (
          <div key={edu.id} className="education__content">
            <div>
              <h3 className="education__year">{edu.year}</h3>
              <span className="education__university">{edu.institution}</span>
            </div>

            <div className="education__time">
              <span className="education__rounder"></span>
              <span className="education__line"></span>
            </div>

            <div>
              <h3 className="education__race">{edu.degree}</h3>
              <span className="education__specialty">{edu.specialty}</span> 
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
