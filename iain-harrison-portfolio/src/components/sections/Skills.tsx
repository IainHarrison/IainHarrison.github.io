import React from 'react';
import { skillCategories } from '../../data/skills';
import SkillTag from '../ui/SkillTag';

const Skills: React.FC = () => {
  return (
    <section className="skills section" id="skills">
      <span className="section-subtitle">Professional Expertise</span>
      <h2 className="section-title">Technical Skills</h2>

      <div className="skills__container bd-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skills__content">
            <h3 className="skills__subtitle">{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <SkillTag key={skillIndex} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
