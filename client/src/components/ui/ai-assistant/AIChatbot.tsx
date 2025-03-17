import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type Question = {
  id: string;
  text: string;
  icon: string;
  color: string;
};

const popularQuestions: Question[] = [
  {
    id: '1',
    text: 'What medical requirements exist for space travel?',
    icon: 'fas fa-question-circle',
    color: 'text-space-blue'
  },
  {
    id: '2',
    text: 'How is the zero-gravity experience different between destinations?',
    icon: 'fas fa-question-circle',
    color: 'text-space-purple'
  },
  {
    id: '3',
    text: 'What\'s included in the luxury cabin experience?',
    icon: 'fas fa-question-circle',
    color: 'text-space-pink'
  },
  {
    id: '4',
    text: 'Can I customize my space journey itinerary?',
    icon: 'fas fa-question-circle',
    color: 'text-space-green'
  },
  {
    id: '5',
    text: 'What payment methods do you accept for space travel bookings?',
    icon: 'fas fa-question-circle',
    color: 'text-space-yellow'
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Welcome to Dubai Spaceport\'s AI assistant. How can I help plan your space journey today?',
    sender: 'ai'
  }
];

type AIChatbotProps = {
  onClose: () => void;
};

const AIChatbot = ({ onClose }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateResponse = (question: string): string => {
    // Simple response mapping
    if (question.toLowerCase().includes('mars')) {
      return "Great question! The journey to Mars takes approximately 3-4 months each way using our current spacecraft technology. We offer several options:\n\n- Standard Journey: 4 months travel with 2 weeks on Mars\n- Extended Stay: 4 months travel with 3-6 months on Mars\n- Cryosleep Option: Travel while in stasis for minimal perceived journey time\n\nWould you like details on any specific option, or information about our Mars accommodations?";
    } else if (question.toLowerCase().includes('price') || question.toLowerCase().includes('cost')) {
      return "Our pricing depends on the destination, cabin class, and duration of your journey. Prices range from 750,000 AED for an Economy shuttle to the ISS, up to 12,500,000 AED for a luxury experience to Mars Colony Alpha. Would you like a detailed price breakdown for a specific destination?";
    } else if (question.toLowerCase().includes('medical') || question.toLowerCase().includes('health')) {
      return "All space travelers undergo a comprehensive medical evaluation before departure. Basic requirements include cardiovascular health assessment, bone density scans, and psychological evaluation. We provide pre-flight medical training and have medical professionals onboard for all journeys. Would you like more information about our medical protocols?";
    } else {
      return "Thank you for your question. Our team is constantly updating my knowledge base. Could you provide more details so I can assist you better with planning your space journey?";
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleQuestionClick = (question: Question) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(question.text),
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="glass w-full max-w-4xl h-[80vh] mx-4 rounded-xl overflow-hidden neon-border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center">
                <i className="fas fa-robot text-space-blue"></i>
              </div>
              <h2 className="font-space text-xl font-bold">AI Space Travel Concierge</h2>
            </div>
            <button 
              className="text-white/60 hover:text-white transition-colors text-xl"
              onClick={onClose}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 h-[calc(80vh-65px)]">
            {/* Chat section */}
            <div className="lg:col-span-3 p-6 flex flex-col overflow-hidden">
              <div className="flex-grow overflow-y-auto hide-scrollbar space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center shrink-0">
                        <i className="fas fa-robot text-space-blue"></i>
                      </div>
                    )}
                    
                    <div className={`glass rounded-lg p-3 max-w-md ${message.sender === 'user' ? 'bg-white/5' : ''}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-space-purple/20 border border-space-purple/50 flex items-center justify-center shrink-0">
                        <i className="fas fa-user text-space-purple"></i>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center shrink-0">
                      <i className="fas fa-robot text-space-blue"></i>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-space-blue animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-space-purple animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-space-pink animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="mt-6 flex">
                <input 
                  type="text" 
                  placeholder="Ask about destinations, experiences, or travel requirements..." 
                  className="w-full glass p-3 rounded-l-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-4 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-r-lg"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
            
            {/* Popular questions */}
            <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/10 p-6 overflow-y-auto hide-scrollbar">
              <h3 className="font-space text-xl font-bold mb-4">Popular Questions</h3>
              <div className="space-y-3">
                {popularQuestions.map(question => (
                  <button 
                    key={question.id}
                    className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <i className={`${question.icon} ${question.color} mr-2`}></i>
                    {question.text}
                    <i className={`fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity ${question.color}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChatbot;
