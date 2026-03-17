import { useState } from 'react';
import { Rnd } from 'react-rnd';
import WindowLoader from './WindowLoader';
import './Window.css';

interface WindowProps {
  id: string;
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
  minimized: boolean;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onClick: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  width,
  height,
  x,
  y,
  zIndex,
  minimized,
  children,
  onClose,
  onMinimize,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleMinimize = () => {
    onMinimize(id);
  };

  if (minimized) {
    return null;
  }

  return (
    <Rnd
      default={{
        x,
        y,
        width,
        height,
      }}
      minWidth={200}
      minHeight={150}
      bounds="parent"
      style={{ zIndex }}
      dragHandleClassName="window-title-bar"
      onMouseDown={() => onClick(id)}
    >
      <div className="window">
        <div className="window-title-bar">
          <span className="window-title">{title}</span>
          <div className="window-controls">
            <button className="window-button minimize" onClick={handleMinimize}>_</button>
            <button className="window-button maximize">□</button>
            <button className="window-button close" onClick={() => onClose(id)}>
              ×
            </button>
          </div>
        </div>
        <div className="window-content">
          {isLoading ? (
            <WindowLoader onLoadComplete={() => setIsLoading(false)} />
          ) : (
            children
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
