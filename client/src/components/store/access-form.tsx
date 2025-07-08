import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AccessFormProps {
  onAccessGranted: (storeData: any) => void;
}

export default function AccessForm({ onAccessGranted }: AccessFormProps) {
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira o código de acesso",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest(`/api/stores/access/${accessCode.toUpperCase()}`);
      
      onAccessGranted(response);
      
      toast({
        title: "Acesso liberado!",
        description: "Bem-vindo ao painel da sua loja",
      });
    } catch (error) {
      toast({
        title: "Código inválido",
        description: "Código de acesso não encontrado. Verifique e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Painel do Lojista
          </CardTitle>
          <CardDescription>
            Digite o código de acesso da sua loja para gerenciar produtos, pedidos e vendas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Acesso
              </label>
              <Input
                id="accessCode"
                type="text"
                placeholder="Ex: ABC123"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider"
                maxLength={6}
                autoComplete="off"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Verificando..." : "Acessar Painel"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Não tem um código? Entre em contato com o administrador para criar sua loja.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}