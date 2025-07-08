import { 
  users, stores, storeTemplates, categories, products, orders, analytics,
  type User, type InsertUser, 
  type Store, type InsertStore,
  type StoreTemplate, type InsertStoreTemplate,
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type Analytics, type InsertAnalytics
} from "@shared/schema";

import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Store Templates
  getStoreTemplates(): Promise<StoreTemplate[]>;
  getStoreTemplate(id: number): Promise<StoreTemplate | undefined>;
  createStoreTemplate(template: InsertStoreTemplate): Promise<StoreTemplate>;

  // Stores
  getStores(): Promise<Store[]>;
  getStore(id: number): Promise<Store | undefined>;
  getStoreBySlug(slug: string): Promise<Store | undefined>;
  getStoreByAccessCode(accessCode: string): Promise<Store | undefined>;
  getStoresByOwner(ownerId: number): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined>;

  // Categories
  getCategoriesByStore(storeId: number): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Products
  getProductsByStore(storeId: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Orders
  getOrdersByStore(storeId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Analytics
  getAnalytics(storeId: number, startDate?: string, endDate?: string): Promise<Analytics[]>;
  updateAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Store Templates
  async getStoreTemplates(): Promise<StoreTemplate[]> {
    return await db.select().from(storeTemplates).where(eq(storeTemplates.isActive, true));
  }

  async getStoreTemplate(id: number): Promise<StoreTemplate | undefined> {
    const [template] = await db.select().from(storeTemplates).where(eq(storeTemplates.id, id));
    return template || undefined;
  }

  async createStoreTemplate(template: InsertStoreTemplate): Promise<StoreTemplate> {
    const [newTemplate] = await db
      .insert(storeTemplates)
      .values(template)
      .returning();
    return newTemplate;
  }

  // Stores
  async getStores(): Promise<Store[]> {
    return await db.select().from(stores);
  }

  async getStore(id: number): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store || undefined;
  }

  async getStoreBySlug(slug: string): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.slug, slug));
    return store || undefined;
  }

  async getStoreByAccessCode(accessCode: string): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.accessCode, accessCode));
    return store || undefined;
  }

  async getStoresByOwner(ownerId: number): Promise<Store[]> {
    return await db.select().from(stores).where(eq(stores.ownerId, ownerId));
  }

  async createStore(store: InsertStore): Promise<Store> {
    const [newStore] = await db
      .insert(stores)
      .values({
        ...store,
        accessCode: this.generateAccessCode(),
      })
      .returning();
    return newStore;
  }

  async updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined> {
    const [updatedStore] = await db
      .update(stores)
      .set(store)
      .where(eq(stores.id, id))
      .returning();
    return updatedStore || undefined;
  }

  // Categories
  async getCategoriesByStore(storeId: number): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.storeId, storeId));
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updatedCategory] = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory || undefined;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Products
  async getProductsByStore(storeId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.storeId, storeId));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Orders
  async getOrdersByStore(storeId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.storeId, storeId));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder || undefined;
  }

  // Analytics
  async getAnalytics(storeId: number, startDate?: string, endDate?: string): Promise<Analytics[]> {
    return await db.select().from(analytics).where(eq(analytics.storeId, storeId));
  }

  async updateAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [existing] = await db
      .select()
      .from(analytics)
      .where(and(
        eq(analytics.storeId, analyticsData.storeId!),
        eq(analytics.date, analyticsData.date)
      ));

    if (existing) {
      const [updated] = await db
        .update(analytics)
        .set(analyticsData)
        .where(eq(analytics.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newAnalytics] = await db
        .insert(analytics)
        .values(analyticsData)
        .returning();
      return newAnalytics;
    }
  }

  private generateAccessCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

export const storage = new DatabaseStorage();