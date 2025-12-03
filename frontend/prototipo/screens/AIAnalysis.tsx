
import React, { useState } from 'react';
import { BrainCircuit, Download, CheckCircle2, AlertOctagon, MapPin } from 'lucide-react';
import { AnalysisContext } from '../types';

interface AIAnalysisProps {
  data?: AnalysisContext | null;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ data }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [downloading, setDownloading] = useState(false);

  // Default Fallback Data if came from sidebar
  const activeData = data || {
    source: 'default',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    regionName: 'Amazonas, Sector 4 (Demo)',
    metrics: { accuracy: 87.24, area: '42.5 km²', confidence: 'High' as const },
    date: '2023-10-24'
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
        setDownloading(false);
        // In a real app this would trigger a file download
        alert("Reporte descargado: report_analysis.json"); 
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Visual Comparison Tool */}
      <div className="lg:col-span-2 glass-panel p-1 rounded-xl relative h-[600px] overflow-hidden group select-none">
        
        {/* Underlying Image (Mask) */}
        <div className="absolute inset-0 bg-black">
          <img 
            src={activeData.imageUrl} 
            className="w-full h-full object-cover opacity-60 grayscale" 
            alt="Mask Base"
          />
          <div className="absolute inset-0 mix-blend-screen bg-green-900/40"></div> 
          {/* Simulated Bloom Mask highlights based on data source */}
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-bw-neon/60 blur-2xl rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-24 bg-bw-neon/50 blur-xl rounded-full animate-pulse delay-75"></div>
        </div>

        {/* Overlying Image (Original) - clipped by width */}
        <div 
          className="absolute inset-0 bg-bw-darker border-r-2 border-bw-neon"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={activeData.imageUrl} 
            className="w-full h-full object-cover" 
            style={{ width: '100vw', maxWidth: 'unset' }} // Trick to keep image fixed
            alt="Original"
          />
          <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-mono text-white">Original Input</div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-mono text-bw-neon border border-bw-neon">U-Net Prediction</div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
        
        {/* Slider Handle Visual */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
        >
            <div className="w-8 h-8 bg-bw-neon rounded-full shadow-[0_0_20px_rgba(61,255,138,0.8)] flex items-center justify-center">
                <div className="w-1 h-4 bg-bw-darker/50"></div>
            </div>
        </div>
      </div>

      {/* Metrics Panel */}
      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-xl border-l-4 border-bw-neon">
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit className="text-bw-neon h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold text-white">Análisis U-Net</h2>
              <div className="flex items-center gap-1 text-xs text-bw-muted">
                 <MapPin size={10} /> {activeData.regionName}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-bw-text">Precisión del Modelo</span>
                <span className="text-sm font-bold text-bw-neon">{activeData.metrics.accuracy}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-bw-neon shadow-[0_0_10px_#3DFF8A] transition-all duration-1000" 
                    style={{ width: `${activeData.metrics.accuracy}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-center">
                <div className="text-xs text-bw-muted mb-1">Área Detectada</div>
                <div className="text-lg font-mono text-white">{activeData.metrics.area}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg text-center">
                <div className="text-xs text-bw-muted mb-1">Confianza</div>
                <div className="text-lg font-mono text-white">{activeData.metrics.confidence}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-bw-neon/10 rounded-lg border border-bw-neon/20">
            <h4 className="text-sm font-bold text-bw-neon mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} /> Conclusión
            </h4>
            <p className="text-sm text-bw-text leading-relaxed">
              El modelo ha segmentado exitosamente zonas con alta concentración de biomasa vegetal. 
              {activeData.metrics.accuracy > 90 
                ? " Correlación muy fuerte con datos de campo."
                : " Se sugiere revisión manual debido a ruido atmosférico."
              }
            </p>
          </div>

          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition"
          >
            {downloading ? (
                <>Generando PDF...</>
            ) : (
                <>
                    <Download size={18} />
                    Descargar Informe GeoJSON
                </>
            )}
          </button>
        </div>

        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-2 mb-3 text-yellow-400">
               <AlertOctagon size={20} />
               <h3 className="font-bold">Metadatos</h3>
           </div>
           <ul className="text-sm text-bw-muted space-y-2 font-mono">
               <li className="flex justify-between"><span>Sensor:</span> <span className="text-white">Sentinel-2B</span></li>
               <li className="flex justify-between"><span>Bandas:</span> <span className="text-white">B2, B3, B4, B8</span></li>
               <li className="flex justify-between"><span>Fecha:</span> <span className="text-white">{activeData.date}</span></li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
