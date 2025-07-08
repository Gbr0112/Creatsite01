import { db } from "./db";
import { users, storeTemplates, stores, categories, products } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Seed users
    const [adminUser] = await db.insert(users).values({
      username: "admin",
      password: "admin123",
      role: "admin"
    }).returning();

    // Seed store templates
    const templates = [
      {
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
        name: "Açaí & Smoothies",
        category: "acai",
        description: "Ideal para lojas de açaí com customização de tamanhos e complementos",
        imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#8B5CF6",
          secondaryColor: "#06B6D4",
          heroImage: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Açaí", "Smoothies", "Vitaminas", "Sucos"]
        },
        isActive: true
      },
      {
        name: "Lanchonete",
        category: "lanchonete",
        description: "Para lanchonetes com variedade de lanches e bebidas",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#F59E0B",
          secondaryColor: "#EF4444",
          heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Lanches", "Pastéis", "Bebidas", "Porções"]
        },
        isActive: true
      },
      {
        name: "Pizzaria",
        category: "pizzaria",
        description: "Template especializado para pizzarias com menu de sabores",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#DC2626",
          secondaryColor: "#059669",
          heroImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Pizzas Doces", "Pizzas Salgadas", "Bebidas", "Sobremesas"]
        },
        isActive: true
      },
      {
        name: "Café & Padaria",
        category: "cafe",
        description: "Para cafés e padarias com cardápio completo de bebidas e salgados",
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#92400E",
          secondaryColor: "#059669",
          heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Cafés", "Salgados", "Doces", "Bebidas"]
        },
        isActive: true
      },
      {
        name: "Farmácia",
        category: "farmacia",
        description: "Template para farmácias com catálogo de medicamentos e produtos",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        config: {
          primaryColor: "#059669",
          secondaryColor: "#3B82F6",
          heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
          categories: ["Medicamentos", "Higiene", "Cosméticos", "Vitaminas"]
        },
        isActive: true
      }
    ];

    const insertedTemplates = await db.insert(storeTemplates).values(templates).returning();

    // Seed demo store
    const [demoStore] = await db.insert(stores).values({
      ownerId: adminUser.id,
      templateId: insertedTemplates[0].id,
      name: "Sorveteria do João",
      slug: "sorveteria-do-joao",
      accessCode: "DEMO01",
      description: "A melhor sorveteria da cidade com mais de 50 sabores!",
      whatsapp: "5511999999999",
      instagram: "sorveteria_joao",
      email: "contato@sorveterianojoao.com",
      address: "Rua das Flores, 123 - Centro",
      location: "Rua das Flores, 123 - Centro, São Paulo - SP",
      pixKey: "pix@sorveterianojoao.com",
      enablePixQR: true,
      config: {
        primaryColor: "#3B82F6",
        secondaryColor: "#10B981",
        heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        logo: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
      },
      isActive: true
    }).returning();

    // Seed categories
    const categoriesData = [
      { storeId: demoStore.id, name: "Sorvetes", sortOrder: 1 },
      { storeId: demoStore.id, name: "Picolés", sortOrder: 2 },
      { storeId: demoStore.id, name: "Açaí", sortOrder: 3 },
      { storeId: demoStore.id, name: "Milkshakes", sortOrder: 4 }
    ];

    const insertedCategories = await db.insert(categories).values(categoriesData).returning();

    // Seed products
    const productsData = [
      {
        storeId: demoStore.id,
        categoryId: insertedCategories[0].id,
        name: "Sorvete de Chocolate",
        description: "Delicioso sorvete de chocolate artesanal",
        price: "8.50",
        imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        isActive: true,
        sortOrder: 1
      },
      {
        storeId: demoStore.id,
        categoryId: insertedCategories[0].id,
        name: "Sorvete de Morango",
        description: "Sorvete cremoso com pedaços de morango",
        price: "9.00",
        imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        isActive: true,
        sortOrder: 2
      },
      {
        storeId: demoStore.id,
        categoryId: insertedCategories[1].id,
        name: "Picolé de Limão",
        description: "Picolé refrescante de limão siciliano",
        price: "5.00",
        imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        isActive: true,
        sortOrder: 1
      }
    ];

    await db.insert(products).values(productsData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();