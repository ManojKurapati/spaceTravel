import { 
  users,
  destinations,
  seatClasses,
  experiencePackages,
  bookings,
  accommodations,
  chatMessages,
  type User,
  type InsertUser,
  type Destination,
  type InsertDestination,
  type SeatClass,
  type InsertSeatClass,
  type ExperiencePackage,
  type InsertExperiencePackage,
  type Booking,
  type InsertBooking,
  type Accommodation,
  type InsertAccommodation,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { DESTINATIONS, SEAT_CLASSES, EXPERIENCE_PACKAGES, ACCOMMODATIONS } from "../client/src/lib/constants";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destination methods
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Seat Class methods
  getAllSeatClasses(): Promise<SeatClass[]>;
  getSeatClass(id: number): Promise<SeatClass | undefined>;
  createSeatClass(seatClass: InsertSeatClass): Promise<SeatClass>;
  
  // Experience Package methods
  getAllExperiencePackages(): Promise<ExperiencePackage[]>;
  getExperiencePackage(id: number): Promise<ExperiencePackage | undefined>;
  createExperiencePackage(experiencePackage: InsertExperiencePackage): Promise<ExperiencePackage>;
  
  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking | undefined>;
  
  // Accommodation methods
  getAllAccommodations(): Promise<Accommodation[]>;
  getAccommodation(id: number): Promise<Accommodation | undefined>;
  getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]>;
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;
  
  // Chat Message methods
  getAllChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(chatMessage: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private seatClasses: Map<number, SeatClass>;
  private experiencePackages: Map<number, ExperiencePackage>;
  private bookings: Map<number, Booking>;
  private accommodations: Map<number, Accommodation>;
  private chatMessages: Map<number, ChatMessage>;
  
  currentUserId: number;
  currentDestinationId: number;
  currentSeatClassId: number;
  currentPackageId: number;
  currentBookingId: number;
  currentAccommodationId: number;
  currentChatMessageId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.seatClasses = new Map();
    this.experiencePackages = new Map();
    this.bookings = new Map();
    this.accommodations = new Map();
    this.chatMessages = new Map();
    
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentSeatClassId = 1;
    this.currentPackageId = 1;
    this.currentBookingId = 1;
    this.currentAccommodationId = 1;
    this.currentChatMessageId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Initialize sample data
  private initializeSampleData() {
    // Add sample destinations
    DESTINATIONS.forEach(dest => {
      this.destinations.set(dest.id, {
        ...dest,
        id: dest.id,
        description: dest.description || null,
        distanceKm: dest.distanceKm || null,
        travelDuration: dest.travelDuration || null,
        imageUrl: dest.imageUrl || null,
        rating: dest.rating || 4.0,
        basePrice: dest.basePrice
      });
      this.currentDestinationId = Math.max(this.currentDestinationId, dest.id + 1);
    });
    
    // Add sample seat classes
    SEAT_CLASSES.forEach(sc => {
      this.seatClasses.set(sc.id, {
        ...sc,
        id: sc.id,
        description: sc.description || null,
        icon: sc.icon || null
      });
      this.currentSeatClassId = Math.max(this.currentSeatClassId, sc.id + 1);
    });
    
    // Add sample experience packages
    EXPERIENCE_PACKAGES.forEach(pkg => {
      this.experiencePackages.set(pkg.id, {
        ...pkg,
        id: pkg.id,
        features: pkg.features || [],
        icon: pkg.icon || null,
        accentColor: pkg.accentColor || null
      });
      this.currentPackageId = Math.max(this.currentPackageId, pkg.id + 1);
    });
    
    // Add sample accommodations
    ACCOMMODATIONS.forEach(acc => {
      this.accommodations.set(acc.id, {
        ...acc,
        id: acc.id,
        amenities: acc.amenities || [],
        imageUrl: null,
        rating: acc.rating || 4.0
      });
      this.currentAccommodationId = Math.max(this.currentAccommodationId, acc.id + 1);
    });
    
    // Add a sample booking
    const sampleBooking: Booking = {
      id: 1,
      userId: 1,
      destinationId: 2, // Lunar Hotels
      seatClassId: 1, // Luxury Cabin
      departureDate: new Date('2050-08-20T14:15:00'),
      returnDate: new Date('2050-08-25T19:30:00'),
      packageId: 1, // Moonlight Honeymoon
      totalPrice: 140000,
      currency: 'AED',
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date('2050-05-10T09:23:00')
    };
    this.bookings.set(1, sampleBooking);
    this.currentBookingId = 2;
    
    // Add sample chat messages
    const sampleMessages: ChatMessage[] = [
      {
        id: 1,
        userId: 1,
        isUserMessage: false,
        message: "Hello! I'm NOVA, your AI space travel assistant. How can I help plan your cosmic journey today?",
        timestamp: new Date()
      },
      {
        id: 2,
        userId: 1,
        isUserMessage: true,
        message: "I'm interested in visiting the Mars Colony. What's the best time to go?",
        timestamp: new Date()
      },
      {
        id: 3,
        userId: 1,
        isUserMessage: false,
        message: "Great choice! For Mars Colony Alpha, I recommend scheduling your trip during the Martian Summer (July-September 2050), when temperatures are milder and dust storms are less frequent. The Mars Explorer Pro package is particularly popular during this period.",
        timestamp: new Date()
      },
      {
        id: 4,
        userId: 1,
        isUserMessage: false,
        message: "Would you like me to check available dates for this timeframe?",
        timestamp: new Date()
      },
      {
        id: 5,
        userId: 1,
        isUserMessage: true,
        message: "Yes, please check August availability and what's included in the Mars Explorer Pro package.",
        timestamp: new Date()
      }
    ];
    
    sampleMessages.forEach(msg => {
      this.chatMessages.set(msg.id, msg);
    });
    this.currentChatMessageId = 6;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Destination methods
  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Seat Class methods
  async getAllSeatClasses(): Promise<SeatClass[]> {
    return Array.from(this.seatClasses.values());
  }
  
  async getSeatClass(id: number): Promise<SeatClass | undefined> {
    return this.seatClasses.get(id);
  }
  
  async createSeatClass(insertSeatClass: InsertSeatClass): Promise<SeatClass> {
    const id = this.currentSeatClassId++;
    const seatClass: SeatClass = { ...insertSeatClass, id };
    this.seatClasses.set(id, seatClass);
    return seatClass;
  }
  
  // Experience Package methods
  async getAllExperiencePackages(): Promise<ExperiencePackage[]> {
    return Array.from(this.experiencePackages.values());
  }
  
  async getExperiencePackage(id: number): Promise<ExperiencePackage | undefined> {
    return this.experiencePackages.get(id);
  }
  
  async createExperiencePackage(insertExperiencePackage: InsertExperiencePackage): Promise<ExperiencePackage> {
    const id = this.currentPackageId++;
    const experiencePackage: ExperiencePackage = { ...insertExperiencePackage, id };
    this.experiencePackages.set(id, experiencePackage);
    return experiencePackage;
  }
  
  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const createdAt = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt };
    this.bookings.set(id, booking);
    return booking;
  }
  
  async updateBooking(id: number, bookingData: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    
    if (!booking) {
      return undefined;
    }
    
    const updatedBooking = { ...booking, ...bookingData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  
  // Accommodation methods
  async getAllAccommodations(): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values());
  }
  
  async getAccommodation(id: number): Promise<Accommodation | undefined> {
    return this.accommodations.get(id);
  }
  
  async getAccommodationsByDestination(destinationId: number): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values()).filter(
      (accommodation) => accommodation.destinationId === destinationId
    );
  }
  
  async createAccommodation(insertAccommodation: InsertAccommodation): Promise<Accommodation> {
    const id = this.currentAccommodationId++;
    const accommodation: Accommodation = { ...insertAccommodation, id };
    this.accommodations.set(id, accommodation);
    return accommodation;
  }
  
  // Chat Message methods
  async getAllChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
  }
  
  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const timestamp = new Date();
    const chatMessage: ChatMessage = { ...insertChatMessage, id, timestamp };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
}

export const storage = new MemStorage();
