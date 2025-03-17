import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import BookingForm from '@/components/ui/booking/BookingForm';
import DestinationCard from '@/components/ui/booking/DestinationCard';
import ExperiencePackage from '@/components/ui/booking/ExperiencePackage';
import BookingProcess from '@/components/ui/booking/BookingProcess';
import LaunchCard from '@/components/ui/booking/LaunchCard';
import AIChatbot from '@/components/ui/ai-assistant/AIChatbot';
import { destinations, experiencePackages, upcomingLaunches } from '@/lib/constants';
import { useState } from 'react';

const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Fetch destinations
  const { data: destinationsData, isLoading: isLoadingDestinations } = useQuery({
    queryKey: ['/api/destinations'],
    staleTime: Infinity
  });
  
  // Fetch experience packages
  const { data: experiencesData, isLoading: isLoadingExperiences } = useQuery({
    queryKey: ['/api/experiences'],
    staleTime: Infinity
  });
  
  // Fetch upcoming launches
  const { data: launchesData, isLoading: isLoadingLaunches } = useQuery({
    queryKey: ['/api/launches'],
    staleTime: Infinity
  });
  
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-space text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue via-space-purple to-space-pink">
                The Gateway to Interplanetary Travel
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Book your journey beyond Earth. Experience the future of space tourism from Dubai's premier commercial spaceport.
            </motion.p>
            
            <BookingForm />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-space-blue/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-space-purple/10 blur-3xl"></div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <motion.h2 
                className="font-space text-3xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Popular Destinations
              </motion.h2>
              <motion.p 
                className="text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Explore our most sought-after space journeys
              </motion.p>
            </div>
            <motion.a 
              href="/destinations" 
              className="hidden md:flex items-center text-space-blue hover:text-space-blue/80 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              View all destinations
              <i className="fas fa-chevron-right ml-2 text-xs"></i>
            </motion.a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingDestinations ? (
              // Skeleton loading
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-white/10"></div>
                  <div className="p-5">
                    <div className="h-6 bg-white/10 rounded mb-2"></div>
                    <div className="h-4 bg-white/10 rounded mb-3 w-3/4"></div>
                    <div className="h-16 bg-white/10 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-1/2">
                        <div className="h-3 bg-white/10 rounded mb-1"></div>
                        <div className="h-5 bg-white/10 rounded"></div>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Real data or fallback to constants
              (destinationsData || destinations).map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
              ))
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href="/destinations" className="inline-flex items-center text-space-blue">
              View all destinations
              <i className="fas fa-chevron-right ml-2 text-xs"></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* Experience Packages Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="font-space text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Premium Experience Packages
            </motion.h2>
            <motion.p 
              className="text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Curated experiences designed to make your space journey unforgettable
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingExperiences ? (
              // Skeleton loading
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                  <div className="h-64 bg-white/10"></div>
                  <div className="p-6">
                    <div className="w-1/3 h-6 bg-white/10 rounded mb-3"></div>
                    <div className="h-7 bg-white/10 rounded mb-2"></div>
                    <div className="h-20 bg-white/10 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-6 bg-white/10 rounded"></div>
                      <div className="w-1/4 h-10 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Real data or fallback to constants
              (experiencesData || experiencePackages).map((experience, index) => (
                <ExperiencePackage key={experience.id} experience={experience} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Booking Process Section */}
      <BookingProcess />
      
      {/* Upcoming Launches Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <motion.h2 
                className="font-space text-3xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Upcoming Launches
              </motion.h2>
              <motion.p 
                className="text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Reserve your seat on the next departures from Dubai Spaceport
              </motion.p>
            </div>
            <div className="hidden md:flex space-x-2">
              <button className="p-2 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-colors">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="p-2 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-colors">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto hide-scrollbar pb-4">
            <div className="grid grid-cols-1 md:grid-flow-col auto-cols-max gap-6 min-w-max">
              {isLoadingLaunches ? (
                // Skeleton loading
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="glass rounded-xl overflow-hidden w-80 animate-pulse">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-1/2">
                          <div className="h-5 bg-white/10 rounded mb-1"></div>
                          <div className="h-6 bg-white/10 rounded"></div>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {Array(4).fill(0).map((_, j) => (
                          <div key={j} className="flex justify-between">
                            <div className="w-1/3 h-4 bg-white/10 rounded"></div>
                            <div className="w-1/3 h-4 bg-white/10 rounded"></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-5">
                        <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                        <div>
                          <div className="w-16 h-3 bg-white/10 rounded mb-1"></div>
                          <div className="w-24 h-5 bg-white/10 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="w-20 h-3 bg-white/10 rounded mb-1"></div>
                          <div className="w-24 h-6 bg-white/10 rounded"></div>
                        </div>
                        <div className="w-20 h-8 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Real data or fallback to constants
                (launchesData || upcomingLaunches).map((launch, index) => (
                  <LaunchCard key={launch.id} launch={launch} index={index} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Assistant Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="glass rounded-xl overflow-hidden p-8 md:p-12 relative neon-border">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <motion.h2 
                  className="font-space text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
                    AI Space Travel Concierge
                  </span>
                </motion.h2>
                <motion.p 
                  className="text-white/70 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Our advanced AI assistant helps you plan the perfect space journey, providing real-time recommendations, answering questions, and optimizing your itinerary.
                </motion.p>
                
                {/* Chat preview */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center shrink-0">
                      <i className="fas fa-robot text-space-blue"></i>
                    </div>
                    <div className="glass rounded-lg p-3 max-w-md">
                      <p className="text-sm">Welcome to Dubai Spaceport's AI assistant. How can I help plan your space journey today?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="glass rounded-lg p-3 max-w-md bg-white/5">
                      <p className="text-sm">I'm interested in visiting Mars but I'm concerned about the journey length. What options do I have?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-space-purple/20 border border-space-purple/50 flex items-center justify-center shrink-0">
                      <i className="fas fa-user text-space-purple"></i>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center shrink-0">
                      <i className="fas fa-robot text-space-blue"></i>
                    </div>
                    <div className="glass rounded-lg p-3 max-w-md">
                      <p className="text-sm">
                        Great question! The journey to Mars takes approximately 3-4 months each way using our current spacecraft technology. We offer several options:
                      </p>
                      <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-white/70">
                        <li>Standard Journey: 4 months travel with 2 weeks on Mars</li>
                        <li>Extended Stay: 4 months travel with 3-6 months on Mars</li>
                        <li>Cryosleep Option: Travel while in stasis for minimal perceived journey time</li>
                      </ul>
                      <p className="text-sm mt-2">
                        Would you like details on any specific option, or information about our Mars accommodations?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex">
                  <input 
                    type="text" 
                    placeholder="Ask about destinations, experiences, or travel requirements..." 
                    className="w-full glass p-3 rounded-l-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
                    onClick={() => setShowChatbot(true)}
                    readOnly
                  />
                  <button 
                    className="px-4 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-r-lg"
                    onClick={() => setShowChatbot(true)}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="glass p-6 rounded-xl h-full">
                  <h3 className="font-space text-xl font-bold mb-4">Popular Questions</h3>
                  <div className="space-y-3">
                    <button 
                      className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                      onClick={() => setShowChatbot(true)}
                    >
                      <i className="fas fa-question-circle text-space-blue mr-2"></i>
                      What medical requirements exist for space travel?
                      <i className="fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity text-space-blue"></i>
                    </button>
                    <button 
                      className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                      onClick={() => setShowChatbot(true)}
                    >
                      <i className="fas fa-question-circle text-space-purple mr-2"></i>
                      How is the zero-gravity experience different between destinations?
                      <i className="fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity text-space-purple"></i>
                    </button>
                    <button 
                      className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                      onClick={() => setShowChatbot(true)}
                    >
                      <i className="fas fa-question-circle text-space-pink mr-2"></i>
                      What's included in the luxury cabin experience?
                      <i className="fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity text-space-pink"></i>
                    </button>
                    <button 
                      className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                      onClick={() => setShowChatbot(true)}
                    >
                      <i className="fas fa-question-circle text-space-green mr-2"></i>
                      Can I customize my space journey itinerary?
                      <i className="fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity text-space-green"></i>
                    </button>
                    <button 
                      className="w-full text-left glass p-3 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                      onClick={() => setShowChatbot(true)}
                    >
                      <i className="fas fa-question-circle text-space-yellow mr-2"></i>
                      What payment methods do you accept for space travel bookings?
                      <i className="fas fa-chevron-right float-right opacity-0 group-hover:opacity-100 transition-opacity text-space-yellow"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {showChatbot && <AIChatbot onClose={() => setShowChatbot(false)} />}
    </main>
  );
};

export default HomePage;
