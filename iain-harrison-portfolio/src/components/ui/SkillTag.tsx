import React, { useState } from 'react';
import { Skill } from '../../types/skill';

interface SkillTagProps {
  skill: Skill;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleClick = () => {
    if (skill.description) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div 
      className={`skill-tag ${isExpanded ? 'expanded' : ''} ${skill.description ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="skill-content">
        <div className="skill-title">
          {renderIcon()}
          {skill.name}
        </div>
        {skill.description && (
          <div className="skill-description">
            {skill.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillTag;
