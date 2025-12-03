import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BrainCircuit, 
  TrendingUp, 
  UploadCloud, 
  Bell, 
  Settings, 
  LogOut,
  Satellite
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: ViewState.MAP_EXPLORER, icon: MapIcon, label: 'Mapas' },
    { id: ViewState.AI_ANALYSIS, icon: BrainCircuit, label: 'Análisis IA' },
    { id: ViewState.PREDICTIONS, icon: TrendingUp, label: 'Predicciones' },
    { id: ViewState.UPLOAD, icon: UploadCloud, label: 'Cargas' },
    { id: ViewState.ALERTS, icon: Bell, label: 'Alertas' },
    { id: ViewState.SETTINGS, icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="w-64 bg-bw-dark border-r border-bw-neonDim h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-bw-neonDim">
        <div className="bg-bw-neon/20 p-2 rounded-lg">
          <Satellite className="text-bw-neon h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Bloom<span className="text-bw-neon">Watch</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === item.id
                ? 'bg-bw-neon/10 text-bw-neon border-l-4 border-bw-neon'
                : 'text-bw-muted hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-bw-neonDim">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-bw-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;