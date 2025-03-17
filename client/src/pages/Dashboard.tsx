import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Booking } from '@shared/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Fetch user bookings
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });
  
  const placeholderBookings = [
    {
      id: 1,
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
        location: 'Sea of Tranquility · Moon'
      },
      seatClass: {
        name: 'Luxury Cabin'
      }
    },
    {
      id: 2,
      userId: 1,
      destinationId: 3,
      seatClassId: 3,
      departureDate: new Date('2050-10-15T07:30:00'),
      returnDate: new Date('2050-10-29T21:45:00'),
      packageId: 2,
      totalPrice: 305000,
      currency: 'AED',
      status: 'pending',
      paymentStatus: 'awaiting',
      createdAt: new Date('2050-05-12T16:45:00'),
      destination: {
        name: 'Mars Colony Alpha',
        location: 'Arcadia Planitia · Mars'
      },
      seatClass: {
        name: 'VIP Zero-Gravity Experience'
      }
    }
  ];
  
  const displayBookings = bookings || placeholderBookings;
  
  // Filter bookings based on active tab
  const upcomingBookings = displayBookings.filter(b => 
    new Date(b.departureDate) > new Date() && b.status !== 'cancelled'
  );
  
  const pastBookings = displayBookings.filter(b => 
    new Date(b.departureDate) < new Date() || b.status === 'cancelled'
  );
  
  // Calculate days remaining for countdown
  const calculateDaysRemaining = (date: Date) => {
    const now = new Date();
    const departureDate = new Date(date);
    const diffTime = Math.abs(departureDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="glassmorphism rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-space font-bold text-3xl mb-2">Your Space Journey Dashboard</h1>
              <p className="text-gray-400">Manage your bookings and prepare for your cosmic adventures</p>
            </div>
            <Link href="/#book">
              <motion.a 
                className="mt-4 md:mt-0 bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-3 rounded-xl text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-rocket"></i>
                Book New Trip
              </motion.a>
            </Link>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6 bg-glass-white p-1 rounded-lg w-full md:w-auto flex">
              <TabsTrigger 
                value="upcoming" 
                className={`flex-1 md:flex-none px-4 py-2 rounded-md ${activeTab === 'upcoming' ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Trips ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className={`flex-1 md:flex-none px-4 py-2 rounded-md ${activeTab === 'past' ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('past')}
              >
                Past Trips ({pastBookings.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 text-5xl text-gray-500">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3 className="font-space font-medium text-xl mb-2">No Upcoming Trips</h3>
                  <p className="text-gray-400 mb-6">You haven't booked any space journeys yet. Ready to explore the cosmos?</p>
                  <Link href="/#book">
                    <a className="bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-3 rounded-xl text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 inline-flex items-center gap-2">
                      Book Your First Trip
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingBookings.map(booking => (
                    <motion.div 
                      key={booking.id}
                      className="glassmorphism neo-border rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-space font-medium text-xl">{booking.destination.name}</h3>
                            <p className="text-gray-400 text-sm">{booking.destination.location}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Departure Date</p>
                            <p className="font-space font-medium text-neon-cyan">
                              {new Date(booking.departureDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {new Date(booking.departureDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-gray-400 text-sm mb-1">Class</p>
                            <p className="font-space font-medium">{booking.seatClass.name}</p>
                            <p className={`text-sm ${booking.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {booking.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <p className="text-gray-400 text-sm">Countdown to Launch</p>
                            <p className="text-gray-400 text-sm">{calculateDaysRemaining(booking.departureDate)} days</p>
                          </div>
                          <Progress value={100 - (calculateDaysRemaining(booking.departureDate) / 90) * 100} className="h-2 bg-glass-white" indicatorClassName="bg-gradient-to-r from-neon-cyan to-neon-magenta" />
                        </div>
                        
                        <div className="flex justify-between">
                          <Link href={`/booking/${booking.id}`}>
                            <a className="neo-border px-4 py-2 rounded-lg text-neon-cyan text-sm hover:bg-glass-white transition-all">
                              View Details
                            </a>
                          </Link>
                          
                          {booking.status === 'pending' && (
                            <button className="bg-gradient-to-r from-neon-blue to-neon-magenta px-4 py-2 rounded-lg text-white text-sm hover:shadow-lg hover:shadow-neon-magenta/20 transition-all">
                              Complete Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 text-5xl text-gray-500">
                    <i className="fas fa-history"></i>
                  </div>
                  <h3 className="font-space font-medium text-xl mb-2">No Past Trips</h3>
                  <p className="text-gray-400">Your travel history will appear here after your journeys.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastBookings.map(booking => (
                    <motion.div 
                      key={booking.id}
                      className="glassmorphism rounded-xl overflow-hidden opacity-80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-space font-medium text-xl">{booking.destination.name}</h3>
                            <p className="text-gray-400 text-sm">{booking.destination.location}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-glass-white">
                            <i className="fas fa-check-circle text-neon-cyan"></i>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Travel Date</p>
                            <p className="font-space font-medium">
                              {new Date(booking.departureDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-gray-400 text-sm mb-1">Class</p>
                            <p className="font-space font-medium">{booking.seatClass.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <Link href={`/booking/${booking.id}`}>
                            <a className="neo-border px-4 py-2 rounded-lg text-neon-cyan text-sm hover:bg-glass-white transition-all">
                              View Details
                            </a>
                          </Link>
                          
                          <button className="bg-glass-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-all">
                            Download NFT Souvenir
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="glassmorphism rounded-xl p-8">
          <h2 className="font-space font-bold text-2xl mb-4">Travel Tips & Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism rounded-xl p-5">
              <div className="mb-3 text-neon-cyan">
                <i className="fas fa-heartbeat text-xl"></i>
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Health Preparations</h3>
              <p className="text-gray-400 text-sm">Complete your space health check at least 14 days before departure. Remember to start your anti-gravity conditioning program.</p>
            </div>
            
            <div className="glassmorphism rounded-xl p-5">
              <div className="mb-3 text-neon-magenta">
                <i className="fas fa-suitcase text-xl"></i>
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Packing Essentials</h3>
              <p className="text-gray-400 text-sm">Pack light and smart. All essential space gear will be provided, but don't forget your personal comfort items and digital ID.</p>
            </div>
            
            <div className="glassmorphism rounded-xl p-5">
              <div className="mb-3 text-neon-blue">
                <i className="fas fa-meteor text-xl"></i>
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Experience Highlights</h3>
              <p className="text-gray-400 text-sm">Don't miss the Earth-rise viewing on lunar trips and the Olympus Mons sunrise if visiting Mars. Book your extra activities early.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Dashboard;
