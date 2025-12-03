
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onError: (msg: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      onError("Por favor completa todos los campos.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes('@') && password.length > 4) {
        onLogin();
      } else {
        setIsLoading(false);
        onError("Credenciales inválidas. Intenta de nuevo.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02090F] relative overflow-hidden font-sans">
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"></div>
      
      {/* Horizon Glow Effect */}
      <div className="absolute -bottom-1/2 left-0 right-0 h-full bg-gradient-to-t from-[#0B2A20] via-[#05101A] to-transparent opacity-80 pointer-events-none blur-3xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#02090F] to-transparent z-0"></div>

      <div className="relative z-10 w-full max-w-[400px] px-6 flex flex-col items-center animate-fade-in-up">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12">
            <div className="text-bw-neon">
                 <Globe size={32} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">BloomWatch</span>
        </div>

        {/* Headings */}
        <h1 className="text-4xl font-bold text-white mb-3 text-center tracking-tight">Bienvenido</h1>
        <p className="text-gray-400 mb-10 text-center text-sm font-medium">Inicia sesión para continuar</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label className="block text-xs font-bold text-white mb-2 ml-1">Email</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#16202A] border border-gray-700/50 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-bw-neon focus:ring-1 focus:ring-bw-neon transition text-sm shadow-inner"
                  placeholder="admin@bloomwatch.io"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white mb-2 ml-1">Contraseña</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#16202A] border border-gray-700/50 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-bw-neon focus:ring-1 focus:ring-bw-neon transition text-sm shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-bw-neon text-[#050F21] font-bold py-3.5 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(61,255,138,0.2)] hover:shadow-[0_0_25px_rgba(61,255,138,0.4)] mt-6 text-sm tracking-wide transform active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-wait' : 'hover:bg-[#2fe876]'}`}
            >
              {isLoading ? 'Autenticando...' : 'Iniciar sesión'}
            </button>
        </form>

        <div className="mt-8 text-center">
            <button onClick={() => onError("Contacta al administrador del sistema.")} className="text-xs font-semibold text-bw-neon hover:text-white transition-colors duration-200">¿Olvidaste tu contraseña?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
