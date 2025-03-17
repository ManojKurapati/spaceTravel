import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

type CalendarDay = {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isAvailable: boolean;
};

const DestinationSelector = () => {
  const { toast } = useToast();
  const [selectedDestination, setSelectedDestination] = useState('iss');
  const [selectedClass, setSelectedClass] = useState('luxury');
  const [selectedDate, setSelectedDate] = useState(new Date('2050-08-09'));
  const [selectedTime, setSelectedTime] = useState('14:15');
  
  // Query for destinations
  const { data: destinations } = useQuery({
    queryKey: ['/api/destinations'],
  });
  
  // Query for seat classes
  const { data: seatClasses } = useQuery({
    queryKey: ['/api/seat-classes'],
  });
  
  // Generate calendar days for the current month
  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const currentDate = new Date(2050, 7, 1); // August 2050
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Add days from previous month to fill the first week
    const firstDay = new Date(year, month, 1).getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDate - i,
        month: month - 1,
        year,
        isCurrentMonth: false,
        isSelected: false,
        isAvailable: false
      });
    }
    
    // Add days from current month
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month, i);
      const isSelected = date.getDate() === selectedDate.getDate() && 
                          date.getMonth() === selectedDate.getMonth() && 
                          date.getFullYear() === selectedDate.getFullYear();
      
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        isSelected,
        isAvailable: Math.random() > 0.3 // Randomly determine availability for demo
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  const handleDateSelect = (day: CalendarDay) => {
    if (!day.isAvailable) return;
    
    setSelectedDate(new Date(day.year, day.month, day.day));
  };
  
  const handleSearchFlights = () => {
    toast({
      title: "Flight Search",
      description: `Searching for flights to ${selectedDestination} on ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });
    
    // You would typically redirect to a results page here
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 1500);
  };
  
  return (
    <section className="py-16 relative" id="book">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-3">Select Your Destination</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose from our curated selection of cosmic destinations, each offering a unique experience beyond Earth.</p>
        </div>
        
        <motion.div 
          className="glassmorphism rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Departure</label>
                <div className="glassmorphism neo-border rounded-xl p-3 flex items-center">
                  <i className="fas fa-rocket text-neon-cyan mr-3"></i>
                  <span>Dubai Spaceport</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Destination</label>
                <div className="relative">
                  <select 
                    className="glassmorphism neo-border rounded-xl p-3 w-full bg-transparent appearance-none focus:outline-none cursor-pointer pr-10"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                  >
                    <option value="iss">International Space Station</option>
                    <option value="lunar">Lunar Hotels</option>
                    <option value="mars">Mars Colony Alpha</option>
                    <option value="orbit">Orbit Resorts</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <i className="fas fa-chevron-down text-neon-cyan"></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Class</label>
                <div className="flex flex-col space-y-2">
                  <div 
                    className={`glassmorphism rounded-xl p-3 flex items-center hover:bg-glass-white cursor-pointer transition-all ${selectedClass === 'luxury' ? 'border border-neon-magenta/30' : ''}`}
                    onClick={() => setSelectedClass('luxury')}
                  >
                    <i className="fas fa-star text-neon-magenta mr-3"></i>
                    <div>
                      <p className="font-medium">Luxury Cabin</p>
                      <p className="text-gray-400 text-sm">Premium experience with personal AI assistant</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`glassmorphism rounded-xl p-3 flex items-center hover:bg-glass-white cursor-pointer transition-all ${selectedClass === 'economy' ? 'border border-neon-cyan/30' : ''}`}
                    onClick={() => setSelectedClass('economy')}
                  >
                    <i className="fas fa-rocket text-neon-cyan mr-3"></i>
                    <div>
                      <p className="font-medium">Economy Shuttle</p>
                      <p className="text-gray-400 text-sm">Standard comfortable space travel</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`glassmorphism rounded-xl p-3 flex items-center hover:bg-glass-white cursor-pointer transition-all ${selectedClass === 'vip' ? 'border border-neon-magenta/30' : ''}`}
                    onClick={() => setSelectedClass('vip')}
                  >
                    <i className="fas fa-crown text-neon-magenta mr-3"></i>
                    <div>
                      <p className="font-medium">VIP Zero-Gravity Experience</p>
                      <p className="text-gray-400 text-sm">Premium suite with exclusive zero-G lounge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-2">
              <label className="block text-gray-300 mb-2">Select Travel Dates</label>
              <div className="glassmorphism neo-border rounded-xl p-4 h-full">
                {/* Calendar */}
                <div className="flex justify-between mb-4 items-center">
                  <button className="text-gray-400 hover:text-white">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <h3 className="font-space font-medium">August 2050</h3>
                  <button className="text-gray-400 hover:text-white">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  <div className="text-gray-500 text-sm">Sun</div>
                  <div className="text-gray-500 text-sm">Mon</div>
                  <div className="text-gray-500 text-sm">Tue</div>
                  <div className="text-gray-500 text-sm">Wed</div>
                  <div className="text-gray-500 text-sm">Thu</div>
                  <div className="text-gray-500 text-sm">Fri</div>
                  <div className="text-gray-500 text-sm">Sat</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {calendarDays.map((day, index) => (
                    <div key={index} className="aspect-square py-1">
                      <div 
                        className={`h-full flex items-center justify-center rounded-lg 
                          ${!day.isCurrentMonth ? 'text-gray-500' : ''}
                          ${day.isSelected ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan' : ''}
                          ${day.isAvailable && !day.isSelected ? 'hover:bg-glass-white cursor-pointer' : ''}
                          ${!day.isAvailable && day.isCurrentMonth ? 'text-gray-600 cursor-not-allowed' : ''}
                          transition-all`}
                        onClick={() => day.isAvailable && handleDateSelect(day)}
                      >
                        {day.day}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Selected Date</div>
                    <div className="font-space font-medium text-neon-cyan">
                      {selectedDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <div className="text-gray-400 text-sm">Available Launches</div>
                    <div className="flex gap-2 mt-1">
                      <button 
                        className={`rounded-lg px-3 py-1 text-sm transition-all ${selectedTime === '07:30' ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan' : 'bg-glass-white hover:bg-white/20'}`}
                        onClick={() => setSelectedTime('07:30')}
                      >
                        07:30
                      </button>
                      <button 
                        className={`rounded-lg px-3 py-1 text-sm transition-all ${selectedTime === '14:15' ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan' : 'bg-glass-white hover:bg-white/20'}`}
                        onClick={() => setSelectedTime('14:15')}
                      >
                        14:15
                      </button>
                      <button 
                        className={`rounded-lg px-3 py-1 text-sm transition-all ${selectedTime === '21:45' ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan' : 'bg-glass-white hover:bg-white/20'}`}
                        onClick={() => setSelectedTime('21:45')}
                      >
                        21:45
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <motion.button 
              className="bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 rounded-xl text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 flex items-center gap-2"
              onClick={handleSearchFlights}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search Flights
              <i className="fas fa-arrow-right"></i>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationSelector;
