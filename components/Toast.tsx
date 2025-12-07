"use client";

import { useEffect } from 'react';
import { IconX, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <IconCheck className="w-5 h-5" />,
    error: <IconAlertCircle className="w-5 h-5" />,
    info: <IconInfoCircle className="w-5 h-5" />,
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 sm:top-auto sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 z-[60] animate-in slide-in-from-top-4 sm:slide-in-from-bottom-4 duration-300 w-[calc(100%-2rem)] sm:w-auto">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl backdrop-blur-xl max-w-md mx-auto`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${colors[type]} flex items-center justify-center text-white`}>
          {icons[type]}
        </div>
        <p className="text-white text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
