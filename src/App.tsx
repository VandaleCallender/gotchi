import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Documentation from './components/docs/Documentation';
import { usePet } from './context/PetContext';
import Modal from './components/common/Modal';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const { initialized } = usePet();
  const [showWelcome, setShowWelcome] = useState(!initialized);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <Routes>
          <Route path="/docs/*" element={<Documentation />} />
          <Route path="/" element={
            <main className="container mx-auto px-4 py-8">
              <Dashboard />
            </main>
          } />
        </Routes>

        <Modal isOpen={showWelcome} onClose={() => setShowWelcome(false)}>
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;