import { motion } from 'framer-motion';
import { Launch } from '@/lib/types';
import { Link } from 'wouter';

type LaunchCardProps = {
  launch: Launch;
  index: number;
};

const LaunchCard = ({ launch, index }: LaunchCardProps) => {
  // Calculate countdown circle
  const dasharray = 126; // 2 * PI * r where r = 20
  const dashoffset = dasharray * (1 - (launch.countdownPercentage / 100));
  
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden w-80"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className={`text-space-${launch.accentColor} font-medium text-sm`}>{launch.flightNumber}</div>
            <h3 className="font-space text-xl font-bold">{launch.name}</h3>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={launch.destinationImage} 
              alt={launch.destination} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Destination:</span>
            <span className="font-medium">{launch.destination}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Launch Date:</span>
            <span className="font-medium">{launch.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Duration:</span>
            <span className="font-medium">{launch.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Available Seats:</span>
            <span className={`font-medium ${launch.availableSeats <= 5 ? 'text-alert-red' : 'text-space-green'}`}>{launch.availableSeats}</span>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="flex items-center space-x-2 mb-5">
          <div className="shrink-0">
            <svg className="countdown-ring w-12 h-12">
              <circle cx="24" cy="24" r="20" strokeWidth="4" stroke="#1E293B" fill="none"></circle>
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                strokeWidth="4" 
                stroke={launch.accentColor === 'blue' ? '#00D8FF' : 
                         launch.accentColor === 'purple' ? '#A855F7' : 
                         launch.accentColor === 'pink' ? '#EC4899' : 
                         launch.accentColor === 'yellow' ? '#FACC15' : '#00D8FF'}
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
                fill="none"
              ></circle>
            </svg>
          </div>
          <div>
            <div className="text-xs text-white/60">Launch in</div>
            <div className="font-mono font-medium">{launch.countdown}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-white/60">Starting from</div>
            <div className="font-space font-bold text-lg">{launch.price}</div>
          </div>
          <Link href={`/booking/${launch.id}`}>
            <a className={`px-4 py-2 rounded-full bg-space-${launch.accentColor}/20 border border-space-${launch.accentColor}/30 text-space-${launch.accentColor} hover:bg-space-${launch.accentColor}/30 transition-colors`}>
              Book Now
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LaunchCard;
