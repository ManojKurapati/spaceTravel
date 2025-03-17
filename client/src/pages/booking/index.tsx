import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { destinations, cabinClasses } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const BookingPage = () => {
  const { id } = useParams();
  const [location] = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Parse query parameters
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const queryDate = searchParams.get('date') || '2050-06-15';
  const queryPassengers = searchParams.get('passengers') || '1';
  const queryClass = searchParams.get('class') || 'luxury';
  
  // State
  const [date, setDate] = useState(queryDate);
  const [passengers, setPassengers] = useState(parseInt(queryPassengers));
  const [cabinClass, setCabinClass] = useState(queryClass);
  const [addons, setAddons] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Fetch destination details
  const { data: destination, isLoading: isLoadingDestination } = useQuery({
    queryKey: [`/api/destinations/${id}`],
    staleTime: Infinity
  });
  
  // Fetch available addons
  const { data: availableAddons, isLoading: isLoadingAddons } = useQuery({
    queryKey: [`/api/destinations/${id}/addons`],
    staleTime: Infinity
  });
  
  // Use fallback data if API loading
  const currentDestination = destination || destinations.find(d => d.id === id);
  
  // Calculate total price
  useEffect(() => {
    if (!currentDestination) return;
    
    let basePrice = parseInt(currentDestination.price.replace(/,/g, ''));
    const selectedCabin = cabinClasses.find(c => c.id === cabinClass);
    
    // Apply cabin class multiplier
    if (selectedCabin) {
      basePrice = basePrice * selectedCabin.priceMultiplier;
    }
    
    // Multiply by passengers
    basePrice = basePrice * passengers;
    
    // Add addon prices
    let addonTotal = 0;
    if (availableAddons) {
      addons.forEach(addonId => {
        const addon = availableAddons.find(a => a.id === addonId);
        if (addon) {
          addonTotal += addon.price * passengers;
        }
      });
    }
    
    setTotalPrice(basePrice + addonTotal);
  }, [currentDestination, cabinClass, passengers, addons, availableAddons]);
  
  const handleAddonToggle = (addonId: string) => {
    setAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };
  
  const handleProceedToCheckout = () => {
    if (!currentDestination) {
      toast({
        title: "Unable to proceed",
        description: "Destination details are unavailable. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // Prepare booking data for checkout
    const bookingData = {
      destinationId: id,
      date,
      passengers,
      cabinClass,
      addons,
      totalPrice
    };
    
    // Store booking data in session storage for checkout page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to checkout
    navigate('/checkout');
  };
  
  if (isLoadingDestination && !currentDestination) {
    return (
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="glass rounded-xl p-10 text-center animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }
  
  if (!currentDestination) {
    return (
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="glass rounded-xl p-10 text-center">
            <h2 className="font-space text-2xl font-bold mb-4">Destination Not Found</h2>
            <p className="text-white/70 mb-6">The space destination you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/destinations')}
              className="px-6 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Browse Destinations
            </button>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-grow py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="font-space text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
            Book Your Journey
          </span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main booking form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Destination overview */}
            <motion.div 
              className="glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-64 relative">
                <img 
                  src={currentDestination.image} 
                  alt={currentDestination.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="font-space text-3xl font-bold mb-2">{currentDestination.name}</h2>
                  <div className="flex items-center text-white/80">
                    <i className="fas fa-map-marker-alt mr-2 text-space-blue"></i>
                    {currentDestination.location}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-space text-xl font-bold mb-3">About Your Destination</h3>
                  <p className="text-white/70">
                    {currentDestination.fullDescription || currentDestination.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="glass p-3 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center mr-3">
                      <i className="fas fa-clock text-space-blue"></i>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Duration</div>
                      <div className="font-medium">{currentDestination.duration}</div>
                    </div>
                  </div>
                  
                  <div className="glass p-3 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-space-purple/20 border border-space-purple/50 flex items-center justify-center mr-3">
                      <i className="fas fa-route text-space-purple"></i>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Distance</div>
                      <div className="font-medium">{currentDestination.distance || '400 km'}</div>
                    </div>
                  </div>
                  
                  <div className="glass p-3 rounded-lg flex items-center">
                    <div className="w-10 h-10 rounded-full bg-space-pink/20 border border-space-pink/50 flex items-center justify-center mr-3">
                      <i className="fas fa-user-astronaut text-space-pink"></i>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Gravity</div>
                      <div className="font-medium">{currentDestination.gravity || '0g (Microgravity)'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Travel options */}
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-space text-xl font-bold mb-4">Travel Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Travel Date</label>
                  <input 
                    type="date" 
                    className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                    min="2050-01-01" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Passengers</label>
                  <div className="glass rounded-lg flex">
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus:outline-none"
                      onClick={() => setPassengers(prev => Math.max(1, prev - 1))}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input 
                      type="number" 
                      min="1"
                      max="8"
                      className="flex-grow bg-transparent border-0 text-center focus:ring-0" 
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    />
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus:outline-none"
                      onClick={() => setPassengers(prev => Math.min(8, prev + 1))}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">Cabin Class</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cabinClasses.map(cabin => (
                    <div 
                      key={cabin.id}
                      className={`glass p-4 rounded-lg cursor-pointer transition-colors ${cabinClass === cabin.id ? 'border-2 border-space-blue' : 'border border-white/20 hover:border-white/40'}`}
                      onClick={() => setCabinClass(cabin.id)}
                    >
                      <div className={`w-10 h-10 rounded-full bg-space-${cabin.color}/20 border border-space-${cabin.color}/50 flex items-center justify-center mb-3`}>
                        <i className={`${cabin.icon} text-space-${cabin.color}`}></i>
                      </div>
                      <h4 className="font-space font-bold mb-1">{cabin.name}</h4>
                      <p className="text-white/60 text-sm mb-2">{cabin.description}</p>
                      <div className="text-xs text-white/50">Price multiplier: {cabin.priceMultiplier}x</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Add-ons */}
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-space text-xl font-bold mb-4">Enhance Your Journey</h3>
              
              {isLoadingAddons ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="glass p-4 rounded-lg animate-pulse">
                      <div className="h-6 bg-white/10 rounded mb-2 w-2/3"></div>
                      <div className="h-10 bg-white/10 rounded mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mock addons if API data is not available */}
                  {(availableAddons || [
                    { id: 'addon1', name: 'Spacewalk Experience', description: 'Experience weightlessness outside the spacecraft with trained professionals', price: 150000, icon: 'fas fa-user-astronaut', color: 'blue' },
                    { id: 'addon2', name: 'Premium Meal Package', description: 'Enjoy gourmet molecular gastronomy meals prepared by our space chefs', price: 50000, icon: 'fas fa-utensils', color: 'pink' },
                    { id: 'addon3', name: 'VR Entertainment Bundle', description: 'Access premium movies, games and interactive experiences during your journey', price: 25000, icon: 'fas fa-vr-cardboard', color: 'purple' },
                    { id: 'addon4', name: 'Professional Photography', description: 'Our space photographers will capture your journey with high-end equipment', price: 75000, icon: 'fas fa-camera', color: 'green' }
                  ]).map(addon => (
                    <div 
                      key={addon.id}
                      className={`glass p-4 rounded-lg cursor-pointer transition-colors ${addons.includes(addon.id) ? 'border-2 border-space-blue' : 'border border-white/20 hover:border-white/40'}`}
                      onClick={() => handleAddonToggle(addon.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-space font-bold mb-1">{addon.name}</h4>
                          <p className="text-white/60 text-sm mb-2">{addon.description}</p>
                          <div className={`text-space-${addon.color}`}>{formatCurrency(addon.price)} AED per person</div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${addons.includes(addon.id) ? `bg-space-${addon.color} text-white` : `bg-space-${addon.color}/20 text-space-${addon.color}`}`}>
                          <i className={addon.icon}></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Booking summary */}
          <motion.div 
            className="glass rounded-xl p-6 h-fit sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-space text-xl font-bold mb-4">Booking Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-white/70">Destination</div>
                <div className="font-medium">{currentDestination.name}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Departure</div>
                <div className="font-medium">Dubai Spaceport</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Travel Date</div>
                <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Cabin Class</div>
                <div className="font-medium">{cabinClasses.find(c => c.id === cabinClass)?.name || 'Luxury Cabin'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Passengers</div>
                <div className="font-medium">{passengers}</div>
              </div>
              
              {addons.length > 0 && (
                <>
                  <div className="border-t border-white/10 pt-4 pb-2">
                    <div className="font-medium mb-2">Add-ons</div>
                    {addons.map(addonId => {
                      const addon = availableAddons?.find(a => a.id === addonId) || { 
                        id: addonId, 
                        name: `Add-on ${addonId}`, 
                        price: 0 
                      };
                      return (
                        <div key={addon.id} className="flex justify-between items-center text-sm py-1">
                          <div className="text-white/70">{addon.name}</div>
                          <div>{formatCurrency(addon.price * passengers)} AED</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-white/70">Subtotal</div>
                  <div>{formatCurrency(totalPrice * 0.95)} AED</div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-white/70">Space VAT (5%)</div>
                  <div>{formatCurrency(totalPrice * 0.05)} AED</div>
                </div>
                <div className="flex justify-between items-center font-space text-xl font-bold mt-2">
                  <div>Total</div>
                  <div>{formatCurrency(totalPrice)} AED</div>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full py-4 bg-gradient-to-r from-space-blue to-space-purple rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center text-white/50 text-sm">
              By proceeding, you agree to our <a href="/terms" className="text-space-blue hover:underline">Terms of Service</a> and <a href="/policies" className="text-space-blue hover:underline">Space Travel Policies</a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
