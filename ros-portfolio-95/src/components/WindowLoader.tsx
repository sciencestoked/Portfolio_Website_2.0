import { useEffect, useState } from 'react';
import './WindowLoader.css';

interface WindowLoaderProps {
  onLoadComplete: () => void;
  delay?: number;
}

const WindowLoader: React.FC<WindowLoaderProps> = ({ onLoadComplete, delay = 500 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 100);
          return 100;
        }
        return prev + 10;
      });
    }, delay / 10);

    return () => clearInterval(interval);
  }, [onLoadComplete, delay]);

  return (
    <div className="window-loader">
      <div className="loader-content">
        <div className="hourglass">⌛</div>
        <div className="loader-text">Loading...</div>
        <div className="loader-bar-container">
          <div className="loader-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default WindowLoader;
