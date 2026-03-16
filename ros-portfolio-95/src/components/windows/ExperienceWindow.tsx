import { useState } from 'react';
import { experiences } from '../../data/portfolioData';
import './ExperienceWindow.css';

const ExperienceWindow: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="experience-window">
      <div className="experience-header">
        <h2>Experience & Recent Work</h2>
        <p>My professional journey in robotics and machine learning</p>
      </div>

      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div
              className="experience-summary"
              onClick={() => toggleExpand(exp.id)}
            >
              <div className="experience-title">
                <h3>{exp.company}</h3>
                <span className="expand-icon">{expandedId === exp.id ? '−' : '+'}</span>
              </div>
              <div className="experience-role">{exp.role}</div>
              <div className="experience-meta">
                <span className="period">{exp.period}</span>
                <span className="location">{exp.location}</span>
              </div>
            </div>

            {expandedId === exp.id && (
              <div className="experience-details">
                <div className="highlights">
                  <strong>Key Highlights:</strong>
                  <ul>
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="description">
                  <strong>Responsibilities:</strong>
                  <ul>
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>

                {exp.technologies && (
                  <div className="technologies">
                    <strong>Technologies:</strong>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWindow;
