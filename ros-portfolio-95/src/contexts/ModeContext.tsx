import { createContext, useContext, useState, type ReactNode } from 'react';

export type PortfolioMode = 'login' | 'explorer' | 'recruiter' | 'safe';

interface ModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  logout: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<PortfolioMode>('login');

  // Note: Intentionally NOT loading from localStorage on mount
  // This ensures refresh always returns to login screen
  // Users select mode each session for better UX

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    // Note: Not persisting to localStorage anymore
    // Each refresh returns to login screen
  };

  const logout = () => {
    setModeState('login');
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, logout }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
