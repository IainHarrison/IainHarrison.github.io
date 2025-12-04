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
    console.log('Unity component mounted');
    console.log('Current window.location:', window.location.href);
    
    const loadUnityScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.createUnityInstance) {
          console.log('Unity script already loaded');
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = "./Build/Builds.loader.js";
        console.log('Loading Unity script from:', script.src);
        
        script.onload = () => {
          console.log('Unity script loaded successfully');
          resolve();
        };
        
        script.onerror = () => {
          console.error('Failed to load Unity script from:', script.src);
          reject(new Error('Unity script failed to load'));
        };
        
        document.head.appendChild(script);
      });
    };
    
    const initializeUnity = async () => {
      try {
        await loadUnityScript();
        
        if (!canvasRef.current) {
          console.error('Canvas not ready');
          setTimeout(initializeUnity, 500);
          return;
        }
        
        console.log('Initializing Unity instance...');
        const unityInstance = await window.createUnityInstance(canvasRef.current, {
          dataUrl: "./Build/Builds.data",
          frameworkUrl: "./Build/Builds.framework.js",
          codeUrl: "./Build/Builds.wasm",
          streamingAssetsUrl: "./StreamingAssets",
          companyName: "DefaultCompany",
          productName: "AboutMe portfolio game",
          productVersion: "1.0",
        });
        
        console.log('Unity instance created successfully');
        if (fullscreenRef.current) {
          fullscreenRef.current.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }
      } catch (error) {
        console.error('Unity initialization failed:', error);
      }
    };

    // Start initialization
    initializeUnity();
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
              width: '%UNITY_WIDTH%px',
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
