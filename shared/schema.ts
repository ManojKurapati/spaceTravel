import { pgTable, text, serial, integer, timestamp, real, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  distanceKm: real("distance_km"),
  travelDuration: text("travel_duration"),
  imageUrl: text("image_url"),
  rating: real("rating"),
  basePrice: integer("base_price").notNull(),
});

export const seatClasses = pgTable("seat_classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  priceMultiplier: real("price_multiplier").notNull(),
  icon: text("icon"),
});

export const experiencePackages = pgTable("experience_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: integer("base_price").notNull(),
  features: json("features").notNull(),
  icon: text("icon"),
  accentColor: text("accent_color"),
});

export const bookings = pgTable("bookings", {
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const accommodations = pgTable("accommodations", {
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
  stargazingDeck: boolean("stargazing_deck").default(false),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  isUserMessage: boolean("is_user_message").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertDestinationSchema = createInsertSchema(destinations);
export const insertSeatClassSchema = createInsertSchema(seatClasses);
export const insertExperiencePackageSchema = createInsertSchema(experiencePackages);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertAccommodationSchema = createInsertSchema(accommodations);
export const insertChatMessageSchema = createInsertSchema(chatMessages);

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type SeatClass = typeof seatClasses.$inferSelect;
export type InsertSeatClass = z.infer<typeof insertSeatClassSchema>;

export type ExperiencePackage = typeof experiencePackages.$inferSelect;
export type InsertExperiencePackage = z.infer<typeof insertExperiencePackageSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Accommodation = typeof accommodations.$inferSelect;
export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
