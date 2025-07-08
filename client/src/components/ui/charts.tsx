interface ChartData {
  [key: string]: any;
}

interface ChartsProps {
  data: ChartData[];
  type: "line" | "bar" | "pie";
  className?: string;
}

export default function Charts({ data, type, className = "" }: ChartsProps) {
  // Simple mock chart component - in production would use Chart.js or recharts
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Gráfico de Linha</p>
              <p className="text-sm text-gray-500 mt-1">
                {data.length} pontos de dados
              </p>
            </div>
          </div>
        );
      case "bar":
        return (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Gráfico de Barras</p>
              <p className="text-sm text-gray-500 mt-1">
                {data.length} categorias
              </p>
            </div>
          </div>
        );
      case "pie":
        return (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p className="text-gray-600">Gráfico de Pizza</p>
              <p className="text-sm text-gray-500 mt-1">
                {data.length} segmentos
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {renderChart()}
    </div>
  );
}
