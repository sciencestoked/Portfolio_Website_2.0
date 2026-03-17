import { useEffect, useState } from 'react';
import { useMode } from '../contexts/ModeContext';
import './Taskbar.css';

interface WindowData {
  id: string;
  title: string;
  minimized?: boolean;
}

interface TaskbarProps {
  windows: WindowData[];
  onRestoreWindow: (windowId: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onRestoreWindow }) => {
  const [time, setTime] = useState(new Date());
  const { logout } = useMode();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="taskbar">
      <button className="start-button">
        <span className="start-icon">⊞</span>
        Start
      </button>
      <div className="taskbar-apps">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-app ${window.minimized ? 'minimized' : 'active'}`}
            onClick={() => window.minimized && onRestoreWindow(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>
      <div className="taskbar-tray">
        <button
          className="mode-switcher"
          onClick={logout}
          title="Switch Mode"
        >
          ⚙
        </button>
        <div className="clock">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Taskbar;
