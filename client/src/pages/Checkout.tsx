import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PAYMENT_METHODS, CURRENCIES } from '@/lib/constants';
import { fadeIn } from '@/lib/animations';

const Checkout = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [currency, setCurrency] = useState<string>('AED');
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState<boolean>(true);
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);
  
  // Mock booking details
  const bookingDetails = {
    destination: {
      name: 'Lunar Hotels',
      location: 'Sea of Tranquility · Moon',
      travelDuration: '5 days'
    },
    seatClass: {
      name: 'Luxury Cabin',
      priceMultiplier: 1.5
    },
    package: {
      name: 'Moonlight Honeymoon',
      price: 45000
    },
    departureDate: new Date('2050-08-20T14:15:00'),
    returnDate: new Date('2050-08-25T19:30:00'),
    passengers: 2,
    basePrice: 70000,
    taxes: 7000,
    insurance: 4500
  };
  
  // Calculate total before discount
  const subtotal = bookingDetails.basePrice + bookingDetails.package.price;
  const feesAndTaxes = bookingDetails.taxes + bookingDetails.insurance;
  const totalBeforeDiscount = subtotal + feesAndTaxes;
  
  // Calculate discount if promo is applied
  const discount = isPromoApplied ? totalBeforeDiscount * 0.15 : 0; // 15% discount
  
  // Calculate final total
  const totalAmount = totalBeforeDiscount - discount;
  
  // Convert price based on selected currency
  const convertPrice = (amount: number): number => {
    switch(currency) {
      case 'USD':
        return amount / 3.67; // AED to USD conversion
      case 'ETH':
        return amount / 15000; // Rough AED to ETH conversion for demo
      case 'BTC':
        return amount / 200000; // Rough AED to BTC conversion for demo
      default:
        return amount;
    }
  };
  
  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount);
    
    switch(currency) {
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(convertedAmount);
      case 'ETH':
        return `${convertedAmount.toFixed(4)} ETH`;
      case 'BTC':
        return `${convertedAmount.toFixed(6)} BTC`;
      default:
        return `${new Intl.NumberFormat('en-AE').format(convertedAmount)} AED`;
    }
  };
  
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SPACE2050') {
      setIsPromoApplied(true);
      toast({
        title: "Promo Code Applied",
        description: "15% discount has been applied to your booking.",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive"
      });
    }
  };
  
  // Payment submission mutation
  const createBooking = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/bookings', {
        destinationId: 2, // Lunar Hotels
        seatClassId: 1, // Luxury Cabin
        packageId: 1, // Moonlight Honeymoon
        departureDate: bookingDetails.departureDate,
        returnDate: bookingDetails.returnDate,
        totalPrice: totalAmount,
        currency,
        status: 'confirmed',
        paymentStatus: 'paid'
      });
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful",
        description: "Your space journey has been booked! Redirecting to your dashboard...",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const handleSubmitPayment = () => {
    if (!isAgreementChecked) {
      toast({
        title: "Agreement Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    createBooking.mutate();
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <Link href="/">
            <div className="text-neon-cyan hover:text-neon-magenta transition-colors flex items-center gap-2 mb-6 cursor-pointer">
              <i className="fas fa-arrow-left"></i>
              <span>Continue Exploring</span>
            </div>
          </Link>
          
          <h1 className="font-space font-bold text-3xl md:text-4xl mb-4">Secure Checkout</h1>
          <p className="text-gray-400 max-w-2xl">Complete your booking securely to confirm your space adventure to {bookingDetails.destination.name}.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glassmorphism rounded-xl p-6 mb-8">
              <h2 className="font-space font-medium text-xl mb-6 flex items-center gap-2">
                <i className="fas fa-rocket text-neon-cyan"></i>
                Trip Summary
              </h2>
              
              <div className="bg-glass-white rounded-xl p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div>
                    <h3 className="font-space font-medium text-lg">{bookingDetails.destination.name}</h3>
                    <p className="text-gray-400">{bookingDetails.destination.location}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex items-center gap-2 bg-space-dark/50 rounded-full px-3 py-1">
                    <i className="fas fa-calendar-alt text-neon-magenta"></i>
                    <span className="text-sm">
                      {bookingDetails.departureDate.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <Separator className="my-4 bg-white/10" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Duration</p>
                    <p className="font-medium">{bookingDetails.destination.travelDuration}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Class</p>
                    <p className="font-medium">{bookingDetails.seatClass.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Passengers</p>
                    <p className="font-medium">{bookingDetails.passengers} Adults</p>
                  </div>
                </div>
                
                <Separator className="my-4 bg-white/10" />
                
                <div className="flex items-center gap-2 text-neon-cyan">
                  <i className="fas fa-gift"></i>
                  <span className="font-medium">{bookingDetails.package.name} Package Included</span>
                </div>
              </div>
              
              <div className="bg-glass-white rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-space font-medium">Have a promo code?</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter promo code"
                      className="bg-glass-white border-white/20 text-white focus:border-neon-cyan w-40 md:w-auto"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button 
                      className="neo-border px-4 py-2 rounded-lg text-neon-cyan text-sm hover:bg-glass-white transition-all"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                {isPromoApplied && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-2 rounded-lg">
                    <i className="fas fa-check-circle"></i>
                    <span>15% discount applied with code SPACE2050</span>
                  </div>
                )}
              </div>
              
              <div className="bg-glass-white rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-space font-medium">Select Currency</h3>
                  
                  <div className="flex bg-space-dark/50 rounded-lg p-1">
                    {CURRENCIES.map(curr => (
                      <button
                        key={curr.value}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          currency === curr.value 
                            ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' 
                            : 'text-gray-300 hover:bg-glass-white'
                        }`}
                        onClick={() => setCurrency(curr.value)}
                      >
                        {curr.icon && <i className={`${curr.icon} mr-1`}></i>}
                        {curr.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-6">
              <h2 className="font-space font-medium text-xl mb-6 flex items-center gap-2">
                <i className="fas fa-credit-card text-neon-cyan"></i>
                Payment Method
              </h2>
              
              <Tabs defaultValue="credit_card" className="w-full" onValueChange={(value) => setPaymentMethod(value)}>
                <TabsList className="grid grid-cols-3 mb-6 bg-glass-white p-1 rounded-lg">
                  {PAYMENT_METHODS.map(method => (
                    <TabsTrigger 
                      key={method.value}
                      value={method.value} 
                      className={`px-4 py-3 rounded-md flex items-center justify-center gap-2 ${
                        paymentMethod === method.value 
                          ? 'bg-gradient-to-r from-neon-blue to-neon-magenta text-white' 
                          : 'text-gray-300'
                      }`}
                    >
                      <i className={method.icon}></i>
                      <span className="hidden md:inline">{method.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="credit_card" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="card_name">Name on Card</Label>
                      <Input 
                        id="card_name" 
                        placeholder="John Doe" 
                        className="bg-glass-white border-white/20 text-white focus:border-neon-cyan"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="card_number">Card Number</Label>
                      <Input 
                        id="card_number" 
                        placeholder="1234 5678 9012 3456"
                        className="bg-glass-white border-white/20 text-white focus:border-neon-cyan"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY"
                        className="bg-glass-white border-white/20 text-white focus:border-neon-cyan"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV Code</Label>
                      <Input 
                        id="cvv" 
                        placeholder="123"
                        className="bg-glass-white border-white/20 text-white focus:border-neon-cyan"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="save_card" 
                      checked={savePaymentInfo}
                      onCheckedChange={setSavePaymentInfo}
                    />
                    <Label htmlFor="save_card">Save card for future payments</Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="crypto" className="space-y-4">
                  <div className="text-center p-6 border border-dashed border-white/20 rounded-xl mb-4">
                    <div className="bg-space-dark/50 mx-auto w-40 h-40 rounded-lg flex items-center justify-center mb-4">
                      <i className={`fas fa-${currency === 'ETH' ? 'ethereum' : 'bitcoin'} text-4xl ${currency === 'ETH' ? 'text-blue-400' : 'text-orange-400'}`}></i>
                    </div>
                    <p className="text-neon-cyan mb-2">Send {formatPrice(totalAmount)} to:</p>
                    <p className="font-mono text-sm bg-glass-white p-2 rounded border border-white/10">
                      {currency === 'ETH' ? '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' : '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">Payment will be automatically confirmed once received</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="apple_pay" className="space-y-4">
                  <div className="text-center p-8">
                    <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 mx-auto">
                      <i className="fab fa-apple text-2xl"></i>
                      <span className="font-medium">Pay {formatPrice(totalAmount)}</span>
                    </button>
                    <p className="text-gray-400 text-sm mt-4">Click the button above to complete payment with Apple Pay</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6 bg-white/10" />
              
              <div className="flex items-start space-x-2 mb-6">
                <div className="mt-1">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-4 h-4 bg-space-dark border border-white/20 rounded focus:ring-neon-cyan"
                    checked={isAgreementChecked}
                    onChange={(e) => setIsAgreementChecked(e.target.checked)}
                  />
                </div>
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <span className="text-neon-cyan hover:underline cursor-pointer">Terms and Conditions</span> and <span className="text-neon-cyan hover:underline cursor-pointer">Space Travel Liability Waiver</span>. I confirm that I have read and understand the <span className="text-neon-cyan hover:underline cursor-pointer">Health Requirements</span> for space travel.
                </Label>
              </div>
              
              <motion.button 
                className="w-full bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-4 rounded-xl text-white font-space font-medium hover:shadow-lg hover:shadow-neon-magenta/30 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitPayment}
                disabled={createBooking.isPending}
              >
                {createBooking.isPending ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Pay {formatPrice(totalAmount)} Securely
                  </>
                )}
              </motion.button>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-lock"></i>
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-undo-alt"></i>
                  <span>Refundable*</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glassmorphism neo-border rounded-xl p-6 sticky top-24">
              <h2 className="font-space font-medium text-xl mb-6">Price Details</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price ({bookingDetails.passengers} Travelers)</span>
                  <span>{formatPrice(bookingDetails.basePrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">{bookingDetails.package.name}</span>
                  <span>{formatPrice(bookingDetails.package.price)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Space Insurance</span>
                  <span>{formatPrice(bookingDetails.insurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Taxes & Fees</span>
                  <span>{formatPrice(bookingDetails.taxes)}</span>
                </div>
                
                {isPromoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Promo Discount (15%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <Separator className="my-2 bg-white/10" />
                
                <div className="flex justify-between font-space font-medium text-lg">
                  <span>Total</span>
                  <span className="text-neon-cyan">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
              
              <div className="bg-space-dark/50 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-neon-cyan mt-1">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Flexible Booking</h3>
                    <p className="text-gray-400 text-sm">Free cancellation until 30 days before departure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-neon-cyan mt-1">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Insurance Included</h3>
                    <p className="text-gray-400 text-sm">Comprehensive space travel coverage</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-1 rounded-full bg-neon-cyan"></div>
                <h3 className="font-space font-medium">Need help?</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-glass-white hover:bg-white/20 p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-2 text-sm">
                  <i className="fas fa-comment-alt text-neon-cyan text-lg"></i>
                  <span>Live Chat</span>
                </button>
                
                <button className="bg-glass-white hover:bg-white/20 p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-2 text-sm">
                  <i className="fas fa-phone-alt text-neon-magenta text-lg"></i>
                  <span>Call Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Checkout;
