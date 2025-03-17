import { motion } from 'framer-motion';
import { ExperiencePackage as ExperiencePackageType } from '@/lib/types';

type ExperiencePackageProps = {
  experience: ExperiencePackageType;
  index: number;
};

const ExperiencePackage = ({ experience, index }: ExperiencePackageProps) => {
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${experience.color}/30 z-10`}></div>
      <img 
        src={experience.image} 
        alt={experience.title} 
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="p-6 relative z-20">
        <div className={`inline-block px-3 py-1 rounded-full bg-${experience.color}/20 border border-${experience.color}/30 text-${experience.color} text-xs font-medium mb-3`}>
          {experience.category}
        </div>
        <h3 className="font-space text-2xl font-bold mb-2">{experience.title}</h3>
        <p className="text-white/70 mb-4">
          {experience.description}
        </p>
        <div className="flex justify-between items-center">
          <div className={`text-lg font-space font-bold text-${experience.color}`}>{experience.price} AED</div>
          <button 
            className={`px-4 py-2 rounded-full bg-${experience.color}/20 border border-${experience.color}/30 text-${experience.color} hover:bg-${experience.color}/30 transition-colors`}
            onClick={() => window.location.href = `/experiences/${experience.id}`}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperiencePackage;
