import { education } from '../../data/portfolioData';
import './EducationWindow.css';

const EducationWindow: React.FC = () => {
  return (
    <div className="education-window">
      <div className="education-header">
        <h2>Education</h2>
        <p>Academic background</p>
      </div>

      <div className="education-content">
        <fieldset className="education-card">
          <legend>🎓 Academic Credentials</legend>
          <div className="education-details">
            <h3>{education.institution}</h3>
            <div className="degree">{education.degree}</div>
            <div className="graduation">Graduated: <strong>{education.graduated}</strong></div>
          </div>
        </fieldset>

        <div className="additional-info">
          <p>
            Completed B.Tech in Mechanical Engineering from one of India's premier technical institutes.
            During my time at IIT(ISM), I developed a strong foundation in engineering principles
            while actively pursuing interests in robotics and machine learning through various projects
            and extracurricular activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationWindow;
