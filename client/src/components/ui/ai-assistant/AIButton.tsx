import { useState } from 'react';
import AIChatbot from './AIChatbot';

const AIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="w-16 h-16 rounded-full bg-gradient-to-r from-space-blue to-space-purple flex items-center justify-center shadow-neon-blue group relative"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-robot text-2xl"></i>
          <span className="absolute -top-10 right-0 glass px-3 py-1 rounded-full text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            AI Assistant
          </span>
        </button>
      </div>
      
      {isOpen && <AIChatbot onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AIButton;
