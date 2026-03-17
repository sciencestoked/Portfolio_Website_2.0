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

  console.log('AppContent rendering, mode:', mode, 'bootComplete:', bootComplete);

  // Show boot screen first for Explorer mode
  if (mode === 'explorer' && !bootComplete) {
    return <BootScreen onBootComplete={() => setBootComplete(true)} />;
  }

  // Route based on selected mode
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
