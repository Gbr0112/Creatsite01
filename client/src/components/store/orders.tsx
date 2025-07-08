import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Eye, Check } from "lucide-react";

interface OrdersProps {
  storeId: number;
}

export default function Orders({ storeId }: OrdersProps) {
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock orders data
  const orders = [
    {
      id: 1,
      customerName: "João Silva",
      customerPhone: "(11) 99999-9999",
      total: 25.50,
      status: "pending",
      createdAt: "14:30",
      items: [
        { name: "Sorvete Chocolate", quantity: 2, price: 8.50 },
        { name: "Sorvete Morango", quantity: 1, price: 8.50 }
      ]
    },
    {
      id: 2,
      customerName: "Maria Santos",
      customerPhone: "(11) 88888-8888",
      total: 17.00,
      status: "confirmed",
      createdAt: "13:45",
      items: [
        { name: "Sorvete Chocolate", quantity: 1, price: 8.50 },
        { name: "Sorvete Baunilha", quantity: 1, price: 7.50 }
      ]
    },
    {
      id: 3,
      customerName: "Pedro Costa",
      customerPhone: "(11) 77777-7777",
      total: 34.00,
      status: "delivered",
      createdAt: "12:30",
      items: [
        { name: "Sorvete Chocolate", quantity: 2, price: 8.50 },
        { name: "Sorvete Morango", quantity: 2, price: 8.50 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "confirmed":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Confirmado</Badge>;
      case "preparing":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Preparando</Badge>;
      case "delivered":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Entregue</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedidos</h1>
        <p className="text-gray-600">Gerencie todos os pedidos recebidos</p>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pedidos Recentes</h3>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="confirmed">Confirmados</SelectItem>
                <SelectItem value="preparing">Preparando</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pedido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id.toString().padStart(3, '0')}</div>
                      <div className="text-sm text-gray-500">{order.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {order.status === "pending" && (
                          <Button variant="outline" size="sm" className="btn-secondary">
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="btn-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum pedido encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
