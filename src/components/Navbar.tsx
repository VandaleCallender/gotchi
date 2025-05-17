import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { usePet } from '../context/PetContext';
import { useTheme } from '../context/ThemeContext';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pet } = usePet();
  const { theme, toggleTheme } = useTheme();
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-pixel text-primary-400">
              <span className="text-accent-500">Crypto</span>Gotchi
            </Link>
            <Link
              to="/docs"
              className={`text-sm ${
                location.pathname.startsWith('/docs')
                  ? 'text-primary-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Documentation
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-sm">Risk Score: {calculateRiskScore(pet.health)}</span>
            </div>
            
            <button
              onClick={() => toggleTheme()}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => open()}
              className="btn btn-primary"
            >
              {address ? formatAddress(address) : 'Connect Wallet'}
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
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/docs"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-sm">Risk Score: {calculateRiskScore(pet.health)}</span>
            </div>
            <button
              onClick={() => toggleTheme()}
              className="w-full btn btn-secondary flex items-center justify-center"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={() => open()}
              className="w-full btn btn-primary"
            >
              {address ? formatAddress(address) : 'Connect Wallet'}
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