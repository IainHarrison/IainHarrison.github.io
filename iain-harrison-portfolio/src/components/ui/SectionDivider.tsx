import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'angle' | 'zigzag';
  color?: string;
  flipVertical?: boolean;
  height?: number;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  color = 'var(--first-color-lighten)',
  flipVertical = false,
  height = 60
}) => {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        return 'M0,40 C200,100 400,0 600,40 C800,80 1000,0 1200,40 L1200,120 L0,120 Z';
      case 'curve':
        return 'M0,80 Q600,0 1200,80 L1200,120 L0,120 Z';
      case 'angle':
        return 'M0,120 L600,40 L1200,120 L1200,120 L0,120 Z';
      case 'zigzag':
        return 'M0,60 L150,30 L300,60 L450,30 L600,60 L750,30 L900,60 L1050,30 L1200,60 L1200,120 L0,120 Z';
      default:
        return 'M0,40 C200,100 400,0 600,40 C800,80 1000,0 1200,40 L1200,120 L0,120 Z';
    }
  };

  return (
    <div
      className="section-divider"
      style={{
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        lineHeight: 0,
        transform: flipVertical ? 'rotate(180deg)' : 'none',
        marginTop: flipVertical ? 0 : '-1px',
        marginBottom: flipVertical ? '-1px' : 0,
        pointerEvents: 'none'
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        <path
          d={getPath()}
          fill={color}
          style={{
            transition: 'fill 0.3s ease'
          }}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
