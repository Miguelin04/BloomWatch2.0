import React from 'react';
import SimulatedMap from '../components/SimulatedMap';
import { ArrowUpRight, AlertTriangle, Droplets, Leaf, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', uv: 4000 },
  { name: 'Mar', uv: 3000 },
  { name: 'Mie', uv: 2000 },
  { name: 'Jue', uv: 2780 },
  { name: 'Vie', uv: 1890 },
  { name: 'Sab', uv: 2390 },
  { name: 'Dom', uv: 3490 },
];

const MetricCard: React.FC<{ title: string; value: string; trend: string; icon: any; color?: string }> = ({ title, value, trend, icon: Icon, color = "text-bw-neon" }) => (
  <div className="glass-panel p-5 rounded-xl border border-white/5">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-xs font-mono text-bw-neon bg-bw-neon/10 px-2 py-1 rounded flex items-center gap-1">
        <ArrowUpRight size={12} /> {trend}
      </span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-bw-muted font-medium uppercase tracking-wide">{title}</div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Índice de Floración" value="78.4" trend="+12%" icon={Leaf} />
        <MetricCard title="Regiones Activas" value="14" trend="+3" icon={Globe} />
        <MetricCard title="Humedad Relativa" value="62%" trend="-5%" icon={Droplets} color="text-blue-400" />
        <MetricCard title="Alertas Críticas" value="03" trend="Nuevas" icon={AlertTriangle} color="text-red-400" />
      </div>

      {/* Main Map & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 h-full">
          <SimulatedMap interactive layers={['Sentinel-2 RGB', 'NDVI Heatmap']} />
        </div>
        <div className="glass-panel rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Leaf className="text-bw-neon" size={18} /> Tendencia Global
          </h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3DFF8A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3DFF8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1E3F', borderColor: '#3DFF8A' }} 
                  itemStyle={{ color: '#3DFF8A' }}
                />
                <Area type="monotone" dataKey="uv" stroke="#3DFF8A" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm text-bw-muted">
              <span>Última actualización Sentinel-2</span>
              <span className="text-white font-mono">14:30 UTC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts List (Mini) */}
      <div className="glass-panel rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs text-bw-muted uppercase tracking-wider">
                <th className="pb-3 pl-2">Región</th>
                <th className="pb-3">Tipo de Evento</th>
                <th className="pb-3">Severidad</th>
                <th className="pb-3 text-right pr-2">Hora</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { r: 'Amazonas, BR', t: 'Floración Masiva', s: 'high', time: '2 min' },
                { r: 'California, US', t: 'Anomalía Térmica', s: 'medium', time: '15 min' },
                { r: 'Kyushu, JP', t: 'Polinización', s: 'low', time: '1h' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-3 pl-2 font-medium text-white">{row.r}</td>
                  <td className="py-3 text-bw-text">{row.t}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      row.s === 'high' ? 'bg-red-500/20 text-red-400' : 
                      row.s === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {row.s}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2 font-mono text-bw-muted">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;