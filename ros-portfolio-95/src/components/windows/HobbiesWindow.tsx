import { hobbies } from '../../data/portfolioData';
import './HobbiesWindow.css';

const HobbiesWindow: React.FC = () => {
  return (
    <div className="hobbies-window">
      <div className="hobbies-header">
        <h2>Hobbies & Interests</h2>
        <p>What I do outside of work</p>
      </div>

      <div className="hobbies-content">
        <div className="intro">
          <p>
            Outside of my professional life, I pursue hobbies that enrich my experiences
            and maintain a balanced lifestyle. These interests not only provide relaxation
            but also complement my technical work in unexpected ways.
          </p>
        </div>

        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <fieldset key={hobby.title} className="hobby-card">
              <legend>
                <span className="hobby-icon">{hobby.icon}</span>
                {hobby.title}
              </legend>
              <div className="hobby-description">
                {hobby.description}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HobbiesWindow;
