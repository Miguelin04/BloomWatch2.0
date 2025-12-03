
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/50 text-green-400',
    error: 'bg-red-500/10 border-red-500/50 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  };

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-2xl z-[100] animate-fade-in-up ${bgColors[type]}`}>
      <Icon size={18} />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 transition">
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
