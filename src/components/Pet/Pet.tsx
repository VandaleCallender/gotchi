import React, { useEffect, useState } from 'react';
import { usePet } from '../../context/PetContext';
import PetActions from './PetActions';
import PetStatus from './PetStatus';
import { AlertTriangle } from 'lucide-react';

interface PetSprite {
  x: number;
  y: number;
  sprite: number;
  animation: 'idle' | 'happy' | 'sad' | 'sick';
}

const Pet: React.FC = () => {
  const { pet, petActions } = usePet();
  const [sprite, setSprite] = useState<PetSprite>({
    x: 50,
    y: 50,
    sprite: 1,
    animation: 'idle'
  });

  // Update sprite based on pet mood
  useEffect(() => {
    const getMoodAnimation = () => {
      switch (pet.currentMood) {
        case 'happy': return 'happy';
        case 'sad': return 'sad';
        case 'sick':
        case 'critical': return 'sick';
        default: return 'idle';
      }
    };

    setSprite(prev => ({
      ...prev,
      animation: getMoodAnimation()
    }));

    // Random movement
    const interval = setInterval(() => {
      setSprite(prev => ({
        ...prev,
        x: Math.max(20, Math.min(80, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.max(30, Math.min(70, prev.y + (Math.random() - 0.5) * 10)),
        sprite: prev.sprite === 1 ? 2 : 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [pet.currentMood]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center mb-2 text-primary-400">Your CryptoGotchi</h2>
      
      <div className="pet-container my-4">
        <div className="pet-screen relative">
          {renderPetSprite(sprite)}
          
          {pet.needsAttention && (
            <div className="absolute top-2 right-2 animate-bounce-slow">
              <AlertTriangle className="text-warning-500 h-6 w-6" />
            </div>
          )}
        </div>
      </div>
      
      <PetStatus health={pet.health} happiness={pet.happiness} />
      <PetActions actions={petActions} />
    </div>
  );
};

const renderPetSprite = (sprite: PetSprite) => {
  // This function would normally render different sprites based on mood
  // For now we'll use placeholder colored divs with animations
  
  const getAnimationClass = () => {
    switch (sprite.animation) {
      case 'happy': return 'animate-bounce-slow';
      case 'sad': return 'animate-pulse-slow';
      case 'sick': return 'animate-wiggle';
      default: return '';
    }
  };
  
  const getMoodColor = () => {
    switch (sprite.animation) {
      case 'happy': return 'bg-success-500';
      case 'sad': return 'bg-warning-500';
      case 'sick': return 'bg-danger-500';
      default: return 'bg-primary-400';
    }
  };
  
  return (
    <div 
      className={`absolute ${getAnimationClass()}`}
      style={{ 
        left: `${sprite.x}%`, 
        top: `${sprite.y}%`, 
        transform: 'translate(-50%, -50%)' 
      }}
    >
      <div className="relative">
        {/* Body */}
        <div 
          className={`w-16 h-16 rounded-full ${getMoodColor()} shadow-lg transition-all`}
        ></div>
        
        {/* Eyes */}
        <div className="absolute top-4 left-3 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-4 right-3 w-2 h-2 bg-gray-900 rounded-full"></div>
        
        {/* Mouth */}
        <div className={`absolute ${sprite.animation === 'happy' ? 'bottom-4' : (sprite.animation === 'sad' ? 'bottom-2' : 'bottom-3')} left-1/2 transform -translate-x-1/2 w-4 h-${sprite.animation === 'happy' ? '2' : '1'} bg-gray-900 rounded-full ${sprite.animation === 'sad' ? 'rotate-180' : ''}`}></div>
      </div>
    </div>
  );
};

export default Pet;