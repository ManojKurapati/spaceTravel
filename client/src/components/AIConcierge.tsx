import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ChatMessage } from '@shared/schema';

const AIConcierge = () => {
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Query for chat messages
  const { data: chatMessages, isLoading } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat-messages'],
  });
  
  // Default starting messages if no chat history
  const defaultMessages = [
    {
      id: 1,
      userId: 1,
      isUserMessage: false,
      message: "Hello! I'm NOVA, your AI space travel assistant. How can I help plan your cosmic journey today?",
      timestamp: new Date()
    },
    {
      id: 2,
      userId: 1,
      isUserMessage: true,
      message: "I'm interested in visiting the Mars Colony. What's the best time to go?",
      timestamp: new Date()
    },
    {
      id: 3,
      userId: 1,
      isUserMessage: false,
      message: "Great choice! For Mars Colony Alpha, I recommend scheduling your trip during the Martian Summer (July-September 2050), when temperatures are milder and dust storms are less frequent. The Mars Explorer Pro package is particularly popular during this period.",
      timestamp: new Date()
    },
    {
      id: 4,
      userId: 1,
      isUserMessage: false,
      message: "Would you like me to check available dates for this timeframe?",
      timestamp: new Date()
    },
    {
      id: 5,
      userId: 1,
      isUserMessage: true,
      message: "Yes, please check August availability and what's included in the Mars Explorer Pro package.",
      timestamp: new Date()
    }
  ];
  
  const displayMessages = chatMessages || defaultMessages;
  
  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (newMessage: string) => {
      return apiRequest('POST', '/api/chat-messages', {
        message: newMessage,
        isUserMessage: true,
        userId: 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat-messages'] });
      // Simulate AI response after a brief delay
      setTimeout(() => {
        simulateAIResponse();
      }, 1000);
    }
  });
  
  const simulateAIResponse = async () => {
    await apiRequest('POST', '/api/chat-messages', {
      message: getAIResponse(),
      isUserMessage: false,
      userId: 1
    });
    queryClient.invalidateQueries({ queryKey: ['/api/chat-messages'] });
  };
  
  // Simple AI response generator
  const getAIResponse = () => {
    const responses = [
      "I've checked our database, and there are several available launch dates to Mars in August 2050. The Mars Explorer Pro package includes 7-day Mars surface expedition, Martian rover driving experience, Olympus Mons base camp visit, and advanced life support training. Would you like me to reserve a spot for you?",
      "The Mars Explorer Pro package costs 185,000 AED and includes all necessary training and equipment. It's our most popular package for adventure-seeking travelers. Would you like more details about accommodation options on Mars?",
      "The weather on Mars in August 2050 is predicted to be relatively mild with daytime temperatures around -20°C. The package includes thermal suits specially designed for Martian exploration."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessage.mutate(message);
    setMessage('');
  };
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayMessages]);
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="glassmorphism rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-space-dark opacity-60 z-0"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <div className="inline-block mb-4 bg-glass-white rounded-full px-4 py-1 text-sm flex items-center gap-2">
                <i className="fas fa-robot text-neon-cyan"></i>
                <span>AI Travel Assistant</span>
              </div>
              
              <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Meet NOVA, Your Personal Space Travel Concierge</h2>
              <p className="text-gray-300 mb-6">NOVA is our advanced AI concierge, designed to assist with every aspect of your space journey. From itinerary planning to answering technical questions about space travel, NOVA provides personalized service 24/7.</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-glass-white rounded-xl px-4 py-3 flex items-center gap-2">
                  <i className="fas fa-route text-neon-magenta"></i>
                  <span>Itinerary Planning</span>
                </div>
                <div className="bg-glass-white rounded-xl px-4 py-3 flex items-center gap-2">
                  <i className="fas fa-hand-sparkles text-neon-cyan"></i>
                  <span>Personalized Recommendations</span>
                </div>
                <div className="bg-glass-white rounded-xl px-4 py-3 flex items-center gap-2">
                  <i className="fas fa-question-circle text-neon-blue"></i>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="glassmorphism neo-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta p-[2px]">
                      <div className="bg-space-dark rounded-full w-full h-full flex items-center justify-center">
                        <i className="fas fa-robot text-neon-cyan"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">NOVA</h4>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                        Online
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <i className="fas fa-expand-alt"></i>
                  </button>
                </div>
                
                <div className="h-72 p-4 overflow-y-auto" ref={chatContainerRef}>
                  {displayMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUserMessage ? 'justify-end' : ''} mb-4`}>
                      <div 
                        className={`p-3 max-w-[80%] rounded-xl ${
                          msg.isUserMessage 
                            ? 'bg-gradient-to-r from-neon-blue/20 to-neon-magenta/20 border border-neon-magenta/30' 
                            : 'bg-glass-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {sendMessage.isPending && (
                    <div className="flex mb-4">
                      <div className="bg-glass-white rounded-xl p-3 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask NOVA anything..." 
                      className="bg-glass-white rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <motion.button 
                      className="bg-neon-cyan w-10 h-10 rounded-lg flex items-center justify-center"
                      onClick={handleSendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={sendMessage.isPending}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIConcierge;
