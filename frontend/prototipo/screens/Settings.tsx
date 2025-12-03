
import React, { useState } from 'react';
import { User, Bell, Globe, Moon, Key, Terminal, Save, ShieldCheck } from 'lucide-react';

interface SettingsProps {
  onSave: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reports: true
  });
  const [devMode, setDevMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        onSave();
    }, 800);
  };

  return (
    <div className="max-w-4xl animate-fade-in space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuración de Usuario</h2>
          <p className="text-bw-muted">Administra tu perfil, preferencias y claves de API.</p>
        </div>
        <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-bw-neon text-bw-darker px-4 py-2 rounded-lg font-bold hover:bg-green-400 transition shadow-[0_0_15px_rgba(61,255,138,0.3)] disabled:opacity-70"
        >
          <Save size={18} />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="md:col-span-1 glass-panel p-6 rounded-xl flex flex-col items-center text-center h-fit border-t border-white/10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-bw-neon to-blue-600 p-1 mb-4 relative group cursor-pointer">
            <div className="w-full h-full rounded-full bg-bw-darker flex items-center justify-center overflow-hidden">
                <User size={40} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-xs text-white">Editar</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Jane Doe</h3>
          <p className="text-sm text-bw-neon mb-1">Lead Scientist</p>
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-6 bg-white/5 px-2 py-1 rounded">
             <ShieldCheck size={12} className="text-bw-neon" /> Verificado
          </div>

          <div className="w-full border-t border-white/10 pt-4 text-left space-y-3">
            <div>
                <span className="text-xs text-bw-muted block uppercase tracking-wider mb-1">Correo</span>
                <span className="text-sm text-white font-mono bg-black/20 px-2 py-1 rounded block truncate">jane.doe@bloomwatch.io</span>
            </div>
            <div>
                <span className="text-xs text-bw-muted block uppercase tracking-wider mb-1">Organización</span>
                <span className="text-sm text-white flex items-center gap-2">
                    Earth Observation Lab
                </span>
            </div>
            <div>
                <span className="text-xs text-bw-muted block uppercase tracking-wider mb-1">Plan Actual</span>
                <span className="text-sm text-bw-neon bg-bw-neon/10 px-2 py-1 rounded inline-block font-bold">Enterprise Tier</span>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2 space-y-6">
            
            {/* General Preferences */}
            <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Globe size={18} className="text-bw-neon" /> Preferencias Generales
                </h4>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-bw-muted mb-2">Idioma</label>
                            <select 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-[#050F21] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-bw-neon outline-none transition"
                            >
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-bw-muted mb-2">Zona Horaria</label>
                            <select className="w-full bg-[#050F21] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-bw-neon outline-none transition">
                                <option>UTC (Coordinated Universal Time)</option>
                                <option>EST (Eastern Standard Time)</option>
                                <option>PST (Pacific Standard Time)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                            <Moon size={18} className="text-bw-text" />
                            <div>
                                <div className="text-sm font-medium text-white">Modo Oscuro</div>
                                <div className="text-xs text-bw-muted">Interfaz optimizada para baja luminosidad (Always On)</div>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-bw-neon rounded-full relative cursor-not-allowed opacity-80">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-bw-darker rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Bell size={18} className="text-bw-neon" /> Notificaciones
                </h4>
                <div className="space-y-3">
                    {[
                        { id: 'email', label: 'Alertas por Correo', desc: 'Recibir boletines de anomalías críticas' },
                        { id: 'push', label: 'Notificaciones Push', desc: 'Alertas en tiempo real en el navegador' },
                        { id: 'reports', label: 'Reportes Semanales', desc: 'Resumen de actividad y predicciones' }
                    ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition">
                            <div>
                                <div className="text-sm font-medium text-white">{item.label}</div>
                                <div className="text-xs text-bw-muted">{item.desc}</div>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={notifications[item.id as keyof typeof notifications]}
                                onChange={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                                className="w-5 h-5 accent-bw-neon cursor-pointer" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Developer Zone */}
            <div className="glass-panel p-6 rounded-xl border border-bw-neon/20 bg-bw-neon/5">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-bw-neon/20 pb-2">
                    <Terminal size={18} className="text-bw-neon" /> Desarrollador
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-bw-muted mb-2 flex items-center gap-2">
                            <Key size={14} /> API Key Personal
                        </label>
                        <div className="flex gap-2">
                            <input 
                                readOnly 
                                value="sk_live_51Mxq...9283" 
                                className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-2 text-bw-neon font-mono text-sm" 
                            />
                            <button className="px-3 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-sm transition">Copiar</button>
                            <button className="px-3 py-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 text-sm transition">Revocar</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                         <input 
                            type="checkbox" 
                            checked={devMode} 
                            onChange={() => setDevMode(!devMode)}
                            className="w-4 h-4 accent-bw-neon cursor-pointer" 
                        />
                         <span className="text-sm text-bw-text">Habilitar logs de depuración del modelo en consola</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
