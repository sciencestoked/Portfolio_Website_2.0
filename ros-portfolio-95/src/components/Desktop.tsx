import { useState } from 'react';
import './Desktop.css';
import Icon from './Icon';
import Window from './Window';
import Taskbar from './Taskbar';

interface DesktopProps {
  children?: React.ReactNode;
}

export interface IconData {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
}

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
}

const Desktop: React.FC<DesktopProps> = () => {
  const [icons] = useState<IconData[]>([
    { id: 'experience', title: 'Experience', icon: '📁', x: 20, y: 20 },
    { id: 'skills', title: 'Skills', icon: '🛠️', x: 20, y: 100 },
    { id: 'education', title: 'Education', icon: '🎓', x: 20, y: 180 },
    { id: 'contact', title: 'Contact', icon: '📧', x: 20, y: 260 },
    { id: 'hobbies', title: 'Hobbies', icon: '🎨', x: 20, y: 340 },
  ]);

  const [windows, setWindows] = useState<WindowData[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);

  const handleIconClick = (iconId: string) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === iconId);
    if (existingWindow) {
      // Bring to front
      setWindows((prev) =>
        prev.map((w) =>
          w.id === iconId ? { ...w, zIndex: maxZIndex + 1 } : w
        )
      );
      setMaxZIndex((prev) => prev + 1);
      return;
    }

    // Create new window
    const icon = icons.find((i) => i.id === iconId);
    if (!icon) return;

    const newWindow: WindowData = {
      id: iconId,
      title: icon.title,
      content: <div>Content for {icon.title}</div>,
      width: 600,
      height: 400,
      x: 100 + windows.length * 30,
      y: 100 + windows.length * 30,
      zIndex: maxZIndex + 1,
    };

    setWindows((prev) => [...prev, newWindow]);
    setMaxZIndex((prev) => prev + 1);
  };

  const handleCloseWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const handleWindowClick = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
  };

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {icons.map((icon) => (
          <Icon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            icon={icon.icon}
            x={icon.x}
            y={icon.y}
            onClick={handleIconClick}
          />
        ))}
      </div>

      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          width={window.width}
          height={window.height}
          x={window.x}
          y={window.y}
          zIndex={window.zIndex}
          onClose={handleCloseWindow}
          onClick={handleWindowClick}
        >
          {window.content}
        </Window>
      ))}

      <Taskbar />
    </div>
  );
};

export default Desktop;
