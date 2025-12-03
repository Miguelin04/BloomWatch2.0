
import React, { useState } from 'react';
import SimulatedMap from '../components/SimulatedMap';
import { Filter, Layers, Calendar, ChevronRight } from 'lucide-react';
import { AnalysisContext } from '../types';

interface MapExplorerProps {
  onAnalyze: (data: AnalysisContext) => void;
}

const MapExplorer: React.FC<MapExplorerProps> = ({ onAnalyze }) => {
  const [activeLayers, setActiveLayers] = useState<string[]>(['Sentinel-2 RGB']);
  const [cloudCover, setCloudCover] = useState(12);
  const [ndviMin, setNdviMin] = useState(0.4);

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  };

  const handleAnalyzeClick = () => {
    // Simulate extracting data from the selected map region
    const regionData: AnalysisContext = {
      id: `map-${Date.now()}`,
      source: 'map',
      imageUrl: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&q=80&w=1200',
      regionName: 'Delta del Po (Lat: 45.44, Lon: 12.33)',
      metrics: {
        accuracy: 89.4,
        area: '38.2 km²',
        confidence: 'High'
      },
      date: new Date().toLocaleDateString()
    };
    onAnalyze(regionData);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
      <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl border border-bw-neonDim">
        <SimulatedMap interactive layers={activeLayers} />
        
        {/* Floating Date Selector */}
        <div className="absolute bottom-6 right-6 glass-panel p-3 rounded-lg flex items-center gap-3 z-10">
            <Calendar size={18} className="text-bw-neon" />
            <span className="text-sm font-mono text-white">2023-10-24</span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <span className="text-sm font-mono text-bw-muted">10:00 UTC</span>
        </div>
      </div>

      <div className="w-80 flex flex-col gap-4">
        <div className="glass-panel p-5 rounded-xl">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Layers size={18} className="text-bw-neon" />
            Capas Satelitales
          </h3>
          <div className="space-y-3">
            {['Sentinel-2 RGB', 'Landsat 8', 'SAR (Radar)', 'U-Net Mask (AI)'].map(layer => (
              <label key={layer} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-white/5 rounded-lg transition">
                <input 
                  type="checkbox" 
                  checked={activeLayers.includes(layer)}
                  onChange={() => toggleLayer(layer)}
                  className="w-4 h-4 rounded border-gray-600 text-bw-neon bg-transparent focus:ring-0 focus:ring-offset-0" 
                />
                <span className={`text-sm ${activeLayers.includes(layer) ? 'text-white font-medium' : 'text-bw-muted group-hover:text-white'}`}>
                  {layer}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl flex-1 flex flex-col">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Filter size={18} className="text-bw-neon" />
            Filtros Espectrales
          </h3>
          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between text-xs text-bw-muted mb-2">
                <span>Nubosidad Máxima</span>
                <span>{cloudCover}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={cloudCover}
                onChange={(e) => setCloudCover(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-bw-neon" 
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-bw-muted mb-2">
                <span>Umbral NDVI</span>
                <span>{ndviMin}</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.1"
                value={ndviMin}
                onChange={(e) => setNdviMin(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-bw-neon" 
              />
            </div>
          </div>
            
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-medium text-white mb-2">Región Seleccionada</h4>
            <p className="text-xs text-bw-muted mb-4 font-mono">Lat: 45.44, Lon: 12.33</p>
            <button 
              onClick={handleAnalyzeClick}
              className="w-full py-3 bg-bw-neon text-bw-darker font-bold rounded hover:bg-green-400 transition flex justify-center items-center gap-2 text-sm shadow-[0_0_15px_rgba(61,255,138,0.3)]"
            >
              Analizar Región <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;
