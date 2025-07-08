import { useEffect, useRef } from "react";

interface GoogleMapsProps {
  location: string;
  className?: string;
}

export default function GoogleMaps({ location, className = "" }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !location) return;

    // Create embedded Google Maps iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}`;
    iframe.width = "100%";
    iframe.height = "300";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    // Clear previous content and add iframe
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(iframe);
  }, [location]);

  const handleMapClick = () => {
    // Open Google Maps app with the location
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  if (!location) {
    return null;
  }

  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <div 
        ref={mapRef}
        onClick={handleMapClick}
        className="cursor-pointer relative"
        title="Clique para abrir no Google Maps"
      >
        {/* Loading placeholder */}
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500">Carregando mapa...</div>
        </div>
      </div>
      <div className="p-3 bg-white">
        <p className="text-sm text-gray-600 mb-2">{location}</p>
        <button
          onClick={handleMapClick}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Abrir no Google Maps →
        </button>
      </div>
    </div>
  );
}