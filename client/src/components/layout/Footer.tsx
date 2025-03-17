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
              <div className="flex items-center space-x-2 mb-6 cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center">
                  <i className="fas fa-rocket text-space-blue"></i>
                </div>
                <span className="font-space font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
                  DUBAI SPACEPORT
                </span>
              </div>
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
              <li><Link href="/destinations"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Destinations</div></Link></li>
              <li><Link href="/experiences"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Experience Packages</div></Link></li>
              <li><Link href="/schedule"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Launch Schedule</div></Link></li>
              <li><Link href="/cabins"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Cabin Classes</div></Link></li>
              <li><Link href="/safety"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Safety Protocols</div></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Contact Us</div></Link></li>
              <li><Link href="/faq"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">FAQs</div></Link></li>
              <li><Link href="/medical"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Medical Requirements</div></Link></li>
              <li><Link href="/training"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Training Programs</div></Link></li>
              <li><Link href="/terms"><div className="text-white/60 hover:text-space-blue transition-colors cursor-pointer">Terms & Conditions</div></Link></li>
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
            <Link href="/privacy"><div className="text-white/60 hover:text-space-blue transition-colors text-sm cursor-pointer">Privacy Policy</div></Link>
            <Link href="/terms"><div className="text-white/60 hover:text-space-blue transition-colors text-sm cursor-pointer">Terms of Service</div></Link>
            <Link href="/cookies"><div className="text-white/60 hover:text-space-blue transition-colors text-sm cursor-pointer">Cookie Policy</div></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
