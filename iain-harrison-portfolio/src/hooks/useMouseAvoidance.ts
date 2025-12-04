import { useEffect } from 'react';

export const useMouseAvoidance = (containerSelector: string, elementSelector: string) => {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const elements = container.querySelectorAll(elementSelector);
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      mouseX = mouseEvent.clientX - rect.left;
      mouseY = mouseEvent.clientY - rect.top;

      elements.forEach((element) => {
        const el = element as HTMLElement;
        const elementRect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const elementX = elementRect.left - containerRect.left + elementRect.width / 2;
        const elementY = elementRect.top - containerRect.top + elementRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
        );
        
        const avoidanceRadius = 100; // pixels
        
        if (distance < avoidanceRadius) {
          const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
          const avoidanceDistance = Math.max(20, avoidanceRadius - distance);
          
          const avoidX = Math.cos(angle) * avoidanceDistance;
          const avoidY = Math.sin(angle) * avoidanceDistance;
          
          el.style.setProperty('--avoid-x', `${avoidX}px`);
          el.style.setProperty('--avoid-y', `${avoidY}px`);
          el.setAttribute('data-avoiding', 'true');
          el.removeAttribute('data-returning');
        } else if (el.getAttribute('data-avoiding') === 'true') {
          el.style.setProperty('--avoid-x', '0px');
          el.style.setProperty('--avoid-y', '0px');
          el.setAttribute('data-returning', 'true');
          el.removeAttribute('data-avoiding');
          
          // Remove returning attribute after animation
          setTimeout(() => {
            el.removeAttribute('data-returning');
          }, 800);
        }
      });
    };

    const handleMouseLeave = () => {
      // Return all elements to original positions
      elements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.setProperty('--avoid-x', '0px');
        el.style.setProperty('--avoid-y', '0px');
        el.setAttribute('data-returning', 'true');
        el.removeAttribute('data-avoiding');
        
        setTimeout(() => {
          el.removeAttribute('data-returning');
        }, 800);
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerSelector, elementSelector]);
};
