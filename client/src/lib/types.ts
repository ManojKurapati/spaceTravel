import { Destination, SeatClass, ExperiencePackage, Booking, Accommodation, ChatMessage } from '@shared/schema';

// Extended types used in frontend components
export interface DestinationWithDetails extends Destination {
  imageUrl: string;
}

export interface BookingWithDetails extends Booking {
  destination: {
    name: string;
    location: string;
    description?: string;
    distanceKm?: number;
    travelDuration?: string;
  };
  seatClass: {
    name: string;
    description?: string;
    amenities?: string[];
  };
  package?: {
    name: string;
    description?: string;
    features?: string[];
  };
  flightNumber?: string;
  boardingGate?: string;
  launchPad?: string;
  spaceshipName?: string;
  boardingTime?: Date;
  checkInTime?: Date;
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isAvailable: boolean;
}

export interface PaymentMethod {
  value: string;
  label: string;
  icon: string;
}

export interface Currency {
  value: string;
  label: string;
  icon?: string;
  symbol?: string;
}

// Countdown timer type
export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// AI Concierge types
export interface AIResponse {
  message: string;
  options?: string[];
}

// Form types
export interface BookingFormData {
  destination: string;
  seatClass: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: number;
  packageId?: number;
}

export interface PaymentFormData {
  cardName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  savePaymentInfo?: boolean;
  walletAddress?: string;
  currency: string;
  paymentMethod: string;
  agreeToTerms: boolean;
}

// Animation variants
export interface AnimationVariants {
  hidden: object;
  show: object;
}
