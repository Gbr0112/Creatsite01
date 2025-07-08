import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Charts from "@/components/ui/charts";

interface AnalyticsProps {
  storeId: number;
}

export default function Analytics({ storeId }: AnalyticsProps) {
  // Mock analytics data
  const salesData = [
    { month: 'Jan', sales: 8500, orders: 180 },
    { month: 'Fev', sales: 9200, orders: 195 },
    { month: 'Mar', sales: 10100, orders: 210 },
    { month: 'Abr', sales: 11300, orders: 235 },
    { month: 'Mai', sales: 12450, orders: 260 },
    { month: 'Jun', sales: 13200, orders: 275 },
  ];

  const weeklyData = [
    { day: 'Seg', sales: 1800 },
    { day: 'Ter', sales: 2100 },
    { day: 'Qua', sales: 1950 },
    { day: 'Qui', sales: 2300 },
    { day: 'Sex', sales: 2800 },
    { day: 'Sáb', sales: 3200 },
    { day: 'Dom', sales: 2900 },
  ];

  const productData = [
    { name: 'Chocolate', value: 35 },
    { name: 'Morango', value: 25 },
    { name: 'Baunilha', value: 20 },
    { name: 'Outros', value: 20 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Análises</h1>
        <p className="text-gray-600">Relatórios detalhados do desempenho da loja</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
            <Charts data={salesData} type="line" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Vendas Semanais</h3>
            <Charts data={weeklyData} type="bar" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
            <Charts data={productData} type="pie" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Métricas do Período</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Total de Vendas</span>
                <span className="font-bold text-green-600">R$ 64.750,00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Total de Pedidos</span>
                <span className="font-bold text-blue-600">1.355</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Ticket Médio</span>
                <span className="font-bold text-purple-600">R$ 47,78</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Taxa de Conversão</span>
                <span className="font-bold text-orange-600">23,5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
