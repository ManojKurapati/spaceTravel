import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const BookingForm = () => {
  const [destination, setDestination] = useState('iss');
  const [date, setDate] = useState('2050-06-15');
  const [passengers, setPassengers] = useState('1');
  const [cabinClass, setCabinClass] = useState('luxury');
  const [location, setLocation] = useLocation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/booking/${destination}?date=${date}&passengers=${passengers}&class=${cabinClass}`);
  };
  
  return (
    <motion.div 
      className="glass p-6 rounded-xl max-w-4xl mx-auto neon-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Departure</label>
            <div className="glass p-3 rounded-lg text-left">
              <div className="font-medium text-space-blue">Dubai Spaceport</div>
              <div className="text-xs text-white/50">Earth, UAE</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Destination</label>
            <select 
              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="iss">International Space Station</option>
              <option value="lunar">Lunar Hotels</option>
              <option value="mars">Mars Colony Alpha</option>
              <option value="orbit">Orbit Resorts</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Travel Date</label>
            <input 
              type="date" 
              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
              min="2050-01-01" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Passengers</label>
            <select 
              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4+ Passengers</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Cabin Class</label>
            <select 
              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
            >
              <option value="luxury">Luxury Cabin</option>
              <option value="economy">Economy Shuttle</option>
              <option value="vip">VIP Zero-Gravity Experience</option>
            </select>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-space-blue to-space-purple rounded-full font-medium text-white hover:opacity-90 transition-opacity"
        >
          <i className="fas fa-search-location mr-2"></i>Find Space Journeys
        </button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
