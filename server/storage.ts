import { 
  users, stores, storeTemplates, products, orders, analytics,
  type User, type InsertUser, 
  type Store, type InsertStore,
  type StoreTemplate, type InsertStoreTemplate,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type Analytics, type InsertAnalytics
} from "@shared/schema";

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
  getStoresByOwner(ownerId: number): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined>;

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stores: Map<number, Store>;
  private storeTemplates: Map<number, StoreTemplate>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private analytics: Map<string, Analytics>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.stores = new Map();
    this.storeTemplates = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.analytics = new Map();
    this.currentId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed templates
    const templates: StoreTemplate[] = [
      {
        id: this.currentId++,
        name: "Sorveteria",
        category: "sorveteria",
        description: "Template perfeito para sorveterias com cardápio visual e sistema de pedidos",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#3B82F6",
          secondaryColor: "#10B981",
          heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Sorvetes", "Picolés", "Açaí", "Milkshakes"]
        },
        isActive: true
      },
      {
        id: this.currentId++,
        name: "Açaí & Smoothies",
        category: "acai",
        description: "Ideal para lojas de açaí com customização de tamanhos e complementos",
        imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#10B981",
          secondaryColor: "#7C3AED",
          heroImage: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Açaí", "Smoothies", "Vitaminas", "Complementos"]
        },
        isActive: true
      }
    ];

    templates.forEach(template => {
      this.storeTemplates.set(template.id, template);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role || "admin"
    };
    this.users.set(id, user);
    return user;
  }

  async getStoreTemplates(): Promise<StoreTemplate[]> {
    return Array.from(this.storeTemplates.values()).filter(t => t.isActive);
  }

  async getStoreTemplate(id: number): Promise<StoreTemplate | undefined> {
    return this.storeTemplates.get(id);
  }

  async createStoreTemplate(template: InsertStoreTemplate): Promise<StoreTemplate> {
    const id = this.currentId++;
    const newTemplate: StoreTemplate = { 
      id,
      name: template.name,
      category: template.category,
      description: template.description,
      imageUrl: template.imageUrl,
      config: template.config,
      isActive: template.isActive ?? true
    };
    this.storeTemplates.set(id, newTemplate);
    return newTemplate;
  }

  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values()).filter(s => s.isActive);
  }

  async getStore(id: number): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async getStoreBySlug(slug: string): Promise<Store | undefined> {
    return Array.from(this.stores.values()).find(s => s.slug === slug && s.isActive);
  }

  async getStoresByOwner(ownerId: number): Promise<Store[]> {
    return Array.from(this.stores.values()).filter(s => s.ownerId === ownerId && s.isActive);
  }

  async createStore(store: InsertStore): Promise<Store> {
    const id = this.currentId++;
    const newStore: Store = { 
      id,
      ownerId: store.ownerId || null,
      templateId: store.templateId || null,
      name: store.name,
      slug: store.slug,
      description: store.description || null,
      whatsapp: store.whatsapp,
      instagram: store.instagram || null,
      email: store.email || null,
      address: store.address || null,
      pixKey: store.pixKey || null,
      enablePixQR: store.enablePixQR || false,
      config: store.config,
      isActive: store.isActive ?? true,
      createdAt: new Date()
    };
    this.stores.set(id, newStore);
    return newStore;
  }

  async updateStore(id: number, store: Partial<InsertStore>): Promise<Store | undefined> {
    const existing = this.stores.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...store };
    this.stores.set(id, updated);
    return updated;
  }

  async getProductsByStore(storeId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.storeId === storeId && p.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const newProduct: Product = {
      id,
      storeId: product.storeId || null,
      name: product.name,
      description: product.description || null,
      price: product.price,
      imageUrl: product.imageUrl || null,
      category: product.category || null,
      isActive: product.isActive ?? true,
      sortOrder: product.sortOrder || 0
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async getOrdersByStore(storeId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(o => o.storeId === storeId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const newOrder: Order = { 
      id,
      storeId: order.storeId || null,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress || null,
      items: order.items,
      total: order.total,
      status: order.status || "pending",
      notes: order.notes || null,
      createdAt: new Date()
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.orders.set(id, updated);
    return updated;
  }

  async getAnalytics(storeId: number, startDate?: string, endDate?: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values())
      .filter(a => {
        if (a.storeId !== storeId) return false;
        if (startDate && a.date < startDate) return false;
        if (endDate && a.date > endDate) return false;
        return true;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async updateAnalytics(analytics: InsertAnalytics): Promise<Analytics> {
    const key = `${analytics.storeId}-${analytics.date}`;
    const existing = this.analytics.get(key);
    
    if (existing) {
      const updated = { 
        ...existing, 
        sales: analytics.sales || "0",
        orderCount: analytics.orderCount || 0,
        avgTicket: analytics.avgTicket || "0"
      };
      this.analytics.set(key, updated);
      return updated;
    } else {
      const id = this.currentId++;
      const newAnalytics: Analytics = {
        id,
        storeId: analytics.storeId || null,
        date: analytics.date,
        sales: analytics.sales || "0",
        orderCount: analytics.orderCount || 0,
        avgTicket: analytics.avgTicket || "0"
      };
      this.analytics.set(key, newAnalytics);
      return newAnalytics;
    }
  }
}

export const storage = new MemStorage();
