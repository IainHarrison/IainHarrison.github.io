import { useEffect, useRef, useState, useCallback } from 'react';

interface UseParallaxScrollOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallaxScroll = (options: UseParallaxScrollOptions = {}) => {
  const { speed = 0.3, direction = 'up', disabled = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;

    // Calculate parallax offset
    const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? 1 : -1);

    setOffset(parallaxOffset);
  }, [speed, direction, disabled]);

  useEffect(() => {
    if (disabled) return;

    const onScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, disabled]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const style: React.CSSProperties = prefersReducedMotion || disabled
    ? {}
    : {
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      };

  return { ref, style, offset };
};
