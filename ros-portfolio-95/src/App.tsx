import { useState } from 'react';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete && <BootScreen onBootComplete={() => setBootComplete(true)} />}
      {bootComplete && <Desktop />}
    </>
  );
}

export default App;
