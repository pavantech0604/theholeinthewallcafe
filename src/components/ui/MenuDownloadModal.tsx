import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Check, Download, Zap, Loader2 } from 'lucide-react';
import { useMenuDownload } from '../../hooks/useMenuDownload';
import { toast } from './Toast';

const STEPS = [
  { label: 'Curating Breakfast Classics...', sub: 'Sourcing organic sourdough & farm eggs', icon: <Zap className="w-5 h-5" /> },
  { label: 'Selecting Artisan Beverages...', sub: 'Grinding beans & brewing refreshers', icon: <Loader2 className="w-5 h-5 animate-spin" /> },
  { label: 'Applying Editorial Styling...', icon: <FileText className="w-5 h-5" /> },
  { label: 'Generating High-Res PDF...', icon: <Loader2 className="w-5 h-5 animate-spin" /> }
];

export const MenuDownloadModal = () => {
  const { isOpen, close } = useMenuDownload();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen && currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        if (currentStep === STEPS.length - 1) {
          setIsComplete(true);
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsComplete(false);
    close();
  };

  const finalizeDownload = () => {
    toast.success('Menu Downloaded! Enjoy your meal prep.');
    handleReset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
            onClick={!isComplete ? undefined : handleReset}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-editorial overflow-hidden p-10 text-center"
          >
            <div className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary">
              {isComplete ? (
                <Check className="w-10 h-10" />
              ) : (
                <Download className="w-10 h-10 animate-bounce" />
              )}
            </div>

            <h2 className="font-headline text-3xl text-secondary mb-4">
              {isComplete ? 'Menu Ready' : 'Generating PDF'}
            </h2>
            
            <p className="text-secondary/60 text-sm font-body mb-12">
              {isComplete 
                ? "Your curated 'Hole in the Wall' experience is ready for download." 
                : "Sit tight while we package our full menu for you."}
            </p>

            <div className="relative space-y-6 text-left mb-12">
              {STEPS.map((step, i) => (
                <div 
                  key={step.label}
                  className={cn(
                    "flex items-center space-x-4 transition-all duration-500",
                    i > currentStep ? "opacity-20 grayscale" : "opacity-100",
                    i === currentStep ? "scale-105" : "scale-100"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    i < currentStep ? "bg-green-500 text-white" : 
                    i === currentStep ? "bg-primary text-secondary" : "bg-secondary/5 text-secondary/20"
                  )}>
                    {i < currentStep ? <Check className="w-5 h-5" /> : step.icon}
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">{step.label}</p>
                    {step.sub && i === currentStep && (
                      <p className="text-[10px] text-secondary/40 font-medium uppercase tracking-widest">{step.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-1 w-full bg-secondary/5 rounded-full overflow-hidden mb-12">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence>
              {isComplete && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={finalizeDownload}
                  className="w-full bg-secondary text-primary py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center justify-center space-x-3"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Menu</span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { cn } from '../../lib/utils';
