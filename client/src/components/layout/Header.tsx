import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center">
                <i className="fas fa-rocket text-space-blue"></i>
              </div>
              <span className="font-space font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
                DUBAI SPACEPORT
              </span>
            </a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/destinations">
            <a className={`${location === '/destinations' ? 'text-space-blue' : 'text-white/70'} hover:text-space-blue transition-colors font-medium`}>
              Destinations
            </a>
          </Link>
          <Link href="/experiences">
            <a className={`${location === '/experiences' ? 'text-space-blue' : 'text-white/70'} hover:text-white transition-colors font-medium`}>
              Experiences
            </a>
          </Link>
          <Link href="/pricing">
            <a className={`${location === '/pricing' ? 'text-space-blue' : 'text-white/70'} hover:text-white transition-colors font-medium`}>
              Pricing
            </a>
          </Link>
          <Link href="/about">
            <a className={`${location === '/about' ? 'text-space-blue' : 'text-white/70'} hover:text-white transition-colors font-medium`}>
              About
            </a>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <a className="hidden md:block px-4 py-2 rounded-full glass text-space-blue border border-space-blue/30 hover:bg-space-blue/10 transition-all">
              <i className="fas fa-user-astronaut mr-2"></i>Sign In
            </a>
          </Link>
          <button 
            className="md:hidden text-2xl text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-1">
          <div className="flex flex-col p-4">
            <Link href="/destinations">
              <a className="py-2 text-white/70 hover:text-space-blue transition-colors">
                Destinations
              </a>
            </Link>
            <Link href="/experiences">
              <a className="py-2 text-white/70 hover:text-space-blue transition-colors">
                Experiences
              </a>
            </Link>
            <Link href="/pricing">
              <a className="py-2 text-white/70 hover:text-space-blue transition-colors">
                Pricing
              </a>
            </Link>
            <Link href="/about">
              <a className="py-2 text-white/70 hover:text-space-blue transition-colors">
                About
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="py-2 text-space-blue">
                <i className="fas fa-user-astronaut mr-2"></i>Sign In
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
