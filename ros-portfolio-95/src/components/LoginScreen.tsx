import { useState } from 'react';
import { useMode } from '../contexts/ModeContext';
import './LoginScreen.css';

const LoginScreen = () => {
  const { setMode } = useMode();
  const [selectedUser, setSelectedUser] = useState<'explorer' | 'recruiter' | null>(null);

  const handleLogin = () => {
    if (selectedUser) {
      setMode(selectedUser);
    }
  };

  const handleSafeMode = () => {
    setMode('safe');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedUser) {
      handleLogin();
    }
  };

  return (
    <div className="login-screen">
      <div className="login-background"></div>

      <div className="login-dialog">
        <div className="login-header">
          <div className="login-logo">Portfolio OS</div>
          <div className="login-subtitle">Select a user to continue</div>
        </div>

        <div className="login-users">
          <button
            className={`user-profile ${selectedUser === 'explorer' ? 'selected' : ''}`}
            onClick={() => setSelectedUser('explorer')}
            onKeyPress={handleKeyPress}
          >
            <div className="user-icon">🐢</div>
            <div className="user-name">Explorer</div>
            <div className="user-description">Interactive portfolio with games and navigation</div>
          </button>

          <button
            className={`user-profile ${selectedUser === 'recruiter' ? 'selected' : ''}`}
            onClick={() => setSelectedUser('recruiter')}
            onKeyPress={handleKeyPress}
          >
            <div className="user-icon">💼</div>
            <div className="user-name">Recruiter</div>
            <div className="user-description">Clean, professional portfolio overview</div>
          </button>
        </div>

        <div className="login-buttons">
          <button
            className="login-button ok-button"
            onClick={handleLogin}
            disabled={!selectedUser}
          >
            OK
          </button>
          <button
            className="login-button cancel-button"
            disabled
          >
            Cancel
          </button>
        </div>
      </div>

      <button className="safe-mode-link" onClick={handleSafeMode}>
        Boot in Safe Mode
      </button>
    </div>
  );
};

export default LoginScreen;
