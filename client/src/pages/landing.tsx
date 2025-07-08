import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Box, Palette, MessageCircle, TrendingUp, Store, Settings } from "lucide-react";
import ContactBanner from "@/components/preview/contact-banner";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <ContactBanner />
      
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Box className="text-primary text-2xl mr-2" />
                <span className="text-xl font-bold text-gray-900">SiteBuilder Pro</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setLocation("/admin")}
              >
                Painel Admin
              </Button>
              <Button 
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                onClick={() => setLocation("/store")}
              >
                Painel Lojista
              </Button>
              <Button 
                className="btn-accent"
                onClick={() => setLocation("/preview")}
              >
                Preview Site
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-balance">
            Crie Sites Profissionais para Qualquer Tipo de Loja
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-balance">
            Plataforma completa para criar sites de sorveteria, açaí, lanchonetes e muito mais. 
            Com templates prontos, integração WhatsApp e painel de vendas.
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
              onClick={() => setLocation("/admin")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Começar como Admin
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              onClick={() => setLocation("/store")}
            >
              <Store className="mr-2 h-5 w-5" />
              Acessar como Lojista
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Recursos Principais
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Templates Prontos</h3>
                <p className="text-gray-600">
                  Modelos profissionais para sorveteria, açaí, lanchonetes e muito mais.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-secondary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integração WhatsApp</h3>
                <p className="text-gray-600">
                  Pedidos enviados automaticamente para o WhatsApp da loja com carrinho estruturado.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Painel de Vendas</h3>
                <p className="text-gray-600">
                  Métricas completas com gráficos de desempenho e estatísticas detalhadas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 SiteBuilder Pro. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">
            Criando experiências digitais excepcionais para seu negócio.
          </p>
        </div>
      </footer>
    </div>
  );
}
