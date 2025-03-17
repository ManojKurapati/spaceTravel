import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const ExperiencePackages = () => {
  const { toast } = useToast();
  
  // Query for packages data
  const { data: packages, isLoading } = useQuery({
    queryKey: ['/api/packages'],
  });
  
  const handleSelectPackage = (packageName: string) => {
    toast({
      title: "Package Selected",
      description: `You selected ${packageName}. Adding to your booking...`,
    });
  };
  
  // Placeholder packages in case API data isn't loaded yet
  const placeholderPackages = [
    {
      id: 1,
      name: "Moonlight Honeymoon",
      description: "Perfect for couples celebrating love",
      features: [
        "Private lunar suite with Earth view",
        "Champagne dinner in zero gravity",
        "Couples spacewalk experience",
        "Personalized NFT marriage certificate"
      ],
      basePrice: 95000,
      icon: "heart",
      accentColor: "from-neon-cyan to-neon-magenta"
    },
    {
      id: 2,
      name: "Mars Explorer Pro",
      description: "Ultimate adventure for thrill-seekers",
      features: [
        "7-day Mars surface expedition",
        "Martian rover driving experience",
        "Olympus Mons base camp visit",
        "Advanced life support training"
      ],
      basePrice: 185000,
      icon: "mountain",
      accentColor: "from-neon-blue to-neon-cyan"
    },
    {
      id: 3,
      name: "Zero-G Luxury Retreat",
      description: "Relaxation beyond Earth's gravity",
      features: [
        "Orbital spa and wellness center",
        "Michelin-star space cuisine",
        "Celestial yoga and meditation",
        "Earth observation panoramic suite"
      ],
      basePrice: 110000,
      icon: "spa",
      accentColor: "from-neon-cyan to-neon-cyan"
    }
  ];
  
  const displayPackages = packages || placeholderPackages;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="py-16 relative" id="experiences">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-3">Premium Experience Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Enhance your space journey with our curated experience packages designed for unforgettable memories.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayPackages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              className="glassmorphism neo-border rounded-xl overflow-hidden relative"
              variants={item}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pkg.accentColor}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-space font-medium text-xl mb-1">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm">{pkg.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-glass-white flex items-center justify-center">
                    <i className={`fas fa-${pkg.icon} text-neon-${pkg.icon === 'heart' || pkg.icon === 'mountain' ? 'magenta' : 'cyan'}`}></i>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-neon-cyan mt-1 mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-gray-400">Starting at</span>
                    <div className="text-white font-space font-medium text-2xl">
                      {new Intl.NumberFormat('en-AE', { 
                        style: 'decimal',
                        maximumFractionDigits: 0 
                      }).format(pkg.basePrice)} AED
                    </div>
                  </div>
                  <motion.button 
                    className="bg-glass-white hover:bg-white/20 py-2 px-4 rounded-lg transition-all text-sm flex items-center gap-2"
                    onClick={() => handleSelectPackage(pkg.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Select <i className="fas fa-arrow-right text-xs"></i>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencePackages;
