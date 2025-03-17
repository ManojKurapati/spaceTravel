import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Booking } from '@shared/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { fadeIn, staggerContainer, slideIn } from '@/lib/animations';

const BookingDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch booking details
  const { data: booking, isLoading } = useQuery<Booking>({
    queryKey: ['/api/bookings', id],
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Placeholder booking details if API data isn't loaded yet
  const placeholderBooking = {
    id: parseInt(id || '1'),
    userId: 1,
    destinationId: 2,
    seatClassId: 1,
    departureDate: new Date('2050-08-20T14:15:00'),
    returnDate: new Date('2050-08-25T19:30:00'),
    packageId: 1,
    totalPrice: 140000,
    currency: 'AED',
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date('2050-05-10T09:23:00'),
    destination: {
      name: 'Lunar Hotels',
      location: 'Sea of Tranquility · Moon',
      description: 'Experience luxury and comfort in the magnificent Sea of Tranquility on the Moon. Gaze at Earth from your window and enjoy low-gravity activities in our state-of-the-art facilities.',
      distanceKm: 384400,
      travelDuration: '5 days'
    },
    seatClass: {
      name: 'Luxury Cabin',
      description: 'Premium experience with personal AI assistant, private sleeping quarters, and priority access to viewing deck.',
      amenities: ['Personal AI Assistant', 'Private Quarters', 'Gourmet Meals', 'Priority Viewing Access']
    },
    package: {
      name: 'Moonlight Honeymoon',
      description: 'Perfect for couples celebrating love',
      features: [
        'Private lunar suite with Earth view',
        'Champagne dinner in zero gravity',
        'Couples spacewalk experience',
        'Personalized NFT marriage certificate'
      ]
    },
    flightNumber: 'DSP-LH-2050-284',
    boardingGate: 'E4',
    launchPad: '3B',
    spaceshipName: 'Artemis IX',
    boardingTime: new Date('2050-08-20T12:45:00'),
    checkInTime: new Date('2050-08-20T10:45:00')
  };
  
  const displayBooking = booking || placeholderBooking;
  
  // Calculate days remaining for countdown
  const calculateDaysRemaining = (date: Date) => {
    const now = new Date();
    const departureDate = new Date(date);
    const diffTime = Math.abs(departureDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = calculateDaysRemaining(displayBooking.departureDate);
  
  const handleDownloadBoardingPass = () => {
    toast({
      title: "Boarding Pass",
      description: "Your boarding pass has been downloaded to your device.",
    });
  };
  
  const handleCancelBooking = () => {
    toast({
      title: "Cancellation Request",
      description: "Your cancellation request has been submitted for review.",
    });
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <Link href="/dashboard">
            <a className="text-neon-cyan hover:text-neon-magenta transition-colors flex items-center gap-2 mb-4">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Dashboard</span>
            </a>
          </Link>
          
          <div className="glassmorphism rounded-xl p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h1 className="font-space font-bold text-3xl mb-2">Booking Details</h1>
                <p className="text-gray-400">
                  Reference: {displayBooking.flightNumber} • Booked on {new Date(displayBooking.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                displayBooking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                displayBooking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                'bg-red-500/20 text-red-400'
              }`}>
                <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
                <span className="font-medium">
                  {displayBooking.status.charAt(0).toUpperCase() + displayBooking.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <div className="glassmorphism rounded-xl overflow-hidden relative mb-6">
                  <div className="h-48 lg:h-64 bg-space-blue relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-moon text-6xl text-neon-cyan opacity-30"></i>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row justify-between items-end">
                      <div>
                        <h2 className="font-space font-bold text-2xl md:text-3xl mb-1">{displayBooking.destination.name}</h2>
                        <p className="text-gray-300">{displayBooking.destination.location}</p>
                      </div>
                      <div className="mt-4 md:mt-0 bg-glass-white backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-2">
                        <i className="fas fa-rocket text-neon-magenta"></i>
                        <span>{displayBooking.seatClass.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6 bg-glass-white p-1 rounded-lg w-full md:w-auto inline-flex">
                    <TabsTrigger 
                      value="overview" 
                      className={`px-4 py-2 rounded-md ${activeTab === 'overview' ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' : 'text-gray-300'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="itinerary" 
                      className={`px-4 py-2 rounded-md ${activeTab === 'itinerary' ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' : 'text-gray-300'}`}
                      onClick={() => setActiveTab('itinerary')}
                    >
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents" 
                      className={`px-4 py-2 rounded-md ${activeTab === 'documents' ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' : 'text-gray-300'}`}
                      onClick={() => setActiveTab('documents')}
                    >
                      Documents
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <motion.div 
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div 
                        variants={slideIn('up', 0.1)}
                        className="glassmorphism rounded-xl p-5"
                      >
                        <h3 className="font-space font-medium text-lg mb-4">Flight Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Departure</p>
                            <p className="font-space font-medium text-white">Dubai Spaceport</p>
                            <p className="text-neon-cyan">
                              {new Date(displayBooking.departureDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                              {' at '}
                              {new Date(displayBooking.departureDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Arrival</p>
                            <p className="font-space font-medium text-white">{displayBooking.destination.name}</p>
                            <p className="text-neon-cyan">
                              {new Date(displayBooking.returnDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                              {' at '}
                              {new Date(displayBooking.returnDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <Separator className="my-4 bg-white/10" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Spaceship</p>
                            <p className="font-medium">{displayBooking.spaceshipName}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Flight Duration</p>
                            <p className="font-medium">{displayBooking.destination.travelDuration}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Distance</p>
                            <p className="font-medium">{displayBooking.destination.distanceKm.toLocaleString()} km</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={slideIn('up', 0.2)}
                        className="glassmorphism rounded-xl p-5 mt-6"
                      >
                        <h3 className="font-space font-medium text-lg mb-4">Boarding Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-gray-400 text-sm">Check-in Time</p>
                            <p className="font-medium">
                              {new Date(displayBooking.checkInTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Boarding Time</p>
                            <p className="font-medium">
                              {new Date(displayBooking.boardingTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Boarding Gate</p>
                            <p className="font-medium">{displayBooking.boardingGate}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Launch Pad</p>
                            <p className="font-medium">{displayBooking.launchPad}</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {displayBooking.package && (
                        <motion.div 
                          variants={slideIn('up', 0.3)}
                          className="glassmorphism rounded-xl p-5 mt-6"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-space font-medium text-lg mb-1">{displayBooking.package.name}</h3>
                              <p className="text-gray-400 text-sm mb-4">{displayBooking.package.description}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-glass-white flex items-center justify-center">
                              <i className="fas fa-heart text-neon-magenta"></i>
                            </div>
                          </div>
                          
                          <ul className="space-y-2">
                            {displayBooking.package.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <i className="fas fa-check text-neon-cyan mt-1 mr-3"></i>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary">
                    <div className="glassmorphism rounded-xl p-5">
                      <h3 className="font-space font-medium text-lg mb-4">Your Journey Itinerary</h3>
                      
                      <div className="relative pl-6 border-l border-neon-cyan/30">
                        <div className="mb-8 relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-neon-cyan flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-space-dark"></div>
                          </div>
                          <div className="mb-2">
                            <span className="text-neon-cyan">Day 1</span>
                            <h4 className="font-space font-medium">Departure & Transit</h4>
                          </div>
                          <p className="text-gray-300 mb-2">
                            Check-in at Dubai Spaceport Terminal 3, complete pre-flight training, and board {displayBooking.spaceshipName}.
                          </p>
                          <p className="text-gray-400 text-sm">
                            Departure at {new Date(displayBooking.departureDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        
                        <div className="mb-8 relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-neon-cyan/60 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-space-dark"></div>
                          </div>
                          <div className="mb-2">
                            <span className="text-neon-cyan">Day 2-4</span>
                            <h4 className="font-space font-medium">Lunar Experience</h4>
                          </div>
                          <p className="text-gray-300 mb-2">
                            Arrive at {displayBooking.destination.name}. Enjoy your {displayBooking.package?.name || "space experience"} with stunning Earth views.
                          </p>
                          <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Low-gravity orientation</li>
                            <li>• Lunar surface exploration</li>
                            <li>• Champagne dinner in zero gravity</li>
                            <li>• Couples spacewalk experience</li>
                          </ul>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-neon-magenta flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-space-dark"></div>
                          </div>
                          <div className="mb-2">
                            <span className="text-neon-magenta">Day 5</span>
                            <h4 className="font-space font-medium">Return Journey</h4>
                          </div>
                          <p className="text-gray-300 mb-2">
                            Departure from {displayBooking.destination.name} and return to Earth.
                          </p>
                          <p className="text-gray-400 text-sm">
                            Arrival at {new Date(displayBooking.returnDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents">
                    <div className="glassmorphism rounded-xl p-5">
                      <h3 className="font-space font-medium text-lg mb-4">Travel Documents</h3>
                      
                      <div className="neo-border glassmorphism rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-space font-medium text-lg">Boarding Pass</h4>
                            <p className="text-gray-400 text-sm">Available for download 48 hours before departure</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            daysRemaining <= 2 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {daysRemaining <= 2 ? 'Available' : 'Coming Soon'}
                          </div>
                        </div>
                        
                        <button 
                          className={`w-full bg-gradient-to-r from-neon-blue to-neon-magenta px-4 py-3 rounded-lg text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 flex items-center justify-center gap-2 ${
                            daysRemaining > 2 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={daysRemaining > 2}
                          onClick={handleDownloadBoardingPass}
                        >
                          <i className="fas fa-download"></i>
                          Download Boarding Pass
                        </button>
                      </div>
                      
                      <div className="neo-border glassmorphism rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-space font-medium text-lg">Safety Briefing</h4>
                            <p className="text-gray-400 text-sm">Required pre-flight training materials</p>
                          </div>
                          <div className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            Available
                          </div>
                        </div>
                        
                        <button 
                          className="w-full bg-glass-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-play-circle"></i>
                          Watch Safety Briefing Video
                        </button>
                      </div>
                      
                      <div className="neo-border glassmorphism rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-space font-medium text-lg">Medical Clearance</h4>
                            <p className="text-gray-400 text-sm">Required medical certification for space travel</p>
                          </div>
                          <div className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                            Action Required
                          </div>
                        </div>
                        
                        <button 
                          className="w-full neo-border px-4 py-3 rounded-lg text-neon-cyan font-medium hover:bg-glass-white transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-hospital"></i>
                          Schedule Medical Assessment
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glassmorphism neo-border rounded-xl p-5 mb-6">
                  <h3 className="font-space font-medium text-lg mb-4">Trip Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Fare</span>
                      <span>{new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(displayBooking.totalPrice * 0.7)} {displayBooking.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience Package</span>
                      <span>{new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(displayBooking.totalPrice * 0.25)} {displayBooking.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Space Insurance</span>
                      <span>{new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(displayBooking.totalPrice * 0.05)} {displayBooking.currency}</span>
                    </div>
                    
                    <Separator className="my-2 bg-white/10" />
                    
                    <div className="flex justify-between font-space font-medium">
                      <span>Total</span>
                      <span className="text-neon-cyan">
                        {new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(displayBooking.totalPrice)} {displayBooking.currency}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Payment Status</span>
                      <span className={displayBooking.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}>
                        {displayBooking.paymentStatus === 'paid' ? 'Paid in Full' : 'Payment Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="glassmorphism rounded-xl p-5 mb-6">
                  <h3 className="font-space font-medium text-lg mb-4">Countdown to Launch</h3>
                  
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Preparing for liftoff</span>
                      <span className="text-neon-cyan font-medium">{daysRemaining} days</span>
                    </div>
                    <Progress value={100 - (daysRemaining / 90) * 100} className="h-2 bg-glass-white" indicatorClassName="bg-gradient-to-r from-neon-cyan to-neon-magenta" />
                  </div>
                  
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${daysRemaining <= 30 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/30 text-gray-500'}`}>
                        {daysRemaining <= 30 ? <i className="fas fa-check text-xs"></i> : ''}
                      </div>
                      <div>
                        <p className={`font-medium ${daysRemaining <= 30 ? 'text-white' : 'text-gray-400'}`}>Registration Complete</p>
                        <p className="text-gray-400 text-sm">Booking confirmed</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${daysRemaining <= 14 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/30 text-gray-500'}`}>
                        {daysRemaining <= 14 ? <i className="fas fa-check text-xs"></i> : ''}
                      </div>
                      <div>
                        <p className={`font-medium ${daysRemaining <= 14 ? 'text-white' : 'text-gray-400'}`}>Pre-Flight Training</p>
                        <p className="text-gray-400 text-sm">14 days before departure</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${daysRemaining <= 2 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/30 text-gray-500'}`}>
                        {daysRemaining <= 2 ? <i className="fas fa-check text-xs"></i> : ''}
                      </div>
                      <div>
                        <p className={`font-medium ${daysRemaining <= 2 ? 'text-white' : 'text-gray-400'}`}>Boarding Pass Available</p>
                        <p className="text-gray-400 text-sm">48 hours before departure</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 bg-gray-500/30 text-gray-500">
                        {daysRemaining === 0 ? <i className="fas fa-check text-xs"></i> : ''}
                      </div>
                      <div>
                        <p className="font-medium text-gray-400">Launch Day</p>
                        <p className="text-gray-400 text-sm">Dubai Spaceport Terminal 3</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {displayBooking.status !== 'cancelled' && (
                  <button 
                    className="w-full neo-border px-4 py-3 rounded-xl text-red-400 font-medium hover:bg-glass-white transition-all text-sm flex items-center justify-center gap-2"
                    onClick={handleCancelBooking}
                  >
                    <i className="fas fa-times-circle"></i>
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookingDetails;
