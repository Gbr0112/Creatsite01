import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, MessageCircle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatWhatsAppMessage, validateWhatsAppNumber } from "@/lib/whatsapp";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface WhatsAppIntegrationProps {
  cart: CartItem[];
  storeName: string;
  storePhone: string;
  onClearCart: () => void;
}

export default function WhatsAppIntegration({ 
  cart, 
  storeName, 
  storePhone, 
  onClearCart 
}: WhatsAppIntegrationProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de fazer o pedido",
        variant: "destructive",
      });
      return;
    }

    if (!validateWhatsAppNumber(storePhone)) {
      toast({
        title: "Número inválido",
        description: "O número do WhatsApp da loja não está configurado corretamente",
        variant: "destructive",
      });
      return;
    }

    const message = formatWhatsAppMessage(cart, storeName, total);
    const whatsappUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Sua mensagem foi preparada automaticamente",
    });
  };

  const handleCopyMessage = async () => {
    if (cart.length === 0) return;

    const message = formatWhatsAppMessage(cart, storeName, total);
    
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      
      toast({
        title: "Mensagem copiada!",
        description: "Cole no WhatsApp para enviar seu pedido",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a mensagem",
        variant: "destructive",
      });
    }
  };

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
          <p className="text-gray-600">Adicione produtos para fazer seu pedido</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Seu Pedido
        </CardTitle>
        <CardDescription>
          {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items list */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  R$ {item.price.toFixed(2)} cada
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={handleSendWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Enviar Pedido via WhatsApp
          </Button>
          
          <Button 
            onClick={handleCopyMessage}
            variant="outline"
            className="w-full"
            size="lg"
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copiar Mensagem
              </>
            )}
          </Button>
          
          <Button 
            onClick={onClearCart}
            variant="ghost"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Limpar Carrinho
          </Button>
        </div>

        {/* Info */}
        <div className="pt-4 border-t">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Como funciona:</strong> Ao clicar em "Enviar Pedido", você será redirecionado para o WhatsApp 
              com sua mensagem já formatada. É só enviar para {storeName}!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}