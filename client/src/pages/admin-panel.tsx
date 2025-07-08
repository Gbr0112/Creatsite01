import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Box, LayoutTemplate, Globe, Edit, Settings as SettingsIcon } from "lucide-react";
import TemplateSelector from "@/components/admin/template-selector";
import SiteManager from "@/components/admin/site-manager";
import VisualEditor from "@/components/admin/visual-editor";

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("templates");

  const tabs = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "sites", label: "Sites Criados", icon: Globe },
    { id: "editor", label: "Editor Visual", icon: Edit },
    { id: "settings", label: "Configurações", icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "templates":
        return <TemplateSelector />;
      case "sites":
        return <SiteManager />;
      case "editor":
        return <VisualEditor />;
      case "settings":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h1>
            <p className="text-gray-600">Configurações do sistema em desenvolvimento...</p>
          </div>
        );
      default:
        return <TemplateSelector />;
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
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                onClick={() => setLocation("/store")}
              >
                Painel Lojista
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
            <h2 className="text-lg font-semibold text-gray-800">Painel Administrativo</h2>
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
                      ? "nav-item-active"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
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
