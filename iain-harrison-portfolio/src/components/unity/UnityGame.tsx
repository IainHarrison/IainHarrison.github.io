import React, { useEffect, useRef } from 'react';

interface UnityGameProps {
  className?: string;
}

declare global {
  interface Window {
    createUnityInstance: any;
  }
}

const UnityGame: React.FC<UnityGameProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Unity loader script
    const script = document.createElement('script');
    script.src = '/assets/Build/Builds.loader.js';
    script.onload = () => {
      // Use EXACT same Unity initialization code from original HTML
      if (window.createUnityInstance && canvasRef.current && fullscreenRef.current) {
        window.createUnityInstance(canvasRef.current, {
          dataUrl: "/assets/Build/Builds.data",
          frameworkUrl: "/assets/Build/Builds.framework.js",
          codeUrl: "/assets/Build/Builds.wasm",
          streamingAssetsUrl: "/assets/StreamingAssets",
          companyName: "DefaultCompany",
          productName: "AboutMe portfolio game",
          productVersion: "1.0",
        }).then((unityInstance: any) => {
          if (fullscreenRef.current) {
            fullscreenRef.current.onclick = () => {
              unityInstance.SetFullscreen(1);
            };
          }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section className={`game ${className || ''}`}>
      <div className="game-container">
        <h3 className="game-title">Interactive Portfolio Demo</h3>
        <canvas ref={canvasRef} id="unity-canvas"></canvas>
        <div className="game-controls">
          <div 
            ref={fullscreenRef}
            style={{
              textAlign: 'center',
              color: '#486F9E',
              height: '20px',
              cursor: 'pointer'
            }}
          >
            <span className="fullscreen-text">
              <i className='bx bx-fullscreen'></i> Click here to play in fullscreen
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnityGame;
