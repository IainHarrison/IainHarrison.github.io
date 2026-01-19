import { useCallback, useRef } from 'react';

export const use3DCardEffect = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.setProperty('--mouse-x', x.toString());
    card.style.setProperty('--mouse-y', y.toString());
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.classList.add('mouse-tracking');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.classList.remove('mouse-tracking');
      card.style.setProperty('--mouse-x', '0.5');
      card.style.setProperty('--mouse-y', '0.5');
    }
  }, []);

  return {
    ref: cardRef,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };
};
