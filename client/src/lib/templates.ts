export const TEMPLATE_CATEGORIES = [
  { id: "sorveteria", name: "Sorveteria", icon: "🍦" },
  { id: "acai", name: "Açaí", icon: "🥣" },
  { id: "lanchonete", name: "Lanchonete", icon: "🍔" },
  { id: "pizzaria", name: "Pizzaria", icon: "🍕" },
  { id: "cafe", name: "Café", icon: "☕" },
  { id: "farmacia", name: "Farmácia", icon: "💊" },
];

export const DEFAULT_TEMPLATE_CONFIG = {
  sorveteria: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    categories: ["Sorvetes", "Picolés", "Açaí", "Milkshakes"],
    sampleProducts: [
      { name: "Sorvete Chocolate", price: 8.50, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" },
      { name: "Sorvete Morango", price: 8.50, image: "https://images.unsplash.com/photo-1488900128323-21503983a07e" },
      { name: "Sorvete Baunilha", price: 7.50, image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7" }
    ]
  },
  acai: {
    primaryColor: "#10B981",
    secondaryColor: "#7C3AED",
    heroImage: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    categories: ["Açaí", "Smoothies", "Vitaminas", "Complementos"],
    sampleProducts: [
      { name: "Açaí 300ml", price: 12.00, image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38" },
      { name: "Açaí 500ml", price: 18.00, image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38" },
      { name: "Smoothie Morango", price: 15.00, image: "https://images.unsplash.com/photo-1488900128323-21503983a07e" }
    ]
  }
};

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[áàâã]/g, 'a')
    .replace(/[éèê]/g, 'e')
    .replace(/[íì]/g, 'i')
    .replace(/[óòôõ]/g, 'o')
    .replace(/[úù]/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
