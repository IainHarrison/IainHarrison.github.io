import React from 'react';
import './floating-shapes.css';

interface FloatingShapesProps {
  count?: number;
  className?: string;
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({ 
  count = 6,
  className = ''
}) => {
  const shapes = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`floating-shapes ${className}`}>
      {shapes.map((index) => (
        <div
          key={index}
          className={`floating-shape shape-${(index % 3) + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
