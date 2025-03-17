import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const FeaturedDestinations = () => {
  const { toast } = useToast();
  
  // Query for destinations data
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['/api/destinations'],
  });
  
  const handleViewDetails = (destinationName: string) => {
    toast({
      title: "Destination Selected",
      description: `You selected ${destinationName}. Loading details...`,
    });
  };
  
  // Placeholder destinations in case API data isn't loaded yet
  const placeholderDestinations = [
    {
      id: 1,
      name: "International Space Station",
      location: "Low Earth Orbit · 400 km",
      travelDuration: "3 days",
      rating: 4.8,
      basePrice: 12500,
      imageUrl: ""
    },
    {
      id: 2,
      name: "Lunar Hotels",
      location: "Sea of Tranquility · Moon",
      travelDuration: "5 days",
      rating: 4.9,
      basePrice: 45000,
      imageUrl: ""
    },
    {
      id: 3,
      name: "Mars Colony Alpha",
      location: "Arcadia Planitia · Mars",
      travelDuration: "14 days",
      rating: 4.1,
      basePrice: 120000,
      imageUrl: ""
    },
    {
      id: 4,
      name: "Orbit Resorts",
      location: "Geostationary Orbit · Earth",
      travelDuration: "7 days",
      rating: 5.0,
      basePrice: 78000,
      imageUrl: ""
    }
  ];
  
  const displayDestinations = destinations || placeholderDestinations;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="py-16 relative" id="destinations">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-3">Featured Destinations</h2>
            <p className="text-gray-400 max-w-2xl">Explore our most popular cosmic destinations and prepare for the journey of a lifetime.</p>
          </div>
          <div className="hidden md:block">
            <button className="neo-border px-5 py-2 rounded-xl text-neon-cyan font-space font-medium hover:bg-glass-white transition-all duration-300">
              View All
            </button>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {displayDestinations.map((destination) => (
            <motion.div 
              key={destination.id}
              className="holographic-card glassmorphism rounded-xl overflow-hidden group relative"
              variants={item}
            >
              <div className="relative h-48">
                <div className="w-full h-full bg-space-blue flex items-center justify-center">
                  <i className="fas fa-globe text-4xl text-neon-cyan"></i>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark"></div>
                <div className="absolute top-3 right-3 bg-glass-white backdrop-blur-md rounded-full py-1 px-3 text-xs flex items-center">
                  <i className="fas fa-clock text-neon-cyan mr-1"></i>
                  <span>{destination.travelDuration}</span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-space font-medium text-xl">{destination.name}</h3>
                <div className="flex items-center gap-1 mb-3 text-gray-400 text-sm">
                  <i className="fas fa-map-marker-alt text-neon-magenta"></i>
                  <span>{destination.location}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-1 text-neon-cyan">
                    {Array.from({ length: Math.floor(destination.rating) }).map((_, i) => (
                      <i key={i} className="fas fa-star text-xs"></i>
                    ))}
                    {destination.rating % 1 >= 0.5 && (
                      <i className="fas fa-star-half-alt text-xs"></i>
                    )}
                    {destination.rating % 1 < 0.5 && destination.rating % 1 > 0 && (
                      <i className="far fa-star text-xs"></i>
                    )}
                    <span className="ml-1 text-white text-sm">{destination.rating}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 text-sm">from</span>
                    <span className="text-white font-space font-medium ml-1">
                      {new Intl.NumberFormat('en-AE', { 
                        style: 'decimal',
                        maximumFractionDigits: 0
                      }).format(destination.basePrice)} AED
                    </span>
                  </div>
                </div>
                
                <motion.button 
                  className="w-full bg-glass-white hover:bg-white/20 py-2 rounded-lg transition-all text-sm flex justify-center items-center gap-2"
                  onClick={() => handleViewDetails(destination.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details <i className="fas fa-arrow-right text-xs"></i>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <button className="neo-border px-5 py-2 rounded-xl text-neon-cyan font-space font-medium hover:bg-glass-white transition-all duration-300">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
