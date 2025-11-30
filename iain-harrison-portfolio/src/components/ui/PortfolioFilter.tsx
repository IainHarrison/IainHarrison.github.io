import React from 'react';
import { Animate } from '../animations/ScrollAnimations';
import { projects } from '../../data/projects';
import './portfolio-filter.css';

interface PortfolioFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Projects', icon: 'bx-grid-alt' },
  { id: 'games', label: 'Games', icon: 'bx-joystick' },
  { id: 'vr', label: 'VR/AR', icon: 'bx-cube' },
  { id: 'mobile', label: 'Mobile', icon: 'bx-mobile-alt' },
  { id: 'professional', label: 'Professional', icon: 'bx-briefcase' },
  { id: 'education', label: 'Education', icon: 'bx-book-open' }
];

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  // Get count for each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return projects.length;
    return projects.filter(project => project.categories.includes(categoryId as any)).length;
  };
  return (
    <Animate.SlideUp delay={100}>
      <div className="portfolio-filter">
        {categories.map((category, index) => (
          <Animate.ScaleIn key={category.id} delay={200 + (index * 100)}>
            <button
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="filter-icon">
                <i className={`bx ${category.icon}`}></i>
              </span>
              <span className="filter-label">{category.label}</span>
              <span className="filter-count">({getCategoryCount(category.id)})</span>
            </button>
          </Animate.ScaleIn>
        ))}
      </div>
    </Animate.SlideUp>
  );
};

export default PortfolioFilter;
