import { useEffect, useState } from 'react';
import './BootScreen.css';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Simulate boot progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Fade out and complete
          setTimeout(() => {
            setShowLogo(false);
            setTimeout(onBootComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  if (!showLogo) return null;

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <img
          src="/logo-white-bg.png"
          alt="Portfolio OS Logo"
          className="portfolio-logo"
        />
        <h1 className="boot-title">Portfolio OS</h1>
        <p className="boot-text">Starting Portfolio OS...</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
