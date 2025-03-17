import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import DestinationCard from '@/components/ui/booking/DestinationCard';
import { destinations } from '@/lib/constants';

const DestinationsPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Fetch destinations
  const { data: destinationsData, isLoading } = useQuery({
    queryKey: ['/api/destinations'],
    staleTime: Infinity
  });
  
  // Use fetched data or fallback to constants
  const allDestinations = destinationsData || destinations;
  
  // Filter destinations based on selected filter
  const filteredDestinations = filter === 'all' 
    ? allDestinations 
    : allDestinations.filter(d => d.type === filter);
  
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
              Explore Space Destinations
            </span>
          </motion.h1>
          <motion.p 
            className="text-white/70 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Discover our range of extraordinary destinations beyond Earth. From orbital stations to distant planets, 
            each journey offers unique experiences and breathtaking views of the cosmos.
          </motion.p>
        </div>
        
        {/* Filters */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            className={`px-4 py-2 rounded-full glass ${filter === 'all' ? 'border-space-blue text-space-blue' : 'border-white/20 text-white/70 hover:border-white/40'} transition-colors`}
            onClick={() => setFilter('all')}
          >
            All Destinations
          </button>
          <button 
            className={`px-4 py-2 rounded-full glass ${filter === 'orbit' ? 'border-space-blue text-space-blue' : 'border-white/20 text-white/70 hover:border-white/40'} transition-colors`}
            onClick={() => setFilter('orbit')}
          >
            Earth Orbit
          </button>
          <button 
            className={`px-4 py-2 rounded-full glass ${filter === 'moon' ? 'border-space-blue text-space-blue' : 'border-white/20 text-white/70 hover:border-white/40'} transition-colors`}
            onClick={() => setFilter('moon')}
          >
            Lunar
          </button>
          <button 
            className={`px-4 py-2 rounded-full glass ${filter === 'mars' ? 'border-space-blue text-space-blue' : 'border-white/20 text-white/70 hover:border-white/40'} transition-colors`}
            onClick={() => setFilter('mars')}
          >
            Mars
          </button>
          <button 
            className={`px-4 py-2 rounded-full glass ${filter === 'deepspace' ? 'border-space-blue text-space-blue' : 'border-white/20 text-white/70 hover:border-white/40'} transition-colors`}
            onClick={() => setFilter('deepspace')}
          >
            Deep Space
          </button>
        </motion.div>
        
        {isLoading ? (
          // Skeleton loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
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
            ))}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <h3 className="font-space text-2xl font-bold mb-3">No destinations found</h3>
            <p className="text-white/70">Try adjusting your filters or check back later for new destinations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default DestinationsPage;
