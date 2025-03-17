import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Destination } from '@/lib/types';

type DestinationCardProps = {
  destination: Destination;
  index: number;
};

const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          <i className="fas fa-clock mr-1"></i> {destination.duration}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-space text-xl font-bold mb-2">{destination.name}</h3>
        <div className="flex items-center text-white/60 text-sm mb-3">
          <i className="fas fa-map-marker-alt mr-2 text-space-blue"></i>
          {destination.location}
        </div>
        <p className="text-white/70 text-sm mb-4">
          {destination.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-white/60">Starting from</span>
            <div className={`font-space font-bold text-lg ${destination.priceColor}`}>{destination.price} AED</div>
          </div>
          <Link href={`/booking/${destination.id}`}>
            <a className="p-2 rounded-full border border-space-blue/30 text-space-blue hover:bg-space-blue/10 transition-colors">
              <i className="fas fa-arrow-right"></i>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
