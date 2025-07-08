import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { IceCream, Brush, EggFried, Pizza, Coffee, Pill } from "lucide-react";
import type { StoreTemplate } from "@shared/schema";

const categoryIcons = {
  sorveteria: IceCream,
  acai: Brush,
  lanchonete: EggFried,
  pizzaria: Pizza,
  cafe: Coffee,
  farmacia: Pill,
};

const categoryColors = {
  sorveteria: "text-blue-600 bg-blue-100",
  acai: "text-green-600 bg-green-100",
  lanchonete: "text-orange-600 bg-orange-100",
  pizzaria: "text-red-600 bg-red-100",
  cafe: "text-yellow-600 bg-yellow-100",
  farmacia: "text-emerald-600 bg-emerald-100",
};

export default function TemplateSelector() {
  const { data: templates, isLoading } = useQuery<StoreTemplate[]>({
    queryKey: ["/api/templates"],
  });

  const handleUseTemplate = (template: StoreTemplate) => {
    // TODO: Implement template selection logic
    console.log("Using template:", template.name);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="template-card">
              <div className="w-full h-48 bg-gray-200 animate-pulse" />
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Escolha um Template</h1>
        <p className="text-gray-600">Selecione o modelo ideal para o tipo de negócio</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => {
          const Icon = categoryIcons[template.category as keyof typeof categoryIcons] || IceCream;
          const colorClasses = categoryColors[template.category as keyof typeof categoryColors] || "text-blue-600 bg-blue-100";
          
          return (
            <Card key={template.id} className="template-card">
              <img 
                src={template.imageUrl} 
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <Button 
                  className="w-full btn-primary"
                  onClick={() => handleUseTemplate(template)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  Usar Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
