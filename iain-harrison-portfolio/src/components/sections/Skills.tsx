import React from 'react';
import { skillCategories } from '../../data/skills';
import SkillTag from '../ui/SkillTag';
import { Animate } from '../animations/ScrollAnimations';
import '../animations/animations.css';

const Skills: React.FC = () => {
  return (
    <section className="skills section" id="skills">
      <Animate.SlideUp>
        <span className="section-subtitle">Professional Expertise</span>
      </Animate.SlideUp>
      <Animate.SlideUp delay={200}>
        <h2 className="section-title">Technical Skills</h2>
      </Animate.SlideUp>

      <div className="skills__container bd-grid">
        {skillCategories.map((category, index) => (
          <Animate.SlideLeft key={index} delay={400 + (index * 200)}>
            <div className="skills__content">
              <h3 className="skills__subtitle">{category.title}</h3>
              <Animate.Stagger staggerDelay={50} className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="hover-scale">
                    <SkillTag skill={skill} />
                  </div>
                ))}
              </Animate.Stagger>
            </div>
          </Animate.SlideLeft>
        ))}
      </div>
    </section>
  );
};

export default Skills;
