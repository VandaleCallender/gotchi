import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { usePet } from './context/PetContext';
import Modal from './components/common/Modal';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const { initialized } = usePet();
  const [showWelcome, setShowWelcome] = useState(!initialized);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>

      <Modal isOpen={showWelcome} onClose={() => setShowWelcome(false)}>
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      </Modal>
    </div>
  );
}

export default App;