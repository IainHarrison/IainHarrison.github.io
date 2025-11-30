import React, { CSSProperties, ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

interface CustomAnimationProps extends AnimationProps {
  from: CSSProperties;
  to: CSSProperties;
}

// Base animation component
const AnimateIn: React.FC<CustomAnimationProps> = ({ 
  children, 
  from, 
  to, 
  delay = 0, 
  duration = 600,
  className = '' 
}) => {
  const { ref, isVisible } = useScrollAnimation({ delay });

  const defaultStyles: CSSProperties = {
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={
        isVisible
          ? { ...defaultStyles, ...to }
          : { ...defaultStyles, ...from }
      }
    >
      {children}
    </div>
  );
};

// Fun animation presets
const FadeIn: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const SlideUp: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'translateY(60px)' }}
    to={{ opacity: 1, transform: 'translateY(0)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const SlideLeft: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'translateX(-60px)' }}
    to={{ opacity: 1, transform: 'translateX(0)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const SlideRight: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'translateX(60px)' }}
    to={{ opacity: 1, transform: 'translateX(0)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const ScaleIn: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'scale(0.8)' }}
    to={{ opacity: 1, transform: 'scale(1)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const RotateIn: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'rotate(-10deg) scale(0.8)' }}
    to={{ opacity: 1, transform: 'rotate(0deg) scale(1)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const FlipIn: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'rotateY(-90deg)' }}
    to={{ opacity: 1, transform: 'rotateY(0deg)' }}
    {...props}
  >
    {children}
  </AnimateIn>
);

const BounceIn: React.FC<AnimationProps> = ({ children, ...props }) => (
  <AnimateIn
    from={{ opacity: 0, transform: 'scale(0.3)' }}
    to={{ opacity: 1, transform: 'scale(1)' }}
    duration={800}
    {...props}
  >
    {children}
  </AnimateIn>
);

// Stagger container for multiple elements
interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const Stagger: React.FC<StaggerProps> = ({ 
  children, 
  staggerDelay = 100,
  className = '' 
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <SlideUp key={index} delay={index * staggerDelay}>
          {child}
        </SlideUp>
      ))}
    </div>
  );
};

// Typewriter effect
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '' 
}) => {
  const { ref, isVisible } = useScrollAnimation({ delay });
  const [displayText, setDisplayText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isVisible, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

// Export all animations as a grouped object
export const Animate = {
  FadeIn,
  SlideUp,
  SlideLeft,
  SlideRight,
  ScaleIn,
  RotateIn,
  FlipIn,
  BounceIn,
  Stagger,
  Typewriter,
  Custom: AnimateIn
};
