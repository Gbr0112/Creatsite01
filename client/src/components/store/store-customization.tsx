import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Phone, MapPin, CreditCard, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface StoreCustomizationProps {
  storeId: number;
}

export default function StoreCustomization({ storeId }: StoreCustomizationProps) {
  const [colors, setColors] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    accentColor: "#10b981",
  });
  
  const [contact, setContact] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    location: "",
    pixKey: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: store, isLoading } = useQuery({
    queryKey: ["/api/stores", storeId],
    onSuccess: (data) => {
      if (data.config) {
        setColors({
          primaryColor: data.config.primaryColor || "#3b82f6",
          secondaryColor: data.config.secondaryColor || "#64748b",
          accentColor: data.config.accentColor || "#10b981",
        });
      }
      
      setContact({
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        address: data.address || "",
        location: data.location || "",
        pixKey: data.pixKey || "",
      });
    },
  });

  const updateStoreMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/stores/${storeId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stores", storeId] });
      toast({
        title: "Sucesso!",
        description: "Configurações atualizadas com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar configurações",
        variant: "destructive",
      });
    },
  });

  const handleColorChange = (colorType: string, value: string) => {
    setColors(prev => ({ ...prev, [colorType]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const saveColors = () => {
    const config = {
      ...store?.config,
      ...colors,
    };
    
    updateStoreMutation.mutate({ config });
  };

  const saveContact = () => {
    updateStoreMutation.mutate(contact);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Carregando configurações...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Personalização da Loja</h1>
        
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="preview">Prévia</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Esquema de Cores
                </CardTitle>
                <CardDescription>
                  Personalize as cores da sua loja para combinar com sua marca
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={colors.primaryColor}
                        onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={colors.primaryColor}
                        onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={colors.secondaryColor}
                        onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={colors.secondaryColor}
                        onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={colors.accentColor}
                        onChange={(e) => handleColorChange("accentColor", e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={colors.accentColor}
                        onChange={(e) => handleColorChange("accentColor", e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Prévia das Cores</h3>
                    <Button onClick={saveColors} disabled={updateStoreMutation.isPending}>
                      Salvar Cores
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className="p-4 rounded-lg text-white font-medium"
                      style={{ backgroundColor: colors.primaryColor }}
                    >
                      Cor Primária
                    </div>
                    <div 
                      className="p-4 rounded-lg text-white font-medium"
                      style={{ backgroundColor: colors.secondaryColor }}
                    >
                      Cor Secundária
                    </div>
                    <div 
                      className="p-4 rounded-lg text-white font-medium"
                      style={{ backgroundColor: colors.accentColor }}
                    >
                      Cor de Destaque
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Informações de Contato
                </CardTitle>
                <CardDescription>
                  Configure as informações de contato da sua loja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      placeholder="(11) 9999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={contact.whatsapp}
                      onChange={(e) => handleContactChange("whatsapp", e.target.value)}
                      placeholder="5511999999999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      placeholder="contato@loja.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixKey">Chave PIX</Label>
                    <Input
                      id="pixKey"
                      type="text"
                      value={contact.pixKey}
                      onChange={(e) => handleContactChange("pixKey", e.target.value)}
                      placeholder="CPF, CNPJ, telefone ou email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    type="text"
                    value={contact.address}
                    onChange={(e) => handleContactChange("address", e.target.value)}
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização (Google Maps)</Label>
                  <Input
                    id="location"
                    type="text"
                    value={contact.location}
                    onChange={(e) => handleContactChange("location", e.target.value)}
                    placeholder="Nome da loja ou endereço completo"
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={saveContact} disabled={updateStoreMutation.isPending}>
                    Salvar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Prévia da Loja</CardTitle>
                <CardDescription>
                  Veja como sua loja ficará com as personalizações aplicadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="p-6 rounded-lg text-center"
                    style={{ 
                      backgroundColor: colors.primaryColor,
                      color: 'white'
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-2">{store?.name}</h2>
                    <p className="opacity-90">{store?.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: colors.secondaryColor,
                        color: 'white'
                      }}
                    >
                      <h3 className="font-semibold mb-2">Produto Exemplo</h3>
                      <p className="text-sm opacity-90">Descrição do produto</p>
                      <div className="mt-2">
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: colors.accentColor,
                            color: 'white'
                          }}
                        >
                          R$ 15,00
                        </span>
                      </div>
                    </div>

                    <div 
                      className="p-4 rounded-lg border-2"
                      style={{ 
                        borderColor: colors.accentColor,
                        backgroundColor: 'white'
                      }}
                    >
                      <h3 className="font-semibold mb-2">Informações de Contato</h3>
                      <div className="space-y-1 text-sm">
                        {contact.phone && <p>📞 {contact.phone}</p>}
                        {contact.whatsapp && <p>💬 WhatsApp disponível</p>}
                        {contact.email && <p>✉️ {contact.email}</p>}
                        {contact.address && <p>📍 {contact.address}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}