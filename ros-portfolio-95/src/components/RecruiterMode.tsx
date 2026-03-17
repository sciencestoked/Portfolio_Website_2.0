import { useMode } from '../contexts/ModeContext';
import './RecruiterMode.css';

const RecruiterMode = () => {
  const { logout } = useMode();

  return (
    <div className="recruiter-mode">
      <button className="recruiter-back-button" onClick={logout} title="Back to Login">
        ← Back
      </button>
      <iframe
        src="/recruiter/index.html"
        title="Professional Portfolio"
        className="recruiter-iframe"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default RecruiterMode;
