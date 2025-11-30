import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  children, 
  speed = 0.5,
  className = ''
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div 
      className={`parallax-container ${className}`}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackground;
