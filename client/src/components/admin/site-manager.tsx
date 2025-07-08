import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Eye, Edit, Plus, IceCream, Brush } from "lucide-react";
import type { Store } from "@shared/schema";

export default function SiteManager() {
  const { data: stores, isLoading } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-48 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-16 h-8 bg-gray-200 rounded" />
                <div className="w-16 h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sites Criados</h1>
        <p className="text-gray-600">Gerencie todos os sites que você criou</p>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Meus Sites</h3>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Novo Site
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          {!stores || stores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum site criado ainda.</p>
              <p className="text-sm text-gray-400 mt-2">Comece selecionando um template.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IceCream className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{store.name}</h4>
                      <p className="text-sm text-gray-600">{store.slug}.netlify.app</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="btn-secondary">
                      <Eye className="mr-1 h-4 w-4" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="btn-primary">
                      <Edit className="mr-1 h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
