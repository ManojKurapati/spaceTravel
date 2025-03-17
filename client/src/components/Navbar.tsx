import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glassmorphism sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 rounded-full bg-neon-cyan opacity-20 animate-pulse"></div>
              <div className="absolute inset-[2px] rounded-full bg-space-dark flex items-center justify-center">
                <i className="fas fa-rocket text-neon-cyan text-xl transform rotate-45"></i>
              </div>
            </div>
            <span className="font-space font-bold text-xl tracking-wider">DUBAI SPACEPORT</span>
          </div>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/#destinations">
            <div className={`text-white hover:text-neon-cyan transition duration-300 cursor-pointer ${
              location === '/#destinations' ? 'text-neon-cyan' : ''
            }`}>
              Destinations
            </div>
          </Link>
          <Link href="/#experiences">
            <div className={`text-white hover:text-neon-cyan transition duration-300 cursor-pointer ${
              location === '/#experiences' ? 'text-neon-cyan' : ''
            }`}>
              Experiences
            </div>
          </Link>
          <Link href="/#accommodations">
            <div className={`text-white hover:text-neon-cyan transition duration-300 cursor-pointer ${
              location === '/#accommodations' ? 'text-neon-cyan' : ''
            }`}>
              Accommodations
            </div>
          </Link>
          <Link href="/about">
            <div className={`text-white hover:text-neon-cyan transition duration-300 cursor-pointer ${
              location === '/about' ? 'text-neon-cyan' : ''
            }`}>
              About
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <div className="neo-border rounded-full px-4 py-1.5 text-neon-cyan text-sm hover:bg-glass-white transition-all duration-300 cursor-pointer">
              Dashboard
            </div>
          </Link>
          <Link href="/#book">
            <motion.div 
              className="bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full px-4 py-1.5 text-white text-sm hover:shadow-lg hover:shadow-neon-magenta/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden glassmorphism border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-4 px-4 flex flex-col space-y-4">
            <Link href="/#destinations">
              <div className="text-white py-2 hover:text-neon-cyan cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                Destinations
              </div>
            </Link>
            <Link href="/#experiences">
              <div className="text-white py-2 hover:text-neon-cyan cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                Experiences
              </div>
            </Link>
            <Link href="/#accommodations">
              <div className="text-white py-2 hover:text-neon-cyan cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                Accommodations
              </div>
            </Link>
            <Link href="/about">
              <div className="text-white py-2 hover:text-neon-cyan cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                About
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
