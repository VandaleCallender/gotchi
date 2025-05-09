import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-10 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg -mt-1 left-full ml-2">
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1 top-2"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;