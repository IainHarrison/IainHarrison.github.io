import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../../styles/styles.css';
import { useMouseAvoidance } from '../../hooks/useMouseAvoidance';

interface SectionBackgroundProps {
  className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [worksCategory, setWorksCategory] = useState('all');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse avoidance for all projects elements
  useMouseAvoidance('.all-projects-world-effect', '.all-element');

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
      rootMargin: '-50% 0px -50% 0px', // Trigger when section crosses center line
      threshold: 0 // Any intersection triggers callback
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Simple approach: when a section crosses the center line, make it active
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const mappedSection = sectionMapping[sectionId as keyof typeof sectionMapping];
          
          if (mappedSection && mappedSection !== activeSection) {
            // No debouncing - immediate smooth transition
            setActiveSection(mappedSection);
          }
        }
      });
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
          gradient: 'linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 25%, #f9fafb 50%, #ffffff 75%, #f8fafc 100%)',
          special: 'professional-world'
        };
      case 'games':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1d4ed8 100%)',
          special: 'games-world'
        };
      case 'vr':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 25%, #0284c7 50%, #0ea5e9 75%, #38bdf8 100%)',
          special: 'vr-world'
        };
      case 'mobile':
        return {
          ...baseConfig,
          gradient: '#e9d5ff',
          special: 'mobile-world'
        };
      case 'education':
        return {
          ...baseConfig,
          gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fed7aa 50%, #fecaca 75%, #fef2f2 100%)',
          special: 'education-world'
        };
      default: // 'all'
        return {
          ...baseConfig,
          gradient: '#f0f9ff',
          special: 'all-projects-world'
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

  // Add body class for dark background sections
  React.useEffect(() => {
    if (activeSection === 'skills') {
      document.body.classList.add('dark-background');
    } else {
      document.body.classList.remove('dark-background');
    }
    
    return () => {
      document.body.classList.remove('dark-background');
    };
  }, [activeSection]);

  return (
    <div className={`section-background ${className}`} data-section={activeSection}>
      {/* Multiple background layers for smooth crossfade transitions */}
      <div className="section-gradient hero-bg" style={{ 
        background: '#ffffff',
        opacity: activeSection === 'hero' ? 1 : 0
      }} />
      <div className="section-gradient about-bg" style={{ 
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #60a5fa 100%)',
        opacity: activeSection === 'about' ? 1 : 0
      }} />
      <div className="section-gradient skills-bg" style={{ 
        background: 'linear-gradient(225deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
        opacity: activeSection === 'skills' ? 1 : 0
      }} />
      <div className="section-gradient works-bg" style={{ 
        background: getWorksConfig(worksCategory).gradient,
        opacity: activeSection === 'works' ? 1 : 0
      }} />
      <div className="section-gradient testimonials-bg" style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
        opacity: activeSection === 'testimonials' ? 1 : 0
      }} />
      <div className="section-gradient skills-showcase-bg" style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
        opacity: activeSection === 'skills-showcase' ? 1 : 0
      }} />
      <div className="section-gradient contact-bg" style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
        opacity: activeSection === 'contact' ? 1 : 0
      }} />
      
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

      {config.special === 'games-world' && (
        <div className="games-world-effect">
          {/* Floating pixel particles */}
          <div className="pixel-particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={`pixel-${i}`}
                className="pixel-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Matrix grid overlay */}
          <div className="matrix-grid">
            {Array.from({ length: 8 }, (_, row) => (
              <div key={`grid-row-${row}`} className="grid-row">
                {Array.from({ length: 12 }, (_, col) => (
                  <div
                    key={`grid-cell-${row}-${col}`}
                    className="grid-cell"
                    style={{
                      animationDelay: `${(row + col) * 0.1}s`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Power-up sparkles */}
          <div className="power-up-sparkles">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`sparkle-${i}`}
                className="sparkle"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {config.special === 'vr-world' && (
        <div className="vr-world-effect">
          {/* Floating wireframe shapes */}
          <div className="wireframe-shapes">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={`wireframe-${i}`}
                className={`wireframe-shape shape-${(i % 4) + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Tron-style grid */}
          <div className="tron-grid">
            <div className="grid-lines horizontal">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={`h-line-${i}`}
                  className="grid-line"
                  style={{
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <div className="grid-lines vertical">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={`v-line-${i}`}
                  className="grid-line"
                  style={{
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Holographic particles */}
          <div className="holographic-particles">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`holo-${i}`}
                className="holo-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* VR Assets - Floating Icons */}
          <div className="vr-assets">
            {/* VR Headset Icons */}
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`vr-headset-${i}`}
                className="vr-asset vr-headset"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              >
                <i className="bx bx-cube"></i>
              </div>
            ))}
            
            {/* VR Controller Icons */}
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={`vr-controller-${i}`}
                className="vr-asset vr-controller"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${30 + Math.random() * 40}%`,
                  animationDelay: `${1 + Math.random() * 3}s`
                }}
              >
                <i className="bx bx-joystick"></i>
              </div>
            ))}
          </div>
        </div>
      )}

      {config.special === 'mobile-world' && (
        <div className="mobile-world-effect">
          {/* Bouncing Mobile Devices */}
          <div className="mobile-devices">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={`mobile-${i}`}
                className="mobile-device"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 1}s`
                }}
              >
                <i className="bx bx-mobile-alt"></i>
              </div>
            ))}
          </div>
          
          {/* App Icon Squares with Wobble */}
          <div className="app-icons">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={`app-${i}`}
                className={`app-icon app-${(i % 4) + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          {/* Notification Bubbles */}
          <div className="notification-bubbles">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`notification-${i}`}
                className="notification-bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              >
                {Math.floor(Math.random() * 9) + 1}
              </div>
            ))}
          </div>
          
          {/* Floating UI Elements */}
          <div className="ui-elements">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`ui-${i}`}
                className={`ui-element ui-${(i % 3) + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2.5}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {config.special === 'professional-world' && (
        <div className="professional-world-effect">
          {/* Sine Wave Business Icons */}
          <div className="business-icons">
            {Array.from({ length: 12 }, (_, i) => {
              const iconTypes = ['briefcase', 'chart', 'document', 'money'];
              const weights = [0.4, 0.3, 0.2, 0.1]; // 40%, 30%, 20%, 10%
              
              let iconType = 'briefcase';
              const random = Math.random();
              let cumulative = 0;
              
              for (let j = 0; j < weights.length; j++) {
                cumulative += weights[j];
                if (random < cumulative) {
                  iconType = iconTypes[j];
                  break;
                }
              }
              
              const iconClass = iconType === 'money' ? 'money-icon' : `${iconType}-icon`;
              const iconName = iconType === 'money' ? 'bx-dollar-circle' : 
                              iconType === 'briefcase' ? 'bx-briefcase' :
                              iconType === 'chart' ? 'bx-bar-chart-alt-2' : 'bx-file-blank';
              
              // Calculate sine wave position using JavaScript
              const angle = (i / 12) * 360; // Degrees
              const centerX = 55; // 55% of viewport width (moved right)
              const centerY = 50; // 50% of viewport height
              const radiusX = 6; // 6% (very small)
              const radiusY = 4; // 4% (very small)
              
              const x = centerX + radiusX * Math.cos((angle * Math.PI) / 180);
              const y = centerY + radiusY * Math.sin((angle * Math.PI) / 180);
              
              return (
                <div
                  key={`business-${i}`}
                  className={`business-icon sine-wave-icon-js ${iconClass}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  <i className={`bx ${iconName}`}></i>
                </div>
              );
            })}
          </div>
          
          {/* Corporate Geometric Patterns */}
          <div className="corporate-patterns">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`pattern-${i}`}
                className={`corporate-shape shape-${(i % 3) + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Elegant Connecting Lines */}
          <div className="connection-lines">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={`line-${i}`}
                className="connection-line"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {config.special === 'education-world' && (
        <div className="education-world-effect">
          {/* Floating Educational Icons */}
          <div className="educational-icons">
            {/* Books */}
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={`book-${i}`}
                className="educational-icon book-icon"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                <i className="bx bx-book-open"></i>
              </div>
            ))}
            
            {/* Graduation Caps */}
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`grad-${i}`}
                className="educational-icon graduation-icon"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${1 + Math.random() * 2}s`
                }}
              >
                <i className="bx bx-graduation"></i>
              </div>
            ))}
            
            {/* Pencils/Writing */}
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`pencil-${i}`}
                className="educational-icon pencil-icon"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${0.5 + Math.random() * 2.5}s`
                }}
              >
                <i className="bx bx-pencil"></i>
              </div>
            ))}
            
            {/* Lightbulbs (Ideas) */}
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={`idea-${i}`}
                className="educational-icon idea-icon"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${1.5 + Math.random() * 2}s`
                }}
              >
                <i className="bx bx-bulb"></i>
              </div>
            ))}
          </div>
          
          {/* Knowledge Particles */}
          <div className="knowledge-particles">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`knowledge-${i}`}
                className="knowledge-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Academic Papers */}
          <div className="academic-papers">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`paper-${i}`}
                className="academic-paper"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {config.special === 'all-projects-world' && (
        <div className="all-projects-world-effect">
          {/* Sine Wave Professional Elements */}
          <div className="all-sine-wave-elements">
            {Array.from({ length: 8 }, (_, i) => {
              const iconTypes = ['briefcase', 'chart', 'document', 'money'];
              const iconType = iconTypes[i % iconTypes.length];
              const iconName = iconType === 'money' ? 'bx-dollar-circle' : 
                              iconType === 'briefcase' ? 'bx-briefcase' :
                              iconType === 'chart' ? 'bx-bar-chart-alt-2' : 'bx-file-blank';
              
              // Calculate sine wave position using JavaScript
              const angle = (i / 8) * 360; // Degrees
              const centerX = 50; // 50% of viewport width
              const centerY = 40; // 40% of viewport height
              const radiusX = 30; // 5% (very small)
              const radiusY = 19; // 3% (very small)
              
              const x = centerX + radiusX * Math.cos((angle * Math.PI) / 180);
              const y = centerY + radiusY * Math.sin((angle * Math.PI) / 180);
              
              return (
                <div
                  key={`sine-${i}`}
                  className="all-element all-sine-wave-icon-js"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                >
                  <i className={`bx ${iconName}`}></i>
                </div>
              );
            })}
          </div>

          {/* VR 3D Rotating Elements */}
          <div className="all-vr-3d-elements">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={`vr-3d-${i}`}
                className="all-element all-vr-3d-element"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                <i className="bx bx-cube"></i>
              </div>
            ))}
            
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={`vr-controller-3d-${i}`}
                className="all-element all-vr-controller-element"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${25 + Math.random() * 50}%`,
                  animationDelay: `${1 + Math.random() * 2}s`
                }}
              >
                <i className="bx bx-joystick"></i>
              </div>
            ))}
          </div>

          {/* Games Pixel Effects */}
          <div className="all-games-effects">
            {/* Pixel Particles from Games */}
            <div className="all-pixel-particles">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={`all-pixel-${i}`}
                  className="all-element all-pixel-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Games Joysticks */}
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`games-spin-${i}`}
                className="all-element all-games-element"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <i className="bx bx-joystick"></i>
              </div>
            ))}
          </div>

          {/* VR Wireframe Effects */}
          <div className="all-vr-effects">
            {/* Wireframe Shapes from VR */}
            <div className="all-wireframe-shapes">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`all-wireframe-${i}`}
                  className={`all-element all-wireframe-shape all-shape-${(i % 4) + 1}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
            
          {/* Other Category Elements */}
          <div className="all-other-elements">
            {/* Mobile Bouncing */}
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={`mobile-bounce-${i}`}
                className="all-element all-mobile-element"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <i className="bx bx-mobile-alt"></i>
              </div>
            ))}
            
            {/* Education Floating */}
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={`education-float-${i}`}
                className="all-element all-education-element"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <i className="bx bx-book-open"></i>
              </div>
            ))}
          </div>

          {/* Mixed Particles */}
          <div className="all-particles">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`all-particle-${i}`}
                className={`all-element all-particle particle-${(i % 5) + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
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
