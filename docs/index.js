// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// client/src/lib/constants.ts
var DESTINATIONS = [
  {
    id: 1,
    name: "International Space Station",
    location: "Low Earth Orbit \xB7 400 km",
    description: "Experience life aboard humanity's outpost in low Earth orbit. Enjoy stunning views of our planet and participate in scientific experiments.",
    distanceKm: 400,
    travelDuration: "3 days",
    rating: 4.8,
    basePrice: 12500,
    imageUrl: ""
  },
  {
    id: 2,
    name: "Lunar Hotels",
    location: "Sea of Tranquility \xB7 Moon",
    description: "Stay in luxury accommodations on the lunar surface with Earth views. Experience low gravity activities and explore the historic Apollo landing sites.",
    distanceKm: 384400,
    travelDuration: "5 days",
    rating: 4.9,
    basePrice: 45e3,
    imageUrl: ""
  },
  {
    id: 3,
    name: "Mars Colony Alpha",
    location: "Arcadia Planitia \xB7 Mars",
    description: "Visit the first human settlement on the Red Planet. Explore Martian landscapes, drive rovers, and experience life on another world.",
    distanceKm: 7834e4,
    travelDuration: "14 days",
    rating: 4.1,
    basePrice: 12e4,
    imageUrl: ""
  },
  {
    id: 4,
    name: "Orbit Resorts",
    location: "Geostationary Orbit \xB7 Earth",
    description: "Relax in our premium orbital hotel with 360\xB0 views of Earth. Enjoy zero-gravity spa treatments and gourmet dining among the stars.",
    distanceKm: 35786,
    travelDuration: "7 days",
    rating: 5,
    basePrice: 78e3,
    imageUrl: ""
  }
];
var SEAT_CLASSES = [
  {
    id: 1,
    name: "Luxury Cabin",
    description: "Premium experience with personal AI assistant",
    priceMultiplier: 1.5,
    icon: "star"
  },
  {
    id: 2,
    name: "Economy Shuttle",
    description: "Standard comfortable space travel",
    priceMultiplier: 1,
    icon: "rocket"
  },
  {
    id: 3,
    name: "VIP Zero-Gravity Experience",
    description: "Premium suite with exclusive zero-G lounge",
    priceMultiplier: 2,
    icon: "crown"
  }
];
var EXPERIENCE_PACKAGES = [
  {
    id: 1,
    name: "Moonlight Honeymoon",
    description: "Perfect for couples celebrating love",
    basePrice: 95e3,
    features: [
      "Private lunar suite with Earth view",
      "Champagne dinner in zero gravity",
      "Couples spacewalk experience",
      "Personalized NFT marriage certificate"
    ],
    icon: "heart",
    accentColor: "from-neon-cyan to-neon-magenta"
  },
  {
    id: 2,
    name: "Mars Explorer Pro",
    description: "Ultimate adventure for thrill-seekers",
    basePrice: 185e3,
    features: [
      "7-day Mars surface expedition",
      "Martian rover driving experience",
      "Olympus Mons base camp visit",
      "Advanced life support training"
    ],
    icon: "mountain",
    accentColor: "from-neon-blue to-neon-cyan"
  },
  {
    id: 3,
    name: "Zero-G Luxury Retreat",
    description: "Relaxation beyond Earth's gravity",
    basePrice: 11e4,
    features: [
      "Orbital spa and wellness center",
      "Michelin-star space cuisine",
      "Celestial yoga and meditation",
      "Earth observation panoramic suite"
    ],
    icon: "spa",
    accentColor: "from-neon-cyan to-neon-cyan"
  }
];
var ACCOMMODATIONS = [
  {
    id: 1,
    destinationId: 2,
    // Lunar Hotels
    name: "Tranquility Suite",
    description: "Our premium suite with panoramic Earth views",
    pricePerNight: 15e3,
    amenities: ["Earth View Windows", "AI Butler", "Private Dining", "Zero-G Sleeping Chamber"],
    rating: 4.9,
    gravitySimulation: true,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: true
  },
  {
    id: 2,
    destinationId: 3,
    // Mars Colony
    name: "Olympus Habitat",
    description: "Martian living quarters with all amenities",
    pricePerNight: 18e3,
    amenities: ["Martian View", "Artificial Gravity", "Research Access", "VR Entertainment"],
    rating: 4.5,
    gravitySimulation: true,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: false
  },
  {
    id: 3,
    destinationId: 4,
    // Orbit Resorts
    name: "Orbital Observatory",
    description: "Luxury zero-G suite with Earth observation deck",
    pricePerNight: 22e3,
    amenities: ["360\xB0 Earth Views", "Zero-G Spa", "Gourmet Dining", "Space Walk Access"],
    rating: 5,
    gravitySimulation: false,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: true
  }
];

