import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'info' | 'error';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface Toast extends ToastOptions {
  id: string;
}

class ToastManager {
  private listeners: ((toasts: Toast[]) => void)[] = [];
  private toasts: Toast[] = [];

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  show(options: ToastOptions) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { ...options, id, type: options.type || 'info', duration: options.duration || 3000 };
    
    this.toasts.push(toast);
    this.notify();

    setTimeout(() => {
      this.remove(id);
    }, toast.duration);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }
}

export const toastManager = new ToastManager();

export const toast = {
  success: (message: string, duration?: number) => toastManager.show({ message, type: 'success', duration }),
  info: (message: string, duration?: number) => toastManager.show({ message, type: 'info', duration }),
  error: (message: string, duration?: number) => toastManager.show({ message, type: 'error', duration }),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toastManager.subscribe(setToasts);
  }, []);

  return (
    <div className="fixed bottom-24 md:bottom-10 right-4 md:right-10 z-[100] flex flex-col space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "pointer-events-auto flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border",
              t.type === 'success' 
                ? "bg-secondary/90 border-primary text-white" 
                : t.type === 'error'
                  ? "bg-red-500 border-red-600 text-white"
                  : "bg-surface border-secondary/10 text-on-surface"
            )}
          >
            {t.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <Info className="w-5 h-5 text-secondary" />
            )}
            <span className="font-body text-sm font-medium">{t.message}</span>
            <button 
              onClick={() => toastManager.remove(t.id)}
              className="ml-auto text-current/50 hover:text-current transition-colors pl-4"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
