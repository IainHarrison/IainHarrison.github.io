import { useEffect, useState } from 'react';

interface UseActiveSectionOptions {
  sectionIds: string[];
  offset?: number;
}

export const useActiveSection = ({ sectionIds, offset = 100 }: UseActiveSectionOptions) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionVisibility: Map<string, number> = new Map();

    // Initialize all sections as not visible
    sectionIds.forEach(id => sectionVisibility.set(id, 0));

    const updateActiveSection = () => {
      // Special case: if scrolled near bottom, activate last section
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (scrolledToBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Find the section with highest visibility ratio
      let maxRatio = 0;
      let mostVisibleSection = sectionIds[0];

      sectionVisibility.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleSection = id;
        }
      });

      // Only update if we have a visible section
      if (maxRatio > 0) {
        setActiveSection(mostVisibleSection);
      }
    };

    // Create an observer for each section
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          sectionVisibility.set(id, entry.intersectionRatio);
          updateActiveSection();
        },
        {
          // Multiple thresholds for smoother tracking
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          // Offset from top to account for header
          rootMargin: `-${offset}px 0px -40% 0px`
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Also listen for scroll to catch bottom of page
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => {
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [sectionIds, offset]);

  return activeSection;
};
