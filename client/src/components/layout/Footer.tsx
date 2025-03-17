import { Link } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "You'll now receive launch notifications and exclusive offers.",
      });
      setEmail('');
    }
  };
  
  return (
    <footer className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/">
              <a className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center">
                  <i className="fas fa-rocket text-space-blue"></i>
                </div>
                <span className="font-space font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
                  DUBAI SPACEPORT
                </span>
              </a>
            </Link>
            <p className="text-white/60 mb-4">
              The gateway to the stars since 2040. Dubai's premier commercial spaceport offering luxury travel beyond Earth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-space-blue transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white/60 hover:text-space-blue transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white/60 hover:text-space-blue transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white/60 hover:text-space-blue transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/destinations"><a className="text-white/60 hover:text-space-blue transition-colors">Destinations</a></Link></li>
              <li><Link href="/experiences"><a className="text-white/60 hover:text-space-blue transition-colors">Experience Packages</a></Link></li>
              <li><Link href="/schedule"><a className="text-white/60 hover:text-space-blue transition-colors">Launch Schedule</a></Link></li>
              <li><Link href="/cabins"><a className="text-white/60 hover:text-space-blue transition-colors">Cabin Classes</a></Link></li>
              <li><Link href="/safety"><a className="text-white/60 hover:text-space-blue transition-colors">Safety Protocols</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact"><a className="text-white/60 hover:text-space-blue transition-colors">Contact Us</a></Link></li>
              <li><Link href="/faq"><a className="text-white/60 hover:text-space-blue transition-colors">FAQs</a></Link></li>
              <li><Link href="/medical"><a className="text-white/60 hover:text-space-blue transition-colors">Medical Requirements</a></Link></li>
              <li><Link href="/training"><a className="text-white/60 hover:text-space-blue transition-colors">Training Programs</a></Link></li>
              <li><Link href="/terms"><a className="text-white/60 hover:text-space-blue transition-colors">Terms & Conditions</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-white/60 mb-4">
              Sign up for launch notifications and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full p-3 glass rounded-l-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-r-lg"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2050 Dubai Spaceport. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy"><a className="text-white/60 hover:text-space-blue transition-colors text-sm">Privacy Policy</a></Link>
            <Link href="/terms"><a className="text-white/60 hover:text-space-blue transition-colors text-sm">Terms of Service</a></Link>
            <Link href="/cookies"><a className="text-white/60 hover:text-space-blue transition-colors text-sm">Cookie Policy</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
