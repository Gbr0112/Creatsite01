import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Smartphone, Monitor } from "lucide-react";

export default function VisualEditor() {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [storeConfig, setStoreConfig] = useState({
    name: "Sorveteria do João",
    whatsapp: "(11) 99999-9999",
    instagram: "@sorveteria_joao",
    address: "Rua das Flores, 123 - Centro",
    pixKey: "joao@sorveteria.com",
    enablePixQR: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setStoreConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(storeConfig.pixKey);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Editor Visual</h1>
        <p className="text-gray-600">Personalize o site selecionado</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Editor Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Configurações</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Nome da Loja</Label>
                  <Input 
                    id="storeName"
                    placeholder="Ex: Sorveteria do João"
                    value={storeConfig.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input 
                    id="whatsapp"
                    placeholder="(11) 99999-9999"
                    value={storeConfig.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram"
                    placeholder="@sorveteria_joao"
                    value={storeConfig.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Textarea 
                    id="address"
                    placeholder="Rua das Flores, 123"
                    className="h-20"
                    value={storeConfig.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="pixKey">Chave PIX</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="pixKey"
                      placeholder="sua-chave-pix"
                      value={storeConfig.pixKey}
                      onChange={(e) => handleInputChange("pixKey", e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={copyPixKey}
                      className="btn-accent"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enablePixQR"
                    checked={storeConfig.enablePixQR}
                    onCheckedChange={(checked) => handleInputChange("enablePixQR", checked as boolean)}
                  />
                  <Label htmlFor="enablePixQR" className="text-sm">
                    Ativar QR Code PIX
                  </Label>
                </div>

                <Button className="w-full btn-primary mt-6">
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-3">
          <Card>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Preview do Site</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  Desktop
                </Button>
                <Button 
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
                previewMode === "mobile" ? "max-w-sm mx-auto" : ""
              }`}>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded">
                    <h2 className="text-lg font-bold">{storeConfig.name}</h2>
                  </div>
                  <div className="text-left space-y-2">
                    <p><strong>WhatsApp:</strong> {storeConfig.whatsapp}</p>
                    <p><strong>Instagram:</strong> {storeConfig.instagram}</p>
                    <p><strong>Endereço:</strong> {storeConfig.address}</p>
                    {storeConfig.pixKey && (
                      <p><strong>PIX:</strong> {storeConfig.pixKey}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
