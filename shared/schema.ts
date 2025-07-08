import { pgTable, text, serial, integer, boolean, jsonb, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"), // admin, store_owner
});

export const storeTemplates = pgTable("store_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // sorveteria, acai, lanchonete, pizzaria, cafe, farmacia
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  config: jsonb("config").notNull(), // Template configuration
  isActive: boolean("is_active").notNull().default(true),
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").references(() => users.id),
  templateId: integer("template_id").references(() => storeTemplates.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  accessCode: text("access_code").notNull().unique(),
  description: text("description"),
  whatsapp: text("whatsapp").notNull(),
  instagram: text("instagram"),
  email: text("email"),
  address: text("address"),
  location: text("location"), // Google Maps location
  pixKey: text("pix_key"),
  enablePixQR: boolean("enable_pix_qr").default(false),
  config: jsonb("config").notNull(), // Store customization
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  items: jsonb("items").notNull(), // Array of {productId, name, price, quantity}
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, preparing, delivered, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id),
  date: text("date").notNull(), // YYYY-MM-DD format
  sales: decimal("sales", { precision: 10, scale: 2 }).notNull().default("0"),
  orderCount: integer("order_count").notNull().default(0),
  avgTicket: decimal("avg_ticket", { precision: 10, scale: 2 }).notNull().default("0"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertStoreTemplateSchema = createInsertSchema(storeTemplates).omit({ id: true });
export const insertStoreSchema = createInsertSchema(stores).omit({ id: true, createdAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertAnalyticsSchema = createInsertSchema(analytics).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type StoreTemplate = typeof storeTemplates.$inferSelect;
export type InsertStoreTemplate = z.infer<typeof insertStoreTemplateSchema>;

export type Store = typeof stores.$inferSelect;
export type InsertStore = z.infer<typeof insertStoreSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
