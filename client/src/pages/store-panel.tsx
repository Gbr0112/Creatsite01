import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Box, PieChart, ShoppingBag, Package, TrendingUp, FolderOpen, Settings } from "lucide-react";
import Dashboard from "@/components/store/dashboard";
import Orders from "@/components/store/orders";
import Analytics from "@/components/store/analytics";
import AccessForm from "@/components/store/access-form";
import CategoryManager from "@/components/store/category-manager";
import StoreCustomization from "@/components/store/store-customization";
import ProductManager from "@/components/store/product-manager";

export default function StorePanel() {
  const [, setLocation] = useLocation();
  const { storeId } = useParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [storeData, setStoreData] = useState<any>(null);

  const handleAccessGranted = (store: any) => {
    setStoreData(store);
  };

  if (!storeData) {
    return <AccessForm onAccessGranted={handleAccessGranted} />;
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: PieChart },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "categories", label: "Categorias", icon: FolderOpen },
    { id: "products", label: "Produtos", icon: Package },
    { id: "customization", label: "Personalizar", icon: Settings },
    { id: "analytics", label: "Análises", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard storeId={storeData.id} />;
      case "orders":
        return <Orders storeId={storeData.id} />;
      case "categories":
        return <CategoryManager storeId={storeData.id} />;
      case "products":
        return <ProductManager storeId={storeData.id} />;
      case "customization":
        return <StoreCustomization storeId={storeData.id} />;
      case "analytics":
        return <Analytics storeId={storeData.id} />;
      default:
        return <Dashboard storeId={storeData.id} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/")}
                className="p-0 hover:bg-transparent"
              >
                <div className="flex items-center">
                  <Box className="text-primary text-2xl mr-2" />
                  <span className="text-xl font-bold text-gray-900">SiteBuilder Pro</span>
                </div>
              </Button>
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
                className="btn-accent"
                onClick={() => setLocation("/preview")}
              >
                Preview Site
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800">Painel do Lojista</h2>
            <p className="text-sm text-gray-600 mt-1">{storeData.name}</p>
          </div>
          <nav className="mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    isActive
                      ? "nav-item-store-active"
                      : "text-gray-600 hover:text-secondary hover:bg-gray-50"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
