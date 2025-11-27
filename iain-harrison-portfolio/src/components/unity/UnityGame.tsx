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
    // Get the correct base URL for GitHub Pages
    const baseUrl = process.env.PUBLIC_URL || '';
    console.log('PUBLIC_URL:', process.env.PUBLIC_URL);
    console.log('Current location:', window.location.href);
    
    // Load Unity loader script
    const script = document.createElement('script');
    script.src = `${baseUrl}/assets/Build/Builds.loader.js`;
    console.log('Loading Unity script from:', script.src);
    script.onload = () => {
      console.log('Unity loader script loaded successfully');
      // Use EXACT same Unity initialization code from original HTML
      if (window.createUnityInstance && canvasRef.current && fullscreenRef.current) {
        console.log('Initializing Unity with base URL:', baseUrl);
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
      } else {
        console.error('Unity initialization failed: missing dependencies');
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Unity loader script:', script.src);
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
