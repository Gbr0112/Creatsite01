import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Instagram, ShoppingCart, MapPin, Phone, Copy } from "lucide-react";
import ShoppingCartModal from "@/components/preview/shopping-cart";
import ContactBanner from "@/components/preview/contact-banner";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function PreviewSite() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, getTotalItems } = useCart();
  const { toast } = useToast();

  // Mock store data - in real app this would fetch from API
  const store = {
    id: 1,
    name: "Sorveteria do João",
    description: "Os melhores sorvetes da cidade!",
    whatsapp: "5511999999999",
    instagram: "@sorveteria_joao",
    address: "Rua das Flores, 123 - Centro",
    pixKey: "joao@sorveteria.com",
    config: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
    }
  };

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Sorvete Chocolate",
      description: "Delicioso sorvete de chocolate belga premium",
      price: 8.50,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 2,
      name: "Sorvete Morango",
      description: "Feito com morangos frescos selecionados",
      price: 8.50,
      imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 3,
      name: "Sorvete Baunilha",
      description: "Baunilha cremosa com extrato natural",
      price: 7.50,
      imageUrl: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(store.pixKey);
    toast({
      title: "PIX copiado!",
      description: "Chave PIX copiada para a área de transferência.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <ContactBanner />
      
      {/* Header */}
      <header className="gradient-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <div className="flex items-center space-x-4">
              <a 
                href={`https://instagram.com/${store.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-200 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <button 
                onClick={() => setShowCart(true)}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img 
          src={store.config.heroImage} 
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Os Melhores Sorvetes da Cidade!</h2>
            <p className="text-xl">Sabores únicos e qualidade excepcional</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nosso Cardápio</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="product-card">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <Button 
                      className="btn-secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Contato e Localização</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="text-green-500 h-5 w-5" />
                  <span>{store.whatsapp}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-red-500 h-5 w-5" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="text-pink-500 h-5 w-5" />
                  <span>{store.instagram}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Formas de Pagamento</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">💳</span>
                  </div>
                  <span>Cartão de Crédito/Débito</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">💵</span>
                  </div>
                  <span>Dinheiro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">📱</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>PIX: </span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {store.pixKey}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCopyPix}
                      className="p-1 h-6 w-6"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {store.name}. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">Site criado por SiteBuilder Pro</p>
        </div>
      </footer>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCartModal 
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          store={store}
        />
      )}
    </div>
  );
}
