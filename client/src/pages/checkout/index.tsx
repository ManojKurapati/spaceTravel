import { useState, useEffect } from 'react';
import { useNavigate } from 'wouter';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { apiRequest } from '@/lib/queryClient';
import { formatCurrency } from '@/lib/utils';

// Form validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(8, { message: 'Valid phone number is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
  paymentMethod: z.enum(['card', 'crypto', 'bank']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cryptoAddress: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [currency, setCurrency] = useState<'AED' | 'USD' | 'BTC' | 'ETH'>('AED');
  
  // Exchange rates (mock data)
  const exchangeRates = {
    AED: 1,
    USD: 0.27,
    BTC: 0.0000028,
    ETH: 0.000042
  };
  
  // Form setup
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      paymentMethod: 'card',
      termsAccepted: false
    }
  });
  
  // Get booking data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // Redirect if no booking data
      toast({
        title: "No booking data found",
        description: "Please start your booking process from the beginning.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);
  
  // Watch payment method to conditionally render fields
  const paymentMethod = form.watch('paymentMethod');
  
  // Handle currency change
  const handleCurrencyChange = (newCurrency: 'AED' | 'USD' | 'BTC' | 'ETH') => {
    setCurrency(newCurrency);
  };
  
  // Format price based on selected currency
  const getFormattedPrice = (price: number) => {
    if (!price) return '0';
    
    switch (currency) {
      case 'USD':
        return `$${(price * exchangeRates.USD).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
      case 'BTC':
        return `₿${(price * exchangeRates.BTC).toLocaleString('en-US', { maximumFractionDigits: 8 })}`;
      case 'ETH':
        return `Ξ${(price * exchangeRates.ETH).toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
      default:
        return `${formatCurrency(price)} AED`;
    }
  };
  
  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    if (!bookingData) {
      toast({
        title: "No booking data found",
        description: "Please start your booking process from the beginning.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine form data with booking data
      const completeBookingData = {
        ...bookingData,
        travelerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          country: data.country
        },
        payment: {
          method: data.paymentMethod,
          currency: currency,
          totalAmount: bookingData.totalPrice,
          totalAmountInSelectedCurrency: bookingData.totalPrice * exchangeRates[currency]
        }
      };
      
      // Send booking data to server
      await apiRequest('POST', '/api/bookings', completeBookingData);
      
      // Clear booking data from session storage
      sessionStorage.removeItem('bookingData');
      
      // Show success message
      toast({
        title: "Booking Confirmed!",
        description: "Your space journey has been successfully booked. Check your email for details.",
      });
      
      // Create a mock NFT boarding pass
      const nftData = {
        name: `Dubai Spaceport - ${bookingData.destinationId.toUpperCase()} Journey`,
        description: `Boarding pass for journey on ${new Date(bookingData.date).toLocaleDateString()}`,
        image: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DSP-NFT-" + Date.now()
      };
      
      // Navigate to success page or dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!bookingData) {
    return (
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="glass rounded-xl p-10 text-center animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-grow py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="font-space text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
            Secure Checkout
          </span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Traveler Information */}
                <div className="glass rounded-xl p-6">
                  <h2 className="font-space text-xl font-bold mb-4">Traveler Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              type="email"
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="glass rounded-xl p-6">
                  <h2 className="font-space text-xl font-bold mb-4">Payment Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/70 mb-2">Select Currency</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        className={`glass p-2 rounded-lg text-center ${currency === 'AED' ? 'border-2 border-space-blue' : 'border border-white/20'}`}
                        onClick={() => handleCurrencyChange('AED')}
                      >
                        <div className="font-mono font-bold">AED</div>
                        <div className="text-xs text-white/50">Dirham</div>
                      </button>
                      <button
                        type="button"
                        className={`glass p-2 rounded-lg text-center ${currency === 'USD' ? 'border-2 border-space-blue' : 'border border-white/20'}`}
                        onClick={() => handleCurrencyChange('USD')}
                      >
                        <div className="font-mono font-bold">USD</div>
                        <div className="text-xs text-white/50">Dollar</div>
                      </button>
                      <button
                        type="button"
                        className={`glass p-2 rounded-lg text-center ${currency === 'BTC' ? 'border-2 border-space-blue' : 'border border-white/20'}`}
                        onClick={() => handleCurrencyChange('BTC')}
                      >
                        <div className="font-mono font-bold">BTC</div>
                        <div className="text-xs text-white/50">Bitcoin</div>
                      </button>
                      <button
                        type="button"
                        className={`glass p-2 rounded-lg text-center ${currency === 'ETH' ? 'border-2 border-space-blue' : 'border border-white/20'}`}
                        onClick={() => handleCurrencyChange('ETH')}
                      >
                        <div className="font-mono font-bold">ETH</div>
                        <div className="text-xs text-white/50">Ethereum</div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                            <div 
                              className={`glass p-4 rounded-lg cursor-pointer text-center transition-colors ${field.value === 'card' ? 'border-2 border-space-blue' : 'border border-white/20 hover:border-white/40'}`}
                              onClick={() => form.setValue('paymentMethod', 'card')}
                            >
                              <div className="w-10 h-10 rounded-full bg-space-blue/20 border border-space-blue/50 flex items-center justify-center mx-auto mb-2">
                                <i className="fas fa-credit-card text-space-blue"></i>
                              </div>
                              <div className="font-medium">Credit Card</div>
                            </div>
                            
                            <div 
                              className={`glass p-4 rounded-lg cursor-pointer text-center transition-colors ${field.value === 'crypto' ? 'border-2 border-space-purple' : 'border border-white/20 hover:border-white/40'}`}
                              onClick={() => form.setValue('paymentMethod', 'crypto')}
                            >
                              <div className="w-10 h-10 rounded-full bg-space-purple/20 border border-space-purple/50 flex items-center justify-center mx-auto mb-2">
                                <i className="fab fa-bitcoin text-space-purple"></i>
                              </div>
                              <div className="font-medium">Cryptocurrency</div>
                            </div>
                            
                            <div 
                              className={`glass p-4 rounded-lg cursor-pointer text-center transition-colors ${field.value === 'bank' ? 'border-2 border-space-pink' : 'border border-white/20 hover:border-white/40'}`}
                              onClick={() => form.setValue('paymentMethod', 'bank')}
                            >
                              <div className="w-10 h-10 rounded-full bg-space-pink/20 border border-space-pink/50 flex items-center justify-center mx-auto mb-2">
                                <i className="fas fa-university text-space-pink"></i>
                              </div>
                              <div className="font-medium">Bank Transfer</div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Conditional payment fields based on selected method */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                placeholder="4242 4242 4242 4242"
                                className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <input 
                                  {...field} 
                                  placeholder="MM/YY"
                                  className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <input 
                                  {...field} 
                                  placeholder="123"
                                  className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'crypto' && (
                    <div className="space-y-4">
                      <div className="glass p-4 rounded-lg bg-space-purple/10 border border-space-purple/30">
                        <div className="flex items-center mb-3">
                          <i className="fas fa-info-circle text-space-purple mr-2"></i>
                          <div className="text-sm">
                            Send exactly <span className="font-mono font-bold">{getFormattedPrice(bookingData.totalPrice)}</span> to the address below
                          </div>
                        </div>
                        <div className="bg-black/30 p-3 rounded-lg font-mono text-sm break-all">
                          {currency === 'BTC' ? '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="cryptoAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your {currency} Wallet Address (for refunds)</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                className="glass w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-space-blue/50 focus:ring-0" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div className="glass p-4 rounded-lg bg-space-pink/10 border border-space-pink/30">
                      <div className="text-sm mb-4">
                        Please transfer <span className="font-mono font-bold">{getFormattedPrice(bookingData.totalPrice)}</span> to the following bank account:
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Bank Name:</span>
                          <span className="font-medium">Dubai Space Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Account Name:</span>
                          <span className="font-medium">Dubai Spaceport LLC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">IBAN:</span>
                          <span className="font-mono">AE07 0331 2345 6789 0123 456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">SWIFT/BIC:</span>
                          <span className="font-mono">DSBAEADD</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Reference:</span>
                          <span className="font-mono">DSP-{Date.now().toString().slice(-8)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Terms and Conditions */}
                <div className="glass rounded-xl p-6">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <input 
                            type="checkbox" 
                            className="mt-1"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="text-white">I accept the Terms and Conditions</FormLabel>
                          <p className="text-white/60 text-sm mt-1">
                            By checking this box, you acknowledge that you have read and agree to our{' '}
                            <a href="/terms" className="text-space-blue hover:underline">Terms of Service</a>,{' '}
                            <a href="/privacy" className="text-space-blue hover:underline">Privacy Policy</a>, and{' '}
                            <a href="/space-travel" className="text-space-blue hover:underline">Space Travel Regulations</a>.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-space-blue to-space-purple rounded-lg font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    'Complete Booking'
                  )}
                </button>
              </form>
            </Form>
          </motion.div>
          
          {/* Order summary */}
          <motion.div 
            className="glass rounded-xl p-6 h-fit sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-space text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-white/70">Destination</div>
                <div className="font-medium">{bookingData.destinationId.replace(/-/g, ' ').toUpperCase()}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Travel Date</div>
                <div className="font-medium">{new Date(bookingData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Passengers</div>
                <div className="font-medium">{bookingData.passengers}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/70">Cabin Class</div>
                <div className="font-medium">{bookingData.cabinClass.charAt(0).toUpperCase() + bookingData.cabinClass.slice(1)}</div>
              </div>
              
              {bookingData.addons && bookingData.addons.length > 0 && (
                <>
                  <div className="border-t border-white/10 pt-4 pb-2">
                    <div className="font-medium mb-2">Add-ons</div>
                    {bookingData.addons.map((addon: string, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm py-1">
                        <div className="text-white/70">Add-on {index + 1}</div>
                        <div>Included</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="border-t border-white/10 pt-4 flex justify-between items-center font-space text-xl font-bold">
                <div>Total</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
                  {getFormattedPrice(bookingData.totalPrice)}
                </div>
              </div>
            </div>
            
            <div className="glass p-4 rounded-lg bg-space-blue/10 border border-space-blue/30 space-y-2">
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-space-blue mr-2"></i>
                <div className="text-sm font-medium">Secure Checkout</div>
              </div>
              <p className="text-xs text-white/70">
                All transactions are secured with quantum encryption. Your payment information is never stored on our servers.
              </p>
            </div>
            
            <div className="mt-4 flex justify-center space-x-3">
              <i className="fab fa-cc-visa text-2xl text-white/70"></i>
              <i className="fab fa-cc-mastercard text-2xl text-white/70"></i>
              <i className="fab fa-cc-amex text-2xl text-white/70"></i>
              <i className="fab fa-bitcoin text-2xl text-white/70"></i>
              <i className="fab fa-ethereum text-2xl text-white/70"></i>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
