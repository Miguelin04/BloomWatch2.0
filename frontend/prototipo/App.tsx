
import React, { useState } from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import MapExplorer from './screens/MapExplorer';
import AIAnalysis from './screens/AIAnalysis';
import Predictions from './screens/Predictions';
import Upload from './screens/Upload';
import Settings from './screens/Settings';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import { ViewState, AnalysisContext } from './types';
import { Bell, Search, User, LogOut } from 'lucide-react';

// Subcomponents for simpler single-file structure
const AlertsView: React.FC = () => (
  <div className="space-y-4 animate-fade-in">
    <h2 className="text-2xl font-bold text-white mb-6">Centro de Alertas</h2>
    {[1,2,3,4].map(i => (
      <div key={i} className="glass-panel p-4 rounded-xl flex items-start gap-4 border-l-4 border-red-500 hover:bg-white/5 transition cursor-pointer">
        <div className="bg-red-500/20 p-2 rounded text-red-400 font-bold text-xs uppercase">Crítico</div>
        <div className="flex-1">
          <h4 className="text-white font-medium">Floración Algal Nociva (HAB) detectada</h4>
          <p className="text-sm text-bw-muted mt-1">Sector: Costa Norte. Concentración Chl-a supera 15mg/m³.</p>
        </div>
        <div className="text-xs text-bw-muted font-mono">Hace 2h</div>
      </div>
    ))}
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  
  // Centralized State
  const [analysisData, setAnalysisData] = useState<AnalysisContext | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'|'info'} | null>(null);

  const showToast = (message: string, type: 'success'|'error'|'info' = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    showToast('Sesión iniciada correctamente', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(ViewState.DASHBOARD);
    setAnalysisData(null);
  };

  const handleAnalyzeRegion = (data: AnalysisContext) => {
    setAnalysisData(data);
    setCurrentView(ViewState.AI_ANALYSIS);
    showToast('Región cargada en módulo de análisis', 'info');
  };

  const handleUploadAnalysis = (data: AnalysisContext) => {
    setAnalysisData(data);
    setCurrentView(ViewState.AI_ANALYSIS);
    showToast('Imagen procesada correctamente', 'success');
  };

  const handleSettingsSave = () => {
    showToast('Preferencias guardadas exitosamente', 'success');
  };

  if (!isAuthenticated) {
    return (
        <>
            <Login onLogin={handleLogin} onError={(msg) => showToast(msg, 'error')} />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.MAP_EXPLORER: return <MapExplorer onAnalyze={handleAnalyzeRegion} />;
      case ViewState.AI_ANALYSIS: return <AIAnalysis data={analysisData} />;
      case ViewState.PREDICTIONS: return <Predictions />;
      case ViewState.UPLOAD: return <Upload onAnalysisComplete={handleUploadAnalysis} />;
      case ViewState.ALERTS: return <AlertsView />;
      case ViewState.SETTINGS: return <Settings onSave={handleSettingsSave} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050F21] text-bw-text font-sans">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        onLogout={handleLogout} 
      />
      
      <main className="pl-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-bw-neonDim flex items-center justify-between px-8 bg-[#050F21]/95 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center gap-4 text-bw-muted w-96">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar región, satélite o fecha..." 
              className="bg-transparent border-none focus:outline-none w-full text-sm placeholder-gray-600"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer" onClick={() => setCurrentView(ViewState.ALERTS)}>
              <Bell size={20} className="text-bw-text hover:text-bw-neon transition" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" onClick={() => setCurrentView(ViewState.SETTINGS)}>
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-white">Jane Doe</div>
                <div className="text-xs text-bw-neon">Pro Plan</div>
              </div>
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-bw-neon to-blue-500 p-[1px]">
                  <div className="w-full h-full bg-bw-dark rounded flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-y-auto relative">
           {renderContent()}
        </div>
      </main>

      {/* Global Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
