import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, ShoppingBag, Receipt, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import Charts from "@/components/ui/charts";

interface DashboardProps {
  storeId: number;
}

export default function Dashboard({ storeId }: DashboardProps) {
  // Mock data - in real app would fetch from API
  const stats = {
    todaySales: 450.00,
    todayOrders: 23,
    avgTicket: 19.57,
    monthSales: 12450.00,
    salesGrowth: 12,
    ordersGrowth: 8,
    ticketGrowth: -2,
    monthGrowth: 24,
  };

  const topProducts = [
    { name: "Sorvete Chocolate", sales: 45, revenue: 675.00 },
    { name: "Sorvete Morango", sales: 38, revenue: 570.00 },
    { name: "Sorvete Baunilha", sales: 32, revenue: 480.00 },
  ];

  const monthlyData = [
    { month: 'Jan', sales: 8500 },
    { month: 'Fev', sales: 9200 },
    { month: 'Mar', sales: 10100 },
    { month: 'Abr', sales: 11300 },
    { month: 'Mai', sales: 12450 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.todaySales.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <DollarSign className="text-secondary h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-600 h-4 w-4 mr-1" />
              <span className="text-sm text-green-600">+{stats.salesGrowth}%</span>
              <span className="text-sm text-gray-500 ml-1">vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-primary h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-600 h-4 w-4 mr-1" />
              <span className="text-sm text-green-600">+{stats.ordersGrowth}%</span>
              <span className="text-sm text-gray-500 ml-1">vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.avgTicket.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Receipt className="text-accent h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingDown className="text-red-600 h-4 w-4 mr-1" />
              <span className="text-sm text-red-600">{stats.ticketGrowth}%</span>
              <span className="text-sm text-gray-500 ml-1">vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.monthSales.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-600 h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-600 h-4 w-4 mr-1" />
              <span className="text-sm text-green-600">+{stats.monthGrowth}%</span>
              <span className="text-sm text-gray-500 ml-1">vs mês passado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
            <Charts data={monthlyData} type="line" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="text-secondary font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} vendas</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {product.revenue.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
