import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Choose Destination',
    description: 'Browse our range of space destinations from orbital resorts to Mars colonies.',
    icon: 'fas fa-search',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Select Your Date',
    description: 'Choose from available launch windows optimized for your destination.',
    icon: 'fas fa-calendar-alt',
    color: 'purple'
  },
  {
    id: 3,
    title: 'Customize Trip',
    description: 'Select cabin class, add experiences, and customize your space journey.',
    icon: 'fas fa-rocket',
    color: 'pink'
  },
  {
    id: 4,
    title: 'Prepare for Launch',
    description: 'Complete medical clearance, training modules, and prepare for your adventure.',
    icon: 'fas fa-check-circle',
    color: 'green'
  }
];

const BookingProcess = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="font-space text-3xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Your Journey to the Stars
          </motion.h2>
          <motion.p 
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A seamless booking experience to prepare you for space travel
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-space-blue via-space-purple to-space-pink transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="glass p-6 rounded-xl text-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-space-${step.color}/20 border border-space-${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${step.icon} text-space-${step.color} text-2xl`}></i>
                </div>
                <h3 className="font-space text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="px-8 py-4 bg-gradient-to-r from-space-blue to-space-purple rounded-full font-medium hover:opacity-90 transition-opacity"
            onClick={() => window.location.href = '/booking/new'}
          >
            Start Your Journey Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingProcess;
