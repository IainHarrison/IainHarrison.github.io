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
    const baseUrl = process.env.PUBLIC_URL || '';
    console.log('Unity component mounted, PUBLIC_URL:', baseUrl);
    
    const initializeUnity = () => {
      if (window.createUnityInstance && canvasRef.current) {
        console.log('Initializing Unity instance with baseUrl:', baseUrl);
        window.createUnityInstance(canvasRef.current, {
          dataUrl: `${baseUrl}/assets/Build/Builds.data`,
          frameworkUrl: `${baseUrl}/assets/Build/Builds.framework.js`,
          codeUrl: `${baseUrl}/assets/Build/Builds.wasm`,
          streamingAssetsUrl: `${baseUrl}/assets/StreamingAssets`,
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
      } else if (!window.createUnityInstance) {
        console.log('createUnityInstance not available, trying to load script dynamically...');
        // Fallback: load script dynamically if not loaded from HTML
        const script = document.createElement('script');
        script.src = `${baseUrl}/assets/Build/Builds.loader.js`;
        script.onload = () => {
          console.log('Unity script loaded dynamically');
          setTimeout(initializeUnity, 100);
        };
        script.onerror = () => {
          console.error('Failed to load Unity script:', script.src);
        };
        document.head.appendChild(script);
      } else {
        console.log('Canvas not ready, retrying...');
        setTimeout(initializeUnity, 500);
      }
    };

    // Start initialization after a short delay
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
