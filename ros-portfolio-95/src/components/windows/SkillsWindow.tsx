import { skillCategories } from '../../data/portfolioData';
import './SkillsWindow.css';

const SkillsWindow: React.FC = () => {
  return (
    <div className="skills-window">
      <div className="skills-header">
        <h2>Skills & Technologies</h2>
        <p>My technical expertise across robotics and machine learning</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category) => (
          <fieldset key={category.title} className="skill-category">
            <legend>
              <span className="category-icon">{category.icon}</span>
              {category.title}
            </legend>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <div key={skill} className="skill-item">
                  • {skill}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default SkillsWindow;
