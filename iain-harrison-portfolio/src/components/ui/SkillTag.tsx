import React from 'react';
import { Skill } from '../../types/skill';

interface SkillTagProps {
  skill: Skill;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  const renderIcon = () => {
    if (skill.icon.endsWith('.svg')) {
      return (
        <img 
          src={`/assets/img/icons/${skill.icon}`} 
          className="custom-icon" 
          alt={`${skill.name} logo`}
        />
      );
    } else {
      return <i className={`bx ${skill.icon}`}></i>;
    }
  };

  return (
    <div className="skill-tag">
      {renderIcon()}
      {skill.name}
    </div>
  );
};

export default SkillTag;
