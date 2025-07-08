import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Instagram, ShoppingCart, MapPin, Phone, Copy, MessageCircle } from "lucide-react";
import ShoppingCartModal from "@/components/preview/shopping-cart";
import ContactBanner from "@/components/preview/contact-banner";
import GoogleMaps from "@/components/maps/google-maps";
import WhatsAppIntegration from "@/components/store/whatsapp-integration";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function PreviewSite() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ["/api/stores/slug", slug],
    enabled: !!slug,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["/api/stores", store?.id, "products"],
    enabled: !!store?.id,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/stores", store?.id, "categories"],
    enabled: !!store?.id,
  });

  const { cart, addToCart, getTotalItems, clearCart } = useCart(store?.id?.toString());

  if (storeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Carregando loja...</h2>
          <p className="text-gray-600">Aguarde enquanto buscamos os dados</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loja não encontrada</h2>
          <p className="text-gray-600">Verifique se o link está correto</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  // Use real products from API
  const availableProducts = products.filter(product => product.isAvailable);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleCopyPix = () => {
    if (store.pixKey) {
      navigator.clipboard.writeText(store.pixKey);
      toast({
        title: "PIX copiado!",
        description: "Chave PIX copiada para a área de transferência.",
      });
    }
  };

  // Get store colors from config
  const storeColors = {
    primary: store.config?.primaryColor || "#3b82f6",
    secondary: store.config?.secondaryColor || "#64748b", 
    accent: store.config?.accentColor || "#10b981",
  };

  return (
    <div className="min-h-screen bg-white">
      <ContactBanner />
      
      {/* Header */}
      <header 
        className="text-white"
        style={{ backgroundColor: storeColors.primary }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <div className="flex items-center space-x-4">
              {store.instagram && (
                <a 
                  href={`https://instagram.com/${store.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              <button 
                onClick={() => setShowCart(true)}
                className="relative cursor-pointer hover:opacity-75 transition-opacity"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    style={{ backgroundColor: storeColors.accent }}
                  >
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-64 overflow-hidden"
        style={{ backgroundColor: storeColors.secondary }}
      >
        {store.config?.heroImage ? (
          <img 
            src={store.config.heroImage} 
            alt={store.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">{store.name}</h2>
              <p className="text-xl">{store.description}</p>
            </div>
          </div>
        )}
        {store.config?.heroImage && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{store.name}</h2>
              <p className="text-xl">{store.description}</p>
            </div>
          </div>
        )}
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nosso Cardápio</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-xl font-bold"
                      style={{ color: storeColors.accent }}
                    >
                      R$ {product.price.toFixed(2)}
                    </span>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      style={{ backgroundColor: storeColors.primary }}
                      className="text-white hover:opacity-90"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {availableProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Produtos em breve!
              </h3>
              <p className="text-gray-600">
                Estamos preparando nosso cardápio. Volte em breve!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact and Location Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Contato e Localização</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
              <div className="space-y-3">
                {store.whatsapp && (
                  <div className="flex items-center space-x-3">
                    <MessageCircle 
                      className="h-5 w-5" 
                      style={{ color: storeColors.accent }}
                    />
                    <span>{store.whatsapp}</span>
                  </div>
                )}
                {store.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone 
                      className="h-5 w-5" 
                      style={{ color: storeColors.accent }}
                    />
                    <span>{store.phone}</span>
                  </div>
                )}
                {store.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin 
                      className="h-5 w-5" 
                      style={{ color: storeColors.accent }}
                    />
                    <span>{store.address}</span>
                  </div>
                )}
                {store.instagram && (
                  <div className="flex items-center space-x-3">
                    <Instagram 
                      className="h-5 w-5" 
                      style={{ color: storeColors.accent }}
                    />
                    <span>{store.instagram}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Methods */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Formas de Pagamento</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ backgroundColor: storeColors.primary }}
                  >
                    <span className="text-white text-xs">💳</span>
                  </div>
                  <span>Cartão de Crédito/Débito</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ backgroundColor: storeColors.accent }}
                  >
                    <span className="text-white text-xs">💵</span>
                  </div>
                  <span>Dinheiro</span>
                </div>
                {store.pixKey && (
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{ backgroundColor: storeColors.secondary }}
                    >
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
                )}
              </div>
            </div>

            {/* WhatsApp Cart */}
            <div>
              <WhatsAppIntegration
                cart={cart}
                storeName={store.name}
                storePhone={store.whatsapp || ""}
                onClearCart={clearCart}
              />
            </div>
          </div>

          {/* Google Maps */}
          {store.location && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-center">Nossa Localização</h3>
              <GoogleMaps location={store.location} className="max-w-4xl mx-auto" />
            </div>
          )}
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
