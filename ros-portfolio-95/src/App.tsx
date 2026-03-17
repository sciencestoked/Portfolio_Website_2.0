import { useState } from 'react';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import SafeMode from './components/SafeMode';
import RecruiterMode from './components/RecruiterMode';
import { ModeProvider, useMode } from './contexts/ModeContext';

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const { mode } = useMode();

  // Show boot screen FIRST, before anything else
  if (!bootComplete) {
    return <BootScreen onBootComplete={() => setBootComplete(true)} />;
  }

  // After boot complete, route based on selected mode
  switch (mode) {
    case 'login':
      return <LoginScreen />;

    case 'explorer':
      return <Desktop />;

    case 'recruiter':
      return <RecruiterMode />;

    case 'safe':
      return <SafeMode />;

    default:
      return <LoginScreen />;
  }
}

function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  );
}

export default App;
