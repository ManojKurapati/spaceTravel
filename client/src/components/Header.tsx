import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { HolographicButton } from '../components/ui/HolographicButton';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-10 px-4 md:px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <circle cx="20" cy="20" r="19" stroke="url(#logo-gradient)" strokeWidth="2"/>
              <path d="M20 10L25 22H15L20 10Z" fill="#00F0FF"/>
              <path d="M15 20L12 30H28L25 20" stroke="#00F0FF" strokeWidth="1.5"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6C00FF"/>
                  <stop offset="1" stopColor="#00F0FF"/>
                </linearGradient>
              </defs>
            </svg>
            <h1 className="font-orbitron text-xl md:text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-neon-cyan bg-clip-text text-transparent">
              DUBAI SPACEPORT
            </h1>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#destinations">
            <div className="text-white/80 hover:text-neon-cyan transition cursor-pointer">Destinations</div>
          </Link>
          <Link href="/#packages">
            <div className="text-white/80 hover:text-neon-cyan transition cursor-pointer">Packages</div>
          </Link>
          <Link href="/#accommodations">
            <div className="text-white/80 hover:text-neon-cyan transition cursor-pointer">Accommodations</div>
          </Link>
          <Link href="/about">
            <div className="text-white/80 hover:text-neon-cyan transition cursor-pointer">About Us</div>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <HolographicButton className="hidden md:block bg-transparent border border-neon-cyan/30 hover:border-neon-cyan rounded-full px-5 py-1.5 text-neon-cyan text-sm transition">
              Sign In
            </HolographicButton>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-2xl text-white"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass fixed inset-0 z-50 flex flex-col justify-center items-center"
        >
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-3xl text-white"
          >
            <i className="ri-close-line"></i>
          </button>
          <div className="flex flex-col space-y-8 items-center font-orbitron text-xl">
            <Link href="/#destinations">
              <div className="text-white hover:text-neon-cyan transition cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                Destinations
              </div>
            </Link>
            <Link href="/#packages">
              <div className="text-white hover:text-neon-cyan transition cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                Packages
              </div>
            </Link>
            <Link href="/#accommodations">
              <div className="text-white hover:text-neon-cyan transition cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                Accommodations
              </div>
            </Link>
            <Link href="/about">
              <div className="text-white hover:text-neon-cyan transition cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </div>
            </Link>
            <Link href="/dashboard">
              <HolographicButton 
                className="bg-transparent border border-neon-cyan rounded-full px-8 py-2 text-neon-cyan mt-4 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </HolographicButton>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
