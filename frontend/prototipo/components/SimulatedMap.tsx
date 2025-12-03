import React, { useEffect, useRef } from 'react';
import { Layers, ZoomIn, ZoomOut, Activity } from 'lucide-react';

declare const L: any;

interface SimulatedMapProps {
  layers?: string[];
  interactive?: boolean;
}

const SimulatedMap: React.FC<SimulatedMapProps> = ({ layers = [], interactive = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const maskLayerRef = useRef<any>(null);

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        center: [20, 0],
        zoom: 3,
        minZoom: 2,
        worldCopyJump: true
      });

      mapInstanceRef.current = map;
      maskLayerRef.current = L.layerGroup().addTo(map);

      // Force initial resize check to ensure tiles load correctly
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }

    return () => {
      // Cleanup handled by React unmount usually, but Leaflet instances can persist if not careful.
      // We keep it alive for performance in this demo.
    };
  }, []);

  // Handle Layer Updates
  useEffect(() => {
    if (!mapInstanceRef.current || typeof L === 'undefined') return;

    const map = mapInstanceRef.current;
    
    // 1. Determine Tile Layer (Satellite vs Dark)
    // If 'Sentinel' or 'Landsat' or 'RGB' is active, use Satellite imagery.
    const showSatellite = layers.some(l => l.includes('Sentinel') || l.includes('Landsat') || l.includes('RGB'));
    
    // If 'SAR' is active, we might use a specific filter, but for now we stick to Dark or Satellite.
    // Let's assume SAR is visualized as data points or overlay, keeping base map consistent.
    
    let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'; // Default Dark
    let attribution = '&copy; OpenStreetMap &copy; CartoDB';

    if (showSatellite) {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles &copy; Esri';
    }

    // Update Tile Layer
    if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
        attribution: attribution,
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    tileLayerRef.current.bringToBack();

    // 2. Toggle Data Mask / Blooms
    const showMask = layers.some(l => l.includes('Mask') || l.includes('IA') || l.includes('Heatmap'));
    
    maskLayerRef.current.clearLayers();

    if (showMask) {
        const bloomLocations = [
            { lat: -3.4653, lng: -62.2159, color: '#3DFF8A', intensity: 0.8 }, // Amazon
            { lat: 25.7617, lng: -80.1918, color: '#3DFF8A', intensity: 0.6 }, // Florida
            { lat: 15.8700, lng: 100.9925, color: '#3DFF8A', intensity: 0.7 }, // Thailand
            { lat: 36.7783, lng: -119.4179, color: '#FACC15', intensity: 0.5 }, // California
            { lat: 32.5900, lng: 130.8000, color: '#F87171', intensity: 0.9 }, // Kyushu
            { lat: 45.44, lng: 12.33, color: '#3DFF8A', intensity: 0.75 }, // Venice
            { lat: -33.8688, lng: 151.2093, color: '#3DFF8A', intensity: 0.4 }, // Sydney
        ];

        bloomLocations.forEach((loc: any) => {
            // Core
            L.circleMarker([loc.lat, loc.lng], {
                radius: 4,
                fillColor: loc.color,
                color: '#fff',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 1
            }).addTo(maskLayerRef.current);
            
            // Glow / Heatmap effect
            L.circleMarker([loc.lat, loc.lng], {
                radius: 25,
                fillColor: loc.color,
                color: 'transparent',
                fillOpacity: 0.15 * loc.intensity
            }).addTo(maskLayerRef.current);
        });
    }

  }, [layers]); // Re-run when layers prop changes

  // Interactive controls state
  useEffect(() => {
    if (mapInstanceRef.current) {
        if (interactive) {
            mapInstanceRef.current.dragging.enable();
            mapInstanceRef.current.scrollWheelZoom.enable();
            mapInstanceRef.current.doubleClickZoom.enable();
        } else {
            mapInstanceRef.current.dragging.disable();
            mapInstanceRef.current.scrollWheelZoom.disable();
            mapInstanceRef.current.doubleClickZoom.disable();
        }
    }
  }, [interactive]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full h-full bg-[#050F21] overflow-hidden rounded-xl border border-bw-neonDim group z-0">
      <div ref={mapContainerRef} className="w-full h-full z-0 relative" style={{ background: '#050F21' }} />
      
      {/* Sci-Fi Grid Overlay - Hide if showing Satellite for better visibility */}
      {!layers.some(l => l.includes('Sentinel') || l.includes('Landsat')) && (
         <div className="absolute inset-0 pointer-events-none z-10 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(61, 255, 138, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(61, 255, 138, 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
        </div>
      )}

      {/* Interactive Controls */}
      {interactive && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <div className="glass-panel p-2 rounded-lg flex flex-col gap-2 shadow-lg backdrop-blur-md border border-white/10">
            <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded text-white transition active:scale-95">
                <ZoomIn size={20} />
            </button>
            <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded text-white transition active:scale-95">
                <ZoomOut size={20} />
            </button>
          </div>
          
          <div className="glass-panel p-3 rounded-lg flex flex-col gap-2 shadow-lg max-w-[160px] border border-white/10">
            <div className="text-[10px] text-bw-muted font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Layers size={10} /> Capas Activas
            </div>
            {layers.length > 0 ? layers.map((layer, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px] text-bw-neon truncate">
                <div className="w-1.5 h-1.5 rounded-full bg-bw-neon animate-pulse"></div>
                {layer}
              </div>
            )) : <div className="text-[10px] text-gray-500 italic">Ninguna seleccionada</div>}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="absolute bottom-4 left-4 glass-panel px-3 py-1.5 rounded-lg text-[10px] font-mono text-bw-neon z-20 flex items-center gap-2 border border-bw-neon/20 shadow-[0_0_10px_rgba(61,255,138,0.1)]">
        <Activity size={12} className={layers.some(l => l.includes('Sentinel')) ? "animate-pulse" : ""} />
        <span>LIVE FEED | {layers.some(l => l.includes('Sentinel') || l.includes('Landsat')) ? 'SATELLITE VIEW' : 'DATA MODE'}</span>
      </div>
    </div>
  );
};

export default SimulatedMap;