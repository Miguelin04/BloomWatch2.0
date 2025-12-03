
import React, { useState } from 'react';
import { UploadCloud, FileImage, X, Cpu, Check, ArrowRight } from 'lucide-react';
import { AnalysisContext } from '../types';

interface UploadProps {
  onAnalysisComplete: (data: AnalysisContext) => void;
}

const Upload: React.FC<UploadProps> = ({ onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const processImage = () => {
    if (!file) return;
    setProcessing(true);
    // Simulate backend processing
    setTimeout(() => {
        setProcessing(false);
        setComplete(true);
    }, 2500);
  };

  const handleViewResults = () => {
    // Create mocked analysis data based on uploaded file
    const resultData: AnalysisContext = {
      id: `upload-${Date.now()}`,
      source: 'upload',
      imageUrl: 'https://images.unsplash.com/photo-1534274988758-3609f8089063?auto=format&fit=crop&q=80&w=1200', // Mock result image
      regionName: file ? file.name : 'Imagen Procesada',
      metrics: {
        accuracy: 91.2,
        area: '12.4 km²',
        confidence: 'High'
      },
      date: new Date().toLocaleDateString()
    };
    onAnalysisComplete(resultData);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2">Procesamiento Satelital</h2>
      <p className="text-bw-muted mb-8">Sube imágenes multiespectrales (GeoTIFF) o RGB estándar para segmentación U-Net.</p>

      {!complete ? (
        <div className="space-y-6">
            <div 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging 
                    ? 'border-bw-neon bg-bw-neon/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                {!file ? (
                <>
                    <div className="w-16 h-16 bg-bw-darker rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <UploadCloud className="text-bw-neon" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Arrastra tu archivo aquí</h3>
                    <p className="text-sm text-bw-muted mb-6">Soporta GeoTIFF, JP2, PNG (Max 500MB)</p>
                    <label className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer transition">
                        Explorar archivos
                        <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                    </label>
                </>
                ) : (
                <div className="flex flex-col items-center animate-scale-in">
                    <FileImage size={48} className="text-bw-neon mb-4" />
                    <div className="text-lg font-mono text-white mb-1">{file.name}</div>
                    <div className="text-sm text-bw-muted mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    
                    <button 
                        onClick={() => setFile(null)}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 mb-6"
                    >
                        <X size={14} /> Eliminar
                    </button>

                    <button 
                        onClick={processImage}
                        disabled={processing}
                        className={`px-8 py-3 rounded-lg font-bold flex items-center gap-3 transition-all ${
                            processing 
                            ? 'bg-bw-neon/50 cursor-wait' 
                            : 'bg-bw-neon hover:bg-green-400 text-bw-darker shadow-[0_0_20px_rgba(61,255,138,0.4)]'
                        }`}
                    >
                        {processing ? (
                            <>
                                <Cpu className="animate-spin" /> Procesando Tensor...
                            </>
                        ) : (
                            <>
                                <Cpu /> Procesar con IA
                            </>
                        )}
                    </button>
                </div>
                )}
            </div>

            <div className="glass-panel p-4 rounded-lg text-sm text-bw-muted">
                <strong className="text-white block mb-1">Nota Técnica:</strong>
                Las imágenes son procesadas en un cluster backend usando PyTorch. El modelo U-Net está optimizado para 13 bandas espectrales. Si subes RGB, la precisión puede disminuir al 65%.
            </div>
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-2xl text-center animate-scale-in flex flex-col items-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <Check className="text-bw-neon w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Análisis Completado!</h3>
            <p className="text-bw-muted mb-8">El modelo ha detectado anomalías con una confianza del 91.2%.</p>
            <div className="flex gap-4">
                <button 
                    onClick={() => { setComplete(false); setFile(null); }} 
                    className="px-6 py-2 border border-white/20 rounded text-white hover:bg-white/5"
                >
                    Subir otra
                </button>
                <button 
                    onClick={handleViewResults}
                    className="px-6 py-2 bg-bw-neon text-bw-darker font-bold rounded hover:bg-green-400 flex items-center gap-2"
                >
                    Ver Resultados <ArrowRight size={16} />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
