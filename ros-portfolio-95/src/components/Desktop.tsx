import { useState } from 'react';
import './Desktop.css';
import Icon from './Icon';
import Window from './Window';
import Taskbar from './Taskbar';
import PortfolioNavigator from './PortfolioNavigator';
import ExperienceWindow from './windows/ExperienceWindow';
import SkillsWindow from './windows/SkillsWindow';
import EducationWindow from './windows/EducationWindow';
import ContactWindow from './windows/ContactWindow';
import HobbiesWindow from './windows/HobbiesWindow';
import ResumeWindow from './windows/ResumeWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ProjectDetailWindow from './windows/ProjectDetailWindow';
import { projects } from '../data/portfolioData';

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
  minimized?: boolean;
}

const Desktop: React.FC<DesktopProps> = () => {
  const [icons] = useState<IconData[]>([
    { id: 'navigator', title: 'Portfolio Navigator', icon: '🐢', x: 20, y: 20 },
    { id: 'experience', title: 'Experience', icon: '📁', x: 20, y: 100 },
    { id: 'projects', title: 'Projects', icon: '📂', x: 20, y: 180 },
    { id: 'skills', title: 'Skills', icon: '🛠️', x: 20, y: 260 },
    { id: 'education', title: 'Education', icon: '🎓', x: 20, y: 340 },
    { id: 'contact', title: 'Contact', icon: '📧', x: 20, y: 420 },
    { id: 'hobbies', title: 'Hobbies', icon: '🎨', x: 20, y: 500 },
    { id: 'resume', title: 'Resume.pdf', icon: '📄', x: 20, y: 580 },
  ]);

  const [windows, setWindows] = useState<WindowData[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);

  const handleIconClick = (iconId: string) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === iconId);
    if (existingWindow) {
      // Bring to front and unminimize
      setWindows((prev) =>
        prev.map((w) =>
          w.id === iconId ? { ...w, zIndex: maxZIndex + 1, minimized: false } : w
        )
      );
      setMaxZIndex((prev) => prev + 1);
      return;
    }

    // Create new window
    const icon = icons.find((i) => i.id === iconId);

    let content: React.ReactNode;
    let width = 600;
    let height = 400;
    let title = icon?.title || iconId;

    if (iconId === 'navigator') {
      content = <PortfolioNavigator onIconReached={handleIconReached} />;
      width = 820;
      height = 750;
    } else if (iconId === 'experience') {
      content = <ExperienceWindow />;
      width = 700;
      height = 600;
    } else if (iconId === 'skills') {
      content = <SkillsWindow />;
      width = 650;
      height = 500;
    } else if (iconId === 'education') {
      content = <EducationWindow />;
      width = 550;
      height = 450;
    } else if (iconId === 'contact') {
      content = <ContactWindow />;
      width = 700;
      height = 600;
    } else if (iconId === 'hobbies') {
      content = <HobbiesWindow />;
      width = 600;
      height = 500;
    } else if (iconId === 'resume') {
      content = <ResumeWindow />;
      width = 800;
      height = 600;
    } else if (iconId === 'projects') {
      content = <ProjectsWindow onProjectClick={handleIconClick} />;
      width = 640;
      height = 480;
    } else {
      // Check if it's a project detail window
      const project = projects.find(p => p.id === iconId);
      if (project) {
        content = <ProjectDetailWindow project={project} />;
        width = 750;
        height = 600;
        title = project.title;
      } else {
        content = <div>Content for {title}</div>;
      }
    }

    // Check if this is being opened from the projects window
    const project = projects.find(p => p.id === iconId);
    const isProjectDetail = !!project;

    const newWindow: WindowData = {
      id: iconId,
      title: title,
      content,
      width,
      height,
      x: 100 + windows.length * 30,
      y: 50 + windows.length * 30,
      zIndex: maxZIndex + 5,
    };

    setWindows((prev) => {
      // If opening a project detail, lower the projects window z-index
      if (isProjectDetail) {
        return [...prev.map(w => w.id === 'projects' ? { ...w, zIndex: maxZIndex } : w), newWindow];
      }
      return [...prev, newWindow];
    });
    setMaxZIndex((prev) => prev + 5);
  };

  const handleIconReached = (iconId: string) => {
    // Open portfolio window when turtle reaches icon in maze
    setMaxZIndex((prevMax) => {
      const newZIndex = prevMax + 10;

      setWindows((prev) => {
        const existingWindow = prev.find((w) => w.id === iconId);

        if (existingWindow) {
          // Bring existing window to front
          return prev.map((w) =>
            w.id === iconId ? { ...w, zIndex: newZIndex } : w
          );
        }

        // Create new window with appropriate content
        let content: React.ReactNode;
        let width = 600;
        let height = 400;
        let title = iconId.charAt(0).toUpperCase() + iconId.slice(1);

        if (iconId === 'experience') {
          content = <ExperienceWindow />;
          width = 700;
          height = 600;
        } else if (iconId === 'skills') {
          content = <SkillsWindow />;
          width = 650;
          height = 500;
        } else if (iconId === 'education') {
          content = <EducationWindow />;
          width = 550;
          height = 450;
        } else if (iconId === 'contact') {
          content = <ContactWindow />;
          width = 700;
          height = 600;
        } else if (iconId === 'hobbies') {
          content = <HobbiesWindow />;
          width = 600;
          height = 500;
        } else if (iconId === 'projects') {
          content = <ProjectsWindow onProjectClick={handleIconClick} />;
          width = 640;
          height = 480;
        } else {
          // Check if it's a project detail window
          const project = projects.find(p => p.id === iconId);
          if (project) {
            content = <ProjectDetailWindow project={project} />;
            width = 750;
            height = 600;
          } else {
            content = <div><h2>{title}</h2><p>Content coming soon...</p></div>;
          }
        }

        const newWindow: WindowData = {
          id: iconId,
          title,
          content,
          width,
          height,
          x: 150 + prev.length * 30,
          y: 80 + prev.length * 30,
          zIndex: newZIndex,
        };

        return [...prev, newWindow];
      });

      return newZIndex;
    });
  };

  const handleCloseWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const handleMinimizeWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, minimized: true } : w
      )
    );
  };

  const handleRestoreWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, minimized: false, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
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
          minimized={window.minimized || false}
          onClose={handleCloseWindow}
          onMinimize={handleMinimizeWindow}
          onClick={handleWindowClick}
        >
          {window.content}
        </Window>
      ))}

      <Taskbar
        windows={windows}
        onRestoreWindow={handleRestoreWindow}
      />
    </div>
  );
};

export default Desktop;
