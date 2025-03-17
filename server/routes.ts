import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDestinationSchema, 
  insertSeatClassSchema, 
  insertExperiencePackageSchema, 
  insertBookingSchema, 
  insertAccommodationSchema,
  insertChatMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Get destination by ID
  app.get("/api/destinations/:id", async (req, res) => {
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

  // Create a new destination
  app.post("/api/destinations", async (req, res) => {
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

  // Get all seat classes
  app.get("/api/seat-classes", async (req, res) => {
    try {
      const seatClasses = await storage.getAllSeatClasses();
      res.json(seatClasses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seat classes" });
    }
  });

  // Get seat class by ID
  app.get("/api/seat-classes/:id", async (req, res) => {
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

  // Create a new seat class
  app.post("/api/seat-classes", async (req, res) => {
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

  // Get all experience packages
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllExperiencePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  // Get experience package by ID
  app.get("/api/packages/:id", async (req, res) => {
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

  // Create a new experience package
  app.post("/api/packages", async (req, res) => {
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

  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
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

  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
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

  // Update a booking
  app.patch("/api/bookings/:id", async (req, res) => {
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

  // Get all accommodations
  app.get("/api/accommodations", async (req, res) => {
    try {
      const accommodations = await storage.getAllAccommodations();
      res.json(accommodations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accommodations" });
    }
  });

  // Get accommodations by destination ID
  app.get("/api/destinations/:destinationId/accommodations", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const accommodations = await storage.getAccommodationsByDestination(destinationId);
      res.json(accommodations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accommodations" });
    }
  });

  // Create a new accommodation
  app.post("/api/accommodations", async (req, res) => {
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

  // Get all chat messages
  app.get("/api/chat-messages", async (req, res) => {
    try {
      const messages = await storage.getAllChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Create a new chat message
  app.post("/api/chat-messages", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
