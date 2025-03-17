import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const Hero = () => {
  const [countdown, setCountdown] = useState('03:18:45:22');
  
  useEffect(() => {
    // Simulate countdown timer
    const interval = setInterval(() => {
      const [days, hours, minutes, seconds] = countdown.split(':').map(Number);
      
      let newSeconds = seconds - 1;
      let newMinutes = minutes;
      let newHours = hours;
      let newDays = days;
      
      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes--;
      }
      
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours--;
      }
      
      if (newHours < 0) {
        newHours = 23;
        newDays--;
      }
      
      setCountdown(
        `${newDays.toString().padStart(2, '0')}:${newHours
          .toString()
          .padStart(2, '0')}:${newMinutes
          .toString()
          .padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [countdown]);
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-space font-bold text-4xl md:text-6xl leading-tight mb-4">
              <span className="text-white">Journey to the</span>{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta inline-block text-transparent bg-clip-text">
                Stars
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Experience the ultimate adventure with Dubai's premier space travel service. Book your ticket to the cosmos today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/#destinations">
                <motion.a
                  className="bg-gradient-to-r from-neon-blue to-neon-magenta px-8 py-3 rounded-xl text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Destinations
                </motion.a>
              </Link>
              <Link href="/#schedule">
                <motion.a
                  className="neo-border px-8 py-3 rounded-xl text-neon-cyan font-space font-medium hover:bg-glass-white transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Launch Schedule
                </motion.a>
              </Link>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-space-dark bg-gray-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-space-dark bg-gray-400"></div>
                <div className="w-10 h-10 rounded-full border-2 border-space-dark bg-gray-500"></div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-neon-cyan">
                  <i className="fas fa-star text-xs"></i>
                  <i className="fas fa-star text-xs"></i>
                  <i className="fas fa-star text-xs"></i>
                  <i className="fas fa-star text-xs"></i>
                  <i className="fas fa-star-half-alt text-xs"></i>
                  <span className="ml-1 text-white font-medium">4.8/5</span>
                </div>
                <p className="text-gray-400 text-sm">Based on 2,500+ happy travelers</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl blur opacity-30"></div>
              <div className="glassmorphism rounded-xl overflow-hidden relative z-10">
                <div className="w-full h-64 md:h-96 bg-space-blue">
                  <div className="w-full h-full bg-gradient-to-br from-transparent to-space-purple flex items-center justify-center">
                    <i className="fas fa-rocket text-5xl text-neon-cyan animate-float"></i>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-space-dark">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-300 text-sm mb-1">Next launch in</p>
                      <div className="countdown-timer font-space font-bold text-3xl">
                        {countdown}
                      </div>
                    </div>
                    <motion.button 
                      className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-play text-xs"></i>
                      Watch Promo
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Orbital decoration elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full border border-neon-cyan/20 opacity-50"></div>
      <div className="absolute bottom-1/3 left-10 w-40 h-40 rounded-full border border-neon-magenta/20 opacity-30"></div>
      <div className="absolute -bottom-10 right-1/4 w-60 h-60 rounded-full border border-neon-blue/20 opacity-20"></div>
    </section>
  );
};

export default Hero;
