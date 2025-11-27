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
    // Unity loader script is already loaded in index.html
    // Wait a bit for script to be ready, then initialize Unity
    const initializeUnity = () => {
      if (window.createUnityInstance && canvasRef.current) {
        console.log('Initializing Unity instance...');
        window.createUnityInstance(canvasRef.current, {
          dataUrl: "/assets/Build/Builds.data",
          frameworkUrl: "/assets/Build/Builds.framework.js",
          codeUrl: "/assets/Build/Builds.wasm",
          streamingAssetsUrl: "/assets/StreamingAssets",
          companyName: "DefaultCompany",
          productName: "AboutMe portfolio game",
          productVersion: "1.0",
        }).then((unityInstance: any) => {
          console.log('Unity instance created successfully');
          if (fullscreenRef.current) {
            fullscreenRef.current.onclick = () => {
              unityInstance.SetFullscreen(1);
            };
          }
        }).catch((error: any) => {
          console.error('Unity initialization failed:', error);
        });
      } else {
        console.error('Unity initialization failed: createUnityInstance not available or canvas not ready');
        // Retry after a short delay
        setTimeout(initializeUnity, 500);
      }
    };

    // Start initialization after a short delay to ensure everything is ready
    const timer = setTimeout(initializeUnity, 100);

    return () => {
      clearTimeout(timer);
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
            id="fullScreen"
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
