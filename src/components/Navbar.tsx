import React, { useState } from 'react';
import { Menu, X, Settings, HelpCircle } from 'lucide-react';
import { usePet } from '../context/PetContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pet } = usePet();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-pixel text-primary-400">
              <span className="text-accent-500">Crypto</span>Gotchi
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-sm">Risk Score: {calculateRiskScore(pet.health)}</span>
            </div>
            <button className="btn-secondary flex items-center text-sm">
              <Settings size={16} className="mr-2" />
              Settings
            </button>
            <button className="btn-accent flex items-center text-sm">
              <HelpCircle size={16} className="mr-2" />
              Help
            </button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-sm">Risk Score: {calculateRiskScore(pet.health)}</span>
            </div>
            <button className="w-full btn-secondary flex items-center justify-center text-sm">
              <Settings size={16} className="mr-2" />
              Settings
            </button>
            <button className="w-full btn-accent flex items-center justify-center text-sm">
              <HelpCircle size={16} className="mr-2" />
              Help
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper function to calculate risk score from health
const calculateRiskScore = (health: number): string => {
  return `${Math.max(0, 100 - health)}%`;
};

export default Navbar;