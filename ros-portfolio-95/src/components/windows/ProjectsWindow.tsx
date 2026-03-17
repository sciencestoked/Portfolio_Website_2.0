import { projects } from '../../data/portfolioData';
import Icon from '../Icon';
import './ProjectsWindow.css';

interface ProjectsWindowProps {
  onProjectClick: (projectId: string) => void;
}

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onProjectClick }) => {
  return (
    <div className="projects-window">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Icon
            key={project.id}
            id={project.id}
            title={project.title}
            icon={project.icon}
            x={20 + (index % 3) * 140}
            y={20 + Math.floor(index / 3) * 100}
            onClick={onProjectClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
