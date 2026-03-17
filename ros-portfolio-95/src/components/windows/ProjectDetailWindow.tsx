import type { ProjectItem } from '../../data/portfolioData';
import './ProjectDetailWindow.css';

interface ProjectDetailWindowProps {
  project: ProjectItem;
}

const ProjectDetailWindow: React.FC<ProjectDetailWindowProps> = ({ project }) => {
  return (
    <div className="project-detail-window">
      <div className="project-header">
        <div className="project-thumbnail">
          <img src={project.thumbnail} alt={project.title} />
        </div>
        <div className="project-info">
          <h2>{project.title}</h2>
          <p className="project-period">{project.period}</p>
        </div>
      </div>

      {project.overview && (
        <div className="project-overview">
          <h3>Overview</h3>
          <p>{project.overview}</p>
        </div>
      )}

      {project.detailedAchievements && project.detailedAchievements.length > 0 && (
        <div className="project-detailed-achievements">
          <h3>Key Achievements</h3>
          {project.detailedAchievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      )}

      {project.challenges && (
        <div className="project-challenges">
          <h3>Challenges & Solutions</h3>
          <p>{project.challenges}</p>
        </div>
      )}

      <div className="project-technologies">
        <h3>Technologies Used</h3>
        <div className="tech-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      {project.impact && (
        <div className="project-impact">
          <h3>Impact</h3>
          <p>{project.impact}</p>
        </div>
      )}

      {project.images.length > 1 && (
        <div className="project-gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`${project.title} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailWindow;
