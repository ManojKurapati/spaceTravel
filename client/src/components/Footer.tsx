import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-6 cursor-pointer">
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 rounded-full bg-neon-cyan opacity-20 animate-pulse"></div>
                  <div className="absolute inset-[2px] rounded-full bg-space-dark flex items-center justify-center">
                    <i className="fas fa-rocket text-neon-cyan text-xl transform rotate-45"></i>
                  </div>
                </div>
                <span className="font-space font-bold text-xl tracking-wider">DUBAI SPACEPORT</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">The future of space travel begins in Dubai. Experience the cosmos like never before with our premium space tourism services.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-glass-white flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-glass-white flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fab fa-instagram text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-glass-white flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fab fa-linkedin-in text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-glass-white flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fab fa-youtube text-white"></i>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-space font-medium text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Space Flights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Orbital Resorts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Lunar Experiences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Mars Expeditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Zero-G Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Space Education</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-space font-medium text-lg mb-6">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Safety Measures</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Travel Requirements</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Spaceport Facilities</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-space font-medium text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to receive updates on new destinations and special offers.</p>
            <div className="flex flex-col space-y-3">
              <input type="email" placeholder="Your email address" className="bg-glass-white rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-neon-cyan" />
              <button className="bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-3 rounded-lg text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col-reverse md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mt-4 md:mt-0">© 2050 Dubai Spaceport. All rights reserved. Terms & Privacy.</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                <i className="fab fa-ethereum"></i>
              </div>
              <span className="text-sm">ETH Accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                <i className="fab fa-bitcoin"></i>
              </div>
              <span className="text-sm">BTC Accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-credit-card text-neon-cyan"></i>
              <span className="text-sm">AED/USD Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
