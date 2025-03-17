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
          <a className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 rounded-full bg-neon-cyan opacity-20 animate-pulse"></div>
              <div className="absolute inset-[2px] rounded-full bg-space-dark flex items-center justify-center">
                <i className="fas fa-rocket text-neon-cyan text-xl transform rotate-45"></i>
              </div>
            </div>
            <span className="font-space font-bold text-xl tracking-wider">DUBAI SPACEPORT</span>
          </a>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/#destinations">
            <a className={`text-white hover:text-neon-cyan transition duration-300 ${
              location === '/#destinations' ? 'text-neon-cyan' : ''
            }`}>
              Destinations
            </a>
          </Link>
          <Link href="/#experiences">
            <a className={`text-white hover:text-neon-cyan transition duration-300 ${
              location === '/#experiences' ? 'text-neon-cyan' : ''
            }`}>
              Experiences
            </a>
          </Link>
          <Link href="/#accommodations">
            <a className={`text-white hover:text-neon-cyan transition duration-300 ${
              location === '/#accommodations' ? 'text-neon-cyan' : ''
            }`}>
              Accommodations
            </a>
          </Link>
          <Link href="/about">
            <a className={`text-white hover:text-neon-cyan transition duration-300 ${
              location === '/about' ? 'text-neon-cyan' : ''
            }`}>
              About
            </a>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <a className="neo-border rounded-full px-4 py-1.5 text-neon-cyan text-sm hover:bg-glass-white transition-all duration-300">
              Dashboard
            </a>
          </Link>
          <Link href="/#book">
            <motion.a 
              className="bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full px-4 py-1.5 text-white text-sm hover:shadow-lg hover:shadow-neon-magenta/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
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
              <a className="text-white py-2 hover:text-neon-cyan" onClick={() => setMobileMenuOpen(false)}>
                Destinations
              </a>
            </Link>
            <Link href="/#experiences">
              <a className="text-white py-2 hover:text-neon-cyan" onClick={() => setMobileMenuOpen(false)}>
                Experiences
              </a>
            </Link>
            <Link href="/#accommodations">
              <a className="text-white py-2 hover:text-neon-cyan" onClick={() => setMobileMenuOpen(false)}>
                Accommodations
              </a>
            </Link>
            <Link href="/about">
              <a className="text-white py-2 hover:text-neon-cyan" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
