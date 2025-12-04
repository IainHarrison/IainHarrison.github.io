import React, { useEffect, useState, useCallback, useRef } from 'react';

interface SectionBackgroundProps {
  className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [worksCategory, setWorksCategory] = useState('all');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced section change to prevent rapid switching
  const debouncedSetActiveSection = useCallback((newSection: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setActiveSection(newSection);
    }, 150); // Increased debounce to prevent flashing
  }, []);

  useEffect(() => {
    // Map actual IDs to background section names
    const sectionMapping = {
      'home': 'hero',        // Fix ID mismatch
      'about': 'about',
      'skills': 'skills',
      'works': 'works',
      'testimonials': 'testimonials',
      'skills-showcase': 'skills-showcase',
      'contact': 'contact'
    };
    
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Balanced margins
      threshold: 0.3 // Single threshold to reduce callback frequency
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the section that's most prominently visible
      let bestSection: string | null = null;
      let bestScore = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const mappedSection = sectionMapping[sectionId as keyof typeof sectionMapping];
          
          if (mappedSection) {
            const rect = entry.target.getBoundingClientRect();
            const distanceFromTop = Math.abs(rect.top);
            
            // Score based on intersection ratio and position (lower distance = higher score)
            const score = entry.intersectionRatio * (1000 / (distanceFromTop + 1));
            
            if (score > bestScore) {
              bestScore = score;
              bestSection = mappedSection;
            }
          }
        }
      });

      if (bestSection && bestSection !== activeSection) {
        debouncedSetActiveSection(bestSection);
      }
    };

    // Create single observer instance
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections using their actual IDs
    Object.keys(sectionMapping).forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [activeSection, debouncedSetActiveSection]); // Include dependencies used in handleIntersection

  // Scroll position fallback for edge cases
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only force hero background when at absolute top (within 20px)
      if (scrollY < 20 && activeSection !== 'hero') {
        // Cancel any pending debounced changes
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        setActiveSection('hero');
      }
    };

    // Throttle scroll events for performance
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

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeSection]);

  // Works category and mouse tracking
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setWorksCategory(event.detail.category);
    };

    window.addEventListener('worksFilterChange', handleCategoryChange as EventListener);
    return () => window.removeEventListener('worksFilterChange', handleCategoryChange as EventListener);
  }, []);

  // Physics-based mouse interaction for game-like orb movement
  useEffect(() => {
    let trailIndex = 0;
    const orbVelocities = new Map(); // Store velocity for each orb
    const orbPositions = new Map(); // Store current position for each orb
    let animationFrame: number | null = null;
    
    // Fade out orbs when leaving testimonials section
    const fadeOrbs = (fadeOut: boolean) => {
      const orbs = document.querySelectorAll('.physics-orb');
      console.log(`Found ${orbs.length} orbs to ${fadeOut ? 'hide' : 'show'}`);
      orbs.forEach((orb) => {
        const orbElement = orb as HTMLElement;
        orbElement.style.transition = 'opacity 0.5s ease-out';
        orbElement.style.opacity = fadeOut ? '0' : '1';
        orbElement.style.visibility = fadeOut ? 'hidden' : 'visible';
        
        // Ensure orbs start with normal appearance when showing
        if (!fadeOut) {
          orbElement.classList.remove('behind-ui');
        }
      });
    };
    
    // Physics update loop
    const updatePhysics = () => {
      if (activeSection === 'testimonials') {
        const orbs = document.querySelectorAll('.physics-orb');
        orbs.forEach((orb, index) => {
          // Initialize orb data if not exists
          if (!orbVelocities.has(index)) {
            orbVelocities.set(index, { x: 0, y: 0 });
            orbPositions.set(index, { x: 0, y: 0 });
          }
          
          const velocity = orbVelocities.get(index);
          const position = orbPositions.get(index);
          const orbElement = orb as HTMLElement;
          
          // Apply friction
          velocity.x *= 0.98; // Slightly higher friction for smoother movement
          velocity.y *= 0.98;
          
          // Update position
          position.x += velocity.x;
          position.y += velocity.y;
          
          // No boundary restrictions - orbs can move anywhere!
          // This allows them to go behind UI elements
          
          // Apply transform with rotation
          const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
          orbElement.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`;
          
          // Add subtle outline when orb might be behind UI
          const rect = orbElement.getBoundingClientRect();
          const orbCenterX = rect.left + rect.width / 2;
          const orbCenterY = rect.top + rect.height / 2;
          
          // Simplified detection - only show outline when actually behind specific UI elements
          const isBehindSidebar = rect.left < 200; // Behind left sidebar
          const isBehindMainContent = orbCenterX > 400 && orbCenterX < window.innerWidth - 100 && 
                                     orbCenterY > 100 && orbCenterY < window.innerHeight - 100; // Behind main content cards
          
          const shouldShowOutline = isBehindSidebar || isBehindMainContent;
          
          // Debug: uncomment to see detection zones
          // console.log(`Orb ${index}: behind sidebar: ${isBehindSidebar}, behind testimonial: ${isBehindTestimonialCard}, behind skills: ${isBehindSkillsCard}, near edge: ${isNearScreenEdge}, should show outline: ${shouldShowOutline}`);
          
          if (shouldShowOutline) {
            orbElement.classList.add('behind-ui');
          } else {
            orbElement.classList.remove('behind-ui');
          }
          
          // Prevent orbs from going completely off-screen (keep them partially visible)
          const buffer = 25; // Keep at least 25px of orb visible
          if (rect.right < buffer) {
            position.x = buffer - rect.width;
          }
          if (rect.left > window.innerWidth - buffer) {
            position.x = window.innerWidth - buffer;
          }
          if (rect.bottom < buffer) {
            position.y = buffer - rect.height;
          }
          if (rect.top > window.innerHeight - buffer) {
            position.y = window.innerHeight - buffer;
          }
        });
        
        animationFrame = requestAnimationFrame(updatePhysics);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (activeSection === 'testimonials') {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Subtle trail particles
        const container = document.getElementById('mouse-trail-container');
        if (container) {
          const particles = container.querySelectorAll('.subtle-trail-particle');
          const particle = particles[trailIndex % particles.length] as HTMLElement;
          
          if (particle) {
            particle.style.left = `${mouseX}px`;
            particle.style.top = `${mouseY}px`;
            particle.style.animation = 'none';
            void particle.offsetHeight;
            particle.style.animation = 'subtleTrailFade 0.8s ease-out forwards';
          }
          
          trailIndex++;
        }
        
        // Physics-based orb interactions
        const orbs = document.querySelectorAll('.physics-orb');
        orbs.forEach((orb, index) => {
          const orbElement = orb as HTMLElement;
          const rect = orbElement.getBoundingClientRect();
          const orbCenterX = rect.left + rect.width / 2;
          const orbCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - orbCenterX, 2) + Math.pow(mouseY - orbCenterY, 2)
          );
          
          // Physics parameters
          const pushRadius = 60; // Reduced from 120 to make hitbox smaller
          const pushForce = 1.2; // Increased force to compensate for smaller radius
          
          // Initialize orb data if not exists
          if (!orbVelocities.has(index)) {
            orbVelocities.set(index, { x: 0, y: 0 });
            orbPositions.set(index, { x: 0, y: 0 });
          }
          
          const velocity = orbVelocities.get(index);
          
          if (distance < pushRadius && distance > 0) {
            // Calculate push force
            const intensity = 1 - (distance / pushRadius);
            const angle = Math.atan2(orbCenterY - mouseY, orbCenterX - mouseX);
            
            // Apply force to velocity
            velocity.x += Math.cos(angle) * intensity * pushForce;
            velocity.y += Math.sin(angle) * intensity * pushForce;
            
            // Show collision effect
            const collisionEffects = document.querySelectorAll('.collision-effect');
            if (collisionEffects[index % 3]) {
              const effect = collisionEffects[index % 3] as HTMLElement;
              effect.style.left = `${orbCenterX}px`;
              effect.style.top = `${orbCenterY}px`;
              effect.style.animation = 'none';
              void effect.offsetHeight;
              effect.style.animation = 'collisionPulse 0.3s ease-out forwards';
            }
          }
        });
      }
    };

    // Handle section changes
    if (activeSection === 'testimonials') {
      console.log('Testimonials section active - showing orbs');
      fadeOrbs(false); // Fade in
      updatePhysics(); // Start physics loop
    } else {
      console.log('Left testimonials section - hiding orbs');
      fadeOrbs(true); // Fade out
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [activeSection]);

  const getWorksConfig = (category: string) => {
    const baseConfig = {
      shapes: 0,
      animation: 'creative-morph',
      special: 'color-shift'
    };

    switch (category) {
      case 'professional':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #1e40af 0%, #3b82f6 30%, #60a5fa 70%, #93c5fd 100%)',
          special: 'professional-particles'
        };
      case 'games':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #7c3aed 0%, #a855f7 30%, #c084fc 70%, #ddd6fe 100%)',
          special: 'game-particles'
        };
      case 'vr':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #dc2626 0%, #ef4444 30%, #f87171 70%, #fca5a5 100%)',
          special: 'vr-particles'
        };
      case 'mobile':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #059669 0%, #10b981 30%, #34d399 70%, #6ee7b7 100%)',
          special: 'mobile-particles'
        };
      case 'education':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #d97706 0%, #f59e0b 30%, #fbbf24 70%, #fde047 100%)',
          special: 'education-particles'
        };
      default: // 'all'
        return {
          ...baseConfig,
          gradient: 'linear-gradient(45deg, #ecfdf5 0%, #d1fae5 30%, #a7f3d0 70%, #6ee7b7 100%)',
          special: 'color-shift'
        };
    }
  };

  const getBackgroundConfig = (section: string) => {
    switch (section) {
      case 'hero':
        return {
          gradient: '#ffffff',
          shapes: 0,
          animation: 'none',
          special: 'none'
        };
      case 'about':
        return {
          gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #60a5fa 100%)',
          shapes: 0,
          animation: 'none',
          special: 'floating-bubbles'
        };
      case 'skills':
        return {
          gradient: 'linear-gradient(225deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
          shapes: 8,
          animation: 'tech-matrix',
          special: 'cyber-grid'
        };
      case 'works':
        return getWorksConfig(worksCategory);
      case 'testimonials':
        return {
          gradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
          shapes: 0,
          animation: 'none',
          special: 'physics-playground'
        };
      case 'skills-showcase':
        return {
          gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
          shapes: 0,
          animation: 'none',
          special: 'animated-constellation'
        };
      case 'contact':
        return {
          gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
          shapes: 0,
          animation: 'none',
          special: 'animated-constellation'
        };
      default:
        return {
          gradient: '#ffffff',
          shapes: 0,
          animation: 'none',
          special: 'none'
        };
    }
  };

  const config = getBackgroundConfig(activeSection);

  return (
    <div className={`section-background ${className}`} data-section={activeSection}>
      {/* Background with CSS transition for smooth color changes */}
      <div 
        className="section-gradient"
        style={{ background: config.gradient }}
      />
      
      {/* Dynamic shapes */}
      {config.shapes > 0 && (
        <div className="section-shapes">
          {Array.from({ length: config.shapes }, (_, i) => {
            const positions = [
              { left: 10, top: 15, rotation: 45 },
              { left: 75, top: 25, rotation: -30 },
              { left: 20, top: 70, rotation: 60 },
              { left: 85, top: 60, rotation: -45 },
              { left: 45, top: 40, rotation: 90 },
              { left: 60, top: 80, rotation: -60 },
              { left: 30, top: 10, rotation: 120 },
              { left: 90, top: 85, rotation: -90 }
            ];
            const pos = positions[i % positions.length];
            const flyDirections = ['flyInFromLeft', 'flyInFromRight', 'flyInFromTop', 'flyInFromBottom'];
            const flyDirection = flyDirections[i % flyDirections.length];
            
            return (
              <div
                key={`${activeSection}-${i}`}
                className={`section-shape shape-${(i % 3) + 1} ${config.animation} ${flyDirection}`}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  transform: `rotate(${pos.rotation}deg)`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            );
          })}
        </div>
      )}

      {/* Special Effects */}
      {config.special === 'animated-mesh' && (
        <div className="animated-mesh-effect">
          <div className="mesh-gradient mesh-1" />
          <div className="mesh-gradient mesh-2" />
          <div className="mesh-gradient mesh-3" />
          <div className="mesh-gradient mesh-4" />
        </div>
      )}

      {config.special === 'floating-orbs' && (
        <div className="floating-orbs-effect">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={`orb-${i}`}
              className={`floating-orb orb-${i + 1}`}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 1.2}s`
              }}
            />
          ))}
        </div>
      )}

      {config.special === 'floating-bubbles' && (
        <div className="floating-bubbles-effect">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`bubble-${i}`}
              className={`floating-bubble bubble-${(i % 3) + 1}`}
              style={{
                left: `${5 + (i * 6)}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      )}

      {config.special === 'cyber-grid' && (
        <div className="cyber-grid-effect">
          <div className="grid-overlay" />
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`cyber-${i}`}
              className={`cyber-element element-${(i % 4) + 1}`}
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + ((i % 3) * 25)}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      )}

      {config.special === 'academic-particles' && (
        <div className="academic-particles-effect">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`academic-${i}`}
              className="academic-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
          ))}
        </div>
      )}

      {config.special === 'color-shift' && (
        <div className="color-shift-effect">
          <div className="color-blob blob-1" />
          <div className="color-blob blob-2" />
          <div className="color-blob blob-3" />
        </div>
      )}

      {config.special === 'physics-playground' && (
        <div className="physics-playground-effect">
          {/* Game-like physics orbs */}
          <div className="physics-orbs-container">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`physics-orb-${i}`}
                className="physics-orb"
                data-orb-id={i}
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
              />
            ))}
          </div>
          
          {/* Subtle mouse trail */}
          <div className="subtle-mouse-trail" id="mouse-trail-container">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`trail-${i}`}
                className="subtle-trail-particle"
                style={{
                  animationDelay: `${i * 0.08}s`
                }}
              />
            ))}
          </div>
          
          {/* Collision effects */}
          <div className="collision-effects-container">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`collision-${i}`}
                className="collision-effect"
                data-collision-id={i}
              />
            ))}
          </div>
        </div>
      )}

      {config.special === 'animated-constellation' && (
        <div className="animated-constellation-effect">
          <svg className="constellation-svg" width="100%" height="100%">
            {Array.from({ length: 50 }, (_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              return (
                <g key={`star-${i}`}>
                  <circle
                    className="constellation-star"
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={Math.random() * 2 + 1}
                    style={{
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                  {i < 25 && (
                    <line
                      className="constellation-line"
                      x1={`${x}%`}
                      y1={`${y}%`}
                      x2={`${Math.random() * 100}%`}
                      y2={`${Math.random() * 100}%`}
                      style={{
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <div className="constellation-particles">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`particle-${i}`}
                className="constellation-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section transition overlay */}
      <div className="section-transition-overlay" />
    </div>
  );
};

export default SectionBackground;