// server/storage.ts
var MemStorage = class {
  users;
  destinations;
  seatClasses;
  experiencePackages;
  bookings;
  accommodations;
  chatMessages;
  currentUserId;
  currentDestinationId;
  currentSeatClassId;
  currentPackageId;
  currentBookingId;
  currentAccommodationId;
  currentChatMessageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.destinations = /* @__PURE__ */ new Map();
    this.seatClasses = /* @__PURE__ */ new Map();
    this.experiencePackages = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.accommodations = /* @__PURE__ */ new Map();
    this.chatMessages = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentSeatClassId = 1;
    this.currentPackageId = 1;
    this.currentBookingId = 1;
    this.currentAccommodationId = 1;
    this.currentChatMessageId = 1;
    this.initializeSampleData();
  }
  // Initialize sample data
  initializeSampleData() {
    DESTINATIONS.forEach((dest) => {
      this.destinations.set(dest.id, {
        ...dest,
        id: dest.id,
        description: dest.description || null,
        distanceKm: dest.distanceKm || null,
        travelDuration: dest.travelDuration || null,
        imageUrl: dest.imageUrl || null,
        rating: dest.rating || 4,
        basePrice: dest.basePrice
      });
      this.currentDestinationId = Math.max(this.currentDestinationId, dest.id + 1);
    });
    SEAT_CLASSES.forEach((sc) => {
      this.seatClasses.set(sc.id, {
        ...sc,
        id: sc.id,
        description: sc.description || null,
        icon: sc.icon || null
      });
      this.currentSeatClassId = Math.max(this.currentSeatClassId, sc.id + 1);
    });
    EXPERIENCE_PACKAGES.forEach((pkg) => {
      this.experiencePackages.set(pkg.id, {
        ...pkg,
        id: pkg.id,
        features: pkg.features || [],
        icon: pkg.icon || null,
        accentColor: pkg.accentColor || null
      });
      this.currentPackageId = Math.max(this.currentPackageId, pkg.id + 1);
    });
    ACCOMMODATIONS.forEach((acc) => {
      this.accommodations.set(acc.id, {
        ...acc,
        id: acc.id,
        amenities: acc.amenities || [],
        imageUrl: null,
        rating: acc.rating || 4
      });
      this.currentAccommodationId = Math.max(this.currentAccommodationId, acc.id + 1);
    });
    const sampleBooking = {
      id: 1,
      userId: 1,
      destinationId: 2,
      // Lunar Hotels
      seatClassId: 1,
      // Luxury Cabin
      departureDate: /* @__PURE__ */ new Date("2050-08-20T14:15:00"),
      returnDate: /* @__PURE__ */ new Date("2050-08-25T19:30:00"),
      packageId: 1,
      // Moonlight Honeymoon
      totalPrice: 14e4,
      currency: "AED",
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: /* @__PURE__ */ new Date("2050-05-10T09:23:00")
    };
    this.bookings.set(1, sampleBooking);
    this.currentBookingId = 2;
    const sampleMessages = [
      {
        id: 1,
        userId: 1,
        isUserMessage: false,
        message: "Hello! I'm NOVA, your AI space travel assistant. How can I help plan your cosmic journey today?",
        timestamp: /* @__PURE__ */ new Date()
      },
      {
        id: 2,
        userId: 1,
        isUserMessage: true,
        message: "I'm interested in visiting the Mars Colony. What's the best time to go?",
        timestamp: /* @__PURE__ */ new Date()
      },
      {
        id: 3,
        userId: 1,
        isUserMessage: false,
        message: "Great choice! For Mars Colony Alpha, I recommend scheduling your trip during the Martian Summer (July-September 2050), when temperatures are milder and dust storms are less frequent. The Mars Explorer Pro package is particularly popular during this period.",
        timestamp: /* @__PURE__ */ new Date()
      },
      {
        id: 4,
        userId: 1,
        isUserMessage: false,
        message: "Would you like me to check available dates for this timeframe?",
        timestamp: /* @__PURE__ */ new Date()
      },
      {
        id: 5,
        userId: 1,
        isUserMessage: true,
        message: "Yes, please check August availability and what's included in the Mars Explorer Pro package.",
        timestamp: /* @__PURE__ */ new Date()
      }
    ];
    sampleMessages.forEach((msg) => {
      this.chatMessages.set(msg.id, msg);
    });
    this.currentChatMessageId = 6;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Destination methods
  async getAllDestinations() {
    return Array.from(this.destinations.values());
  }
  async getDestination(id) {
    return this.destinations.get(id);
  }
  async createDestination(insertDestination) {
    const id = this.currentDestinationId++;
    const destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  // Seat Class methods
  async getAllSeatClasses() {
    return Array.from(this.seatClasses.values());
  }
  async getSeatClass(id) {
    return this.seatClasses.get(id);
  }
  async createSeatClass(insertSeatClass) {
    const id = this.currentSeatClassId++;
    const seatClass = { ...insertSeatClass, id };
    this.seatClasses.set(id, seatClass);
    return seatClass;
  }
  // Experience Package methods
  async getAllExperiencePackages() {
    return Array.from(this.experiencePackages.values());
  }
  async getExperiencePackage(id) {
    return this.experiencePackages.get(id);
  }
  async createExperiencePackage(insertExperiencePackage) {
    const id = this.currentPackageId++;
    const experiencePackage = { ...insertExperiencePackage, id };
    this.experiencePackages.set(id, experiencePackage);
    return experiencePackage;
  }
  // Booking methods
  async getAllBookings() {
    return Array.from(this.bookings.values());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = this.currentBookingId++;
    const createdAt = /* @__PURE__ */ new Date();
    const booking = { ...insertBooking, id, createdAt };
    this.bookings.set(id, booking);
    return booking;
  }
  async updateBooking(id, bookingData) {
    const booking = this.bookings.get(id);
    if (!booking) {
      return void 0;
    }
    const updatedBooking = { ...booking, ...bookingData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  // Accommodation methods
  async getAllAccommodations() {
    return Array.from(this.accommodations.values());
  }
  async getAccommodation(id) {
    return this.accommodations.get(id);
  }
  async getAccommodationsByDestination(destinationId) {
    return Array.from(this.accommodations.values()).filter(
      (accommodation) => accommodation.destinationId === destinationId
    );
  }
  async createAccommodation(insertAccommodation) {
    const id = this.currentAccommodationId++;
    const accommodation = { ...insertAccommodation, id };
    this.accommodations.set(id, accommodation);
    return accommodation;
  }
  // Chat Message methods
  async getAllChatMessages() {
    return Array.from(this.chatMessages.values()).sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
  }
  async createChatMessage(insertChatMessage) {
    const id = this.currentChatMessageId++;
    const timestamp2 = /* @__PURE__ */ new Date();
    const chatMessage = { ...insertChatMessage, id, timestamp: timestamp2 };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp, real, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email")
});
var destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  distanceKm: real("distance_km"),
  travelDuration: text("travel_duration"),
  imageUrl: text("image_url"),
  rating: real("rating"),
  basePrice: integer("base_price").notNull()
});
var seatClasses = pgTable("seat_classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  priceMultiplier: real("price_multiplier").notNull(),
  icon: text("icon")
});
var experiencePackages = pgTable("experience_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: integer("base_price").notNull(),
  features: json("features").notNull(),
  icon: text("icon"),
  accentColor: text("accent_color")
});
var bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  destinationId: integer("destination_id").notNull(),
  seatClassId: integer("seat_class_id").notNull(),
  departureDate: timestamp("departure_date").notNull(),
  returnDate: timestamp("return_date"),
  packageId: integer("package_id"),
  totalPrice: integer("total_price").notNull(),
  currency: text("currency").notNull().default("AED"),
  status: text("status").notNull().default("pending"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  destinationId: integer("destination_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  pricePerNight: integer("price_per_night").notNull(),
  amenities: json("amenities"),
  rating: real("rating"),
  imageUrl: text("image_url"),
  gravitySimulation: boolean("gravity_simulation").default(false),
  windowViews: boolean("window_views").default(false),
  aiAssistant: boolean("ai_assistant").default(false),
  stargazingDeck: boolean("stargazing_deck").default(false)
});
var chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  isUserMessage: boolean("is_user_message").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow()
});
var insertUserSchema = createInsertSchema(users);
var insertDestinationSchema = createInsertSchema(destinations);
var insertSeatClassSchema = createInsertSchema(seatClasses);
var insertExperiencePackageSchema = createInsertSchema(experiencePackages);
var insertBookingSchema = createInsertSchema(bookings);
var insertAccommodationSchema = createInsertSchema(accommodations);
var insertChatMessageSchema = createInsertSchema(chatMessages);

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/destinations", async (req, res) => {
    try {
      const destinations2 = await storage.getAllDestinations();
      res.json(destinations2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });
  app2.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });
  app2.post("/api/destinations", async (req, res) => {
    try {
      const destinationData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(destinationData);
      res.status(201).json(destination);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid destination data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create destination" });
    }
  });
  app2.get("/api/seat-classes", async (req, res) => {
    try {
      const seatClasses2 = await storage.getAllSeatClasses();
      res.json(seatClasses2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seat classes" });
    }
  });
  app2.get("/api/seat-classes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const seatClass = await storage.getSeatClass(id);
      if (!seatClass) {
        return res.status(404).json({ message: "Seat class not found" });
      }
      res.json(seatClass);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seat class" });
    }
  });
  app2.post("/api/seat-classes", async (req, res) => {
    try {
      const seatClassData = insertSeatClassSchema.parse(req.body);
      const seatClass = await storage.createSeatClass(seatClassData);
      res.status(201).json(seatClass);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid seat class data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create seat class" });
    }
  });
  app2.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllExperiencePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });
  app2.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experiencePackage = await storage.getExperiencePackage(id);
      if (!experiencePackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(experiencePackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });
  app2.post("/api/packages", async (req, res) => {
    try {
      const packageData = insertExperiencePackageSchema.parse(req.body);
      const experiencePackage = await storage.createExperiencePackage(packageData);
      res.status(201).json(experiencePackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid package data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create package" });
    }
  });
  app2.get("/api/bookings", async (req, res) => {
    try {
      const bookings2 = await storage.getAllBookings();
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });
  app2.patch("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const bookingData = req.body;
      const updatedBooking = await storage.updateBooking(id, bookingData);
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking" });
    }
  });
  app2.get("/api/accommodations", async (req, res) => {
    try {
      const accommodations2 = await storage.getAllAccommodations();
      res.json(accommodations2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accommodations" });
    }
  });
  app2.get("/api/destinations/:destinationId/accommodations", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const accommodations2 = await storage.getAccommodationsByDestination(destinationId);
      res.json(accommodations2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accommodations" });
    }
  });
  app2.post("/api/accommodations", async (req, res) => {
    try {
      const accommodationData = insertAccommodationSchema.parse(req.body);
      const accommodation = await storage.createAccommodation(accommodationData);
      res.status(201).json(accommodation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid accommodation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create accommodation" });
    }
  });
  app2.get("/api/chat-messages", async (req, res) => {
    try {
      const messages = await storage.getAllChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });
  app2.post("/api/chat-messages", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
