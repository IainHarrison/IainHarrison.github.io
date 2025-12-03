import React from 'react';
import ParallaxBackground from './ParallaxBackground';
import FloatingShapes from './FloatingShapes';

const ScrollBackground: React.FC = () => {
  return (
    <div className="scroll-background">
      {/* Slow moving background layer */}
      <ParallaxBackground speed={0.1} className="bg-layer-1">
        <div className="gradient-bg gradient-bg-1"></div>
      </ParallaxBackground>

      {/* Medium speed background layer */}
      <ParallaxBackground speed={0.3} className="bg-layer-2">
        <div className="gradient-bg gradient-bg-2"></div>
        <FloatingShapes count={4} className="floating-layer-1" />
      </ParallaxBackground>

      {/* Faster moving decorative layer */}
      <ParallaxBackground speed={0.5} className="bg-layer-3">
        <FloatingShapes count={6} className="floating-layer-2" />
      </ParallaxBackground>

      {/* Static overlay for depth */}
      <div className="static-overlay">
        <div className="noise-texture"></div>
      </div>
    </div>
  );
};

export default ScrollBackground;
