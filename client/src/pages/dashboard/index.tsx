import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Tab } from '@headlessui/react';
import { Link } from 'wouter';

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Fetch user bookings
  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['/api/bookings/user'],
    staleTime: Infinity
  });
  
  const tabItems = ['Upcoming Trips', 'Past Journeys', 'Saved Itineraries'];
  
  return (
    <main className="flex-grow py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <motion.h1 
            className="font-space text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
              Traveler Dashboard
            </span>
          </motion.h1>
          <motion.p 
            className="text-white/70 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Manage your space journeys, view upcoming trips, and access your personalized travel information.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="glass p-6 rounded-xl h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-14 h-14 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center">
                <i className="fas fa-user-astronaut text-space-blue text-xl"></i>
              </div>
              <div>
                <h3 className="font-space font-bold text-lg">Alex Stanton</h3>
                <p className="text-white/60 text-sm">Space Traveler Level 2</p>
              </div>
            </div>
            
            <nav className="space-y-2 mb-8">
              <a href="#" className="flex items-center space-x-2 p-3 glass rounded-lg text-space-blue">
                <i className="fas fa-rocket w-5 text-center"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded-lg text-white/70 transition-colors">
                <i className="fas fa-ticket-alt w-5 text-center"></i>
                <span>My Bookings</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded-lg text-white/70 transition-colors">
                <i className="fas fa-id-card w-5 text-center"></i>
                <span>Profile</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded-lg text-white/70 transition-colors">
                <i className="fas fa-clipboard-list w-5 text-center"></i>
                <span>Travel History</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded-lg text-white/70 transition-colors">
                <i className="fas fa-medal w-5 text-center"></i>
                <span>Rewards</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded-lg text-white/70 transition-colors">
                <i className="fas fa-cog w-5 text-center"></i>
                <span>Settings</span>
              </a>
            </nav>
            
            <div className="glass p-4 rounded-lg bg-space-purple/10 border border-space-purple/30">
              <h4 className="font-space font-bold text-sm mb-2">Next Launch</h4>
              <div className="text-xl font-mono mb-2">15:04:23:11</div>
              <div className="text-sm text-white/70 mb-3">ISS Express on June 15, 2050</div>
              <button className="w-full py-2 bg-space-purple/20 text-space-purple rounded-lg text-sm">
                Launch Details
              </button>
            </div>
          </motion.div>
          
          {/* Main content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List className="flex space-x-2 mb-6">
                {tabItems.map((item, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      `glass px-4 py-2 rounded-full transition-colors ${
                        selected
                          ? 'text-space-blue border-space-blue/50'
                          : 'text-white/70 border-white/20 hover:text-white hover:border-white/40'
                      }`
                    }
                  >
                    {item}
                  </Tab>
                ))}
              </Tab.List>
              
              <Tab.Panels>
                {/* Upcoming Trips Panel */}
                <Tab.Panel>
                  {isLoadingBookings ? (
                    <div className="space-y-4">
                      {Array(2).fill(0).map((_, i) => (
                        <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-1/2">
                                <div className="h-5 bg-white/10 rounded mb-2"></div>
                                <div className="h-7 bg-white/10 rounded mb-2"></div>
                                <div className="h-4 bg-white/10 rounded w-1/2"></div>
                              </div>
                              <div className="w-24 h-10 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              {Array(3).fill(0).map((_, j) => (
                                <div key={j} className="h-20 bg-white/10 rounded"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Trip 1 */}
                      <div className="glass rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <div className="text-space-blue font-medium text-sm">DSP-2050-06-15-A001</div>
                              <h3 className="font-space text-2xl font-bold mb-1">ISS Express</h3>
                              <div className="text-white/60">June 15, 2050 • 12:30 PM</div>
                            </div>
                            <div className="glass p-2 rounded-full px-4 text-space-green border border-space-green/30">
                              Confirmed
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Departure</div>
                              <div className="font-medium">Dubai Spaceport</div>
                              <div className="text-xs text-white/50">Terminal A, Gate 12</div>
                            </div>
                            
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Destination</div>
                              <div className="font-medium">International Space Station</div>
                              <div className="text-xs text-white/50">North Docking Port</div>
                            </div>
                            
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Class</div>
                              <div className="font-medium">Luxury Cabin</div>
                              <div className="text-xs text-white/50">Suite 3, Zero-G Section</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-space-blue/20 border border-space-blue/30 text-space-blue rounded-full text-sm hover:bg-space-blue/30 transition-colors">
                              <i className="fas fa-ticket-alt mr-2"></i>View Boarding Pass
                            </button>
                            <button className="px-4 py-2 bg-space-purple/20 border border-space-purple/30 text-space-purple rounded-full text-sm hover:bg-space-purple/30 transition-colors">
                              <i className="fas fa-concierge-bell mr-2"></i>Special Requests
                            </button>
                            <button className="px-4 py-2 bg-white/5 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors">
                              <i className="fas fa-exchange-alt mr-2"></i>Change Flight
                            </button>
                          </div>
                        </div>
                        
                        <div className="border-t border-white/10 p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-white/60 text-sm">
                              <i className="fas fa-clock mr-2"></i>Launch in 15 days, 7 hours
                            </div>
                            <Link href="/travel-prep">
                              <a className="text-space-blue hover:underline text-sm">
                                Travel Preparation <i className="fas fa-chevron-right ml-1 text-xs"></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Trip 2 */}
                      <div className="glass rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <div className="text-space-purple font-medium text-sm">DSP-2050-07-20-B012</div>
                              <h3 className="font-space text-2xl font-bold mb-1">Lunar Voyager</h3>
                              <div className="text-white/60">July 20, 2050 • 09:45 AM</div>
                            </div>
                            <div className="glass p-2 rounded-full px-4 text-space-yellow border border-space-yellow/30">
                              Pending
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Departure</div>
                              <div className="font-medium">Dubai Spaceport</div>
                              <div className="text-xs text-white/50">Terminal B, Gate 5</div>
                            </div>
                            
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Destination</div>
                              <div className="font-medium">Lunar Hotels</div>
                              <div className="text-xs text-white/50">Mare Tranquillitatis</div>
                            </div>
                            
                            <div className="glass p-4 rounded-lg">
                              <div className="text-white/60 text-sm mb-1">Class</div>
                              <div className="font-medium">VIP Zero-Gravity</div>
                              <div className="text-xs text-white/50">Moonlight Suite</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-space-blue/20 border border-space-blue/30 text-space-blue rounded-full text-sm hover:bg-space-blue/30 transition-colors">
                              <i className="fas fa-credit-card mr-2"></i>Complete Payment
                            </button>
                            <button className="px-4 py-2 bg-space-purple/20 border border-space-purple/30 text-space-purple rounded-full text-sm hover:bg-space-purple/30 transition-colors">
                              <i className="fas fa-concierge-bell mr-2"></i>Special Requests
                            </button>
                            <button className="px-4 py-2 bg-white/5 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors">
                              <i className="fas fa-calendar-alt mr-2"></i>View Itinerary
                            </button>
                          </div>
                        </div>
                        
                        <div className="border-t border-white/10 p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-white/60 text-sm">
                              <i className="fas fa-clock mr-2"></i>Payment due in 3 days
                            </div>
                            <Link href="/travel-prep">
                              <a className="text-space-blue hover:underline text-sm">
                                Travel Preparation <i className="fas fa-chevron-right ml-1 text-xs"></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab.Panel>
                
                {/* Past Journeys Panel */}
                <Tab.Panel>
                  <div className="glass rounded-xl overflow-hidden mb-8">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="text-space-blue font-medium text-sm">DSP-2049-11-05-A042</div>
                          <h3 className="font-space text-2xl font-bold mb-1">Orbit Resort Weekend</h3>
                          <div className="text-white/60">November 5, 2049 • Completed</div>
                        </div>
                        <div className="w-20 h-20">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=DSP-NFT-2049-11-05" 
                            alt="NFT QR Code" 
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Journey</div>
                          <div className="font-medium">Dubai → Orbit Resort</div>
                          <div className="text-xs text-white/50">3 days in zero gravity</div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Experiences</div>
                          <div className="font-medium">Aurora Viewing, Space Walk</div>
                          <div className="text-xs text-white/50">Premium package included</div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Status</div>
                          <div className="font-medium text-space-green">Journey Complete</div>
                          <div className="text-xs text-white/50">NFT Souvenir Minted</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-space-blue/20 border border-space-blue/30 text-space-blue rounded-full text-sm hover:bg-space-blue/30 transition-colors">
                          <i className="fas fa-images mr-2"></i>View Gallery
                        </button>
                        <button className="px-4 py-2 bg-space-purple/20 border border-space-purple/30 text-space-purple rounded-full text-sm hover:bg-space-purple/30 transition-colors">
                          <i className="fas fa-cube mr-2"></i>View NFT Souvenir
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors">
                          <i className="fas fa-certificate mr-2"></i>Download Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass rounded-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="text-space-green font-medium text-sm">DSP-2049-08-10-C015</div>
                          <h3 className="font-space text-2xl font-bold mb-1">ISS Science Expedition</h3>
                          <div className="text-white/60">August 10, 2049 • Completed</div>
                        </div>
                        <div className="w-20 h-20">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=DSP-NFT-2049-08-10" 
                            alt="NFT QR Code" 
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Journey</div>
                          <div className="font-medium">Dubai → ISS</div>
                          <div className="text-xs text-white/50">5 days at the station</div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Experiences</div>
                          <div className="font-medium">Science Lab, Earth Observation</div>
                          <div className="text-xs text-white/50">Researcher package</div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg">
                          <div className="text-white/60 text-sm mb-1">Status</div>
                          <div className="font-medium text-space-green">Journey Complete</div>
                          <div className="text-xs text-white/50">NFT Souvenir Minted</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-space-blue/20 border border-space-blue/30 text-space-blue rounded-full text-sm hover:bg-space-blue/30 transition-colors">
                          <i className="fas fa-images mr-2"></i>View Gallery
                        </button>
                        <button className="px-4 py-2 bg-space-purple/20 border border-space-purple/30 text-space-purple rounded-full text-sm hover:bg-space-purple/30 transition-colors">
                          <i className="fas fa-cube mr-2"></i>View NFT Souvenir
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors">
                          <i className="fas fa-certificate mr-2"></i>Download Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                
                {/* Saved Itineraries Panel */}
                <Tab.Panel>
                  <div className="glass rounded-xl p-8 text-center">
                    <div className="w-20 h-20 bg-space-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-route text-space-blue text-3xl"></i>
                    </div>
                    <h3 className="font-space text-2xl font-bold mb-2">No Saved Itineraries Yet</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Start planning your next space adventure and save your favorite itineraries here for easy access.
                    </p>
                    <button className="px-6 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-full font-medium hover:opacity-90 transition-opacity">
                      Explore Destinations
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
