
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CloudRain, Sun, Wind, Waves, Grid } from 'lucide-react';

const predictionData = [
  { month: 'Ene', riesgo: 20, humedad: 40 },
  { month: 'Feb', riesgo: 25, humedad: 45 },
  { month: 'Mar', riesgo: 40, humedad: 60 },
  { month: 'Abr', riesgo: 75, humedad: 80 },
  { month: 'May', riesgo: 60, humedad: 70 },
  { month: 'Jun', riesgo: 45, humedad: 50 },
  { month: 'Jul', riesgo: 30, humedad: 40 },
];

const FactorCard: React.FC<{ icon: any; label: string; value: string; sub: string }> = ({ icon: Icon, label, value, sub }) => (
    <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 rounded-full bg-white/5 text-bw-neon">
            <Icon size={24} />
        </div>
        <div>
            <div className="text-sm text-bw-muted">{label}</div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-xs text-bw-muted">{sub}</div>
        </div>
    </div>
);

const Predictions: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'heatmap'>('chart');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-white">Proyección Fenológica</h2>
            <p className="text-bw-muted">Modelo predictivo a 6 meses basado en series temporales Sentinel + ERA5.</p>
        </div>
        <div className="flex bg-white/5 rounded-lg p-1">
            <button 
                onClick={() => setViewMode('chart')}
                className={`px-4 py-1 rounded font-medium text-sm transition ${viewMode === 'chart' ? 'bg-bw-neon text-bw-darker' : 'text-bw-muted hover:text-white'}`}
            >
                Gráfico
            </button>
            <button 
                onClick={() => setViewMode('heatmap')}
                className={`px-4 py-1 rounded font-medium text-sm transition ${viewMode === 'heatmap' ? 'bg-bw-neon text-bw-darker' : 'text-bw-muted hover:text-white'}`}
            >
                Mapa de Calor
            </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl h-[400px] relative">
        {viewMode === 'chart' ? (
             <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={predictionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id="colorRiesgo" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#3DFF8A" stopOpacity={0.4}/>
                   <stop offset="95%" stopColor="#3DFF8A" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
               <XAxis dataKey="month" stroke="#94A3B8" />
               <YAxis stroke="#94A3B8" />
               <Tooltip 
                   contentStyle={{ backgroundColor: '#0B1E3F', borderColor: '#3DFF8A' }}
                   itemStyle={{ color: '#E2E8F0' }}
               />
               <Legend />
               <Area type="monotone" dataKey="riesgo" name="Probabilidad de Floración" stroke="#3DFF8A" fillOpacity={1} fill="url(#colorRiesgo)" />
               <Area type="monotone" dataKey="humedad" name="Índice de Humedad" stroke="#60A5FA" fillOpacity={0.1} fill="#60A5FA" />
             </AreaChart>
           </ResponsiveContainer>
        ) : (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
                <Grid size={48} className="text-white/20 mb-4" />
                <h3 className="text-white font-medium mb-2">Matriz de Riesgo Fenológico</h3>
                <div className="grid grid-cols-7 gap-1 w-full max-w-2xl">
                    {predictionData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                             <div 
                                className="w-full aspect-square rounded"
                                style={{ 
                                    backgroundColor: d.riesgo > 60 ? '#EF4444' : d.riesgo > 30 ? '#FACC15' : '#3DFF8A',
                                    opacity: d.riesgo / 100 
                                }} 
                             ></div>
                             <span className="text-xs text-bw-muted">{d.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
       
      </div>

      <h3 className="text-lg font-semibold text-white mt-8 mb-4">Factores Ambientales (Input Modelo)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FactorCard icon={Sun} label="Temperatura Sup." value="24.5°C" sub="+1.2°C vs media" />
        <FactorCard icon={CloudRain} label="Precipitación" value="12mm" sub="Acumulada 7d" />
        <FactorCard icon={Wind} label="Viento" value="14km/h" sub="Dirección NW" />
        <FactorCard icon={Waves} label="Backscatter SAR" value="-12dB" sub="RADARSAT-2" />
      </div>
    </div>
  );
};

export default Predictions;
