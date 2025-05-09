import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to CryptoGotchi!",
      content: (
        <>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <p className="mb-4">
            Meet your new Web3 risk management companion. CryptoGotchi is a fun, interactive way to monitor and mitigate risks in your crypto portfolio.
          </p>
          <p>
            Just like a Tamagotchi, your CryptoGotchi needs attention and care - but instead of feeding it, you'll be improving your crypto security and reducing risks!
          </p>
        </>
      )
    },
    {
      title: "How It Works",
      content: (
        <>
          <p className="mb-4">
            Your CryptoGotchi's health reflects your portfolio's risk level. The lower the risk, the healthier and happier your pet will be!
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Monitor your portfolio's risk metrics</li>
            <li>Take actions to improve security</li>
            <li>Watch your CryptoGotchi thrive as risks decrease</li>
            <li>Get alerts when new risks are detected</li>
          </ul>
          <p>
            Remember, a neglected CryptoGotchi means neglected security!
          </p>
        </>
      )
    },
    {
      title: "Let's Get Started",
      content: (
        <>
          <p className="mb-4">
            In this demo version, we've pre-populated your portfolio with sample assets and risk metrics.
          </p>
          <p className="mb-4">
            Interact with your CryptoGotchi by:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Using the action buttons to perform security checks</li>
            <li>Monitoring risk categories on the dashboard</li>
            <li>Checking asset details for specific risk factors</li>
          </ul>
          <p>
            Ready to take control of your Web3 risks?
          </p>
        </>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-center text-primary-400 mb-6">{steps[currentStep].title}</h1>
      
      <div className="mb-8">
        {steps[currentStep].content}
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className={`btn ${currentStep === 0 ? 'invisible' : ''}`}
        >
          Back
        </button>
        
        <div className="flex space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-primary-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="btn btn-primary"
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;