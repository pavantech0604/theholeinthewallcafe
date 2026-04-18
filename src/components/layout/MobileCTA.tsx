import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { serviceModal } from '../../hooks/useServiceModal';

export const MobileCTA = () => {
  const scrollDirection = useScrollDirection();
  const scrollTo = useSmoothScroll();
  const isVisible = scrollDirection === 'down' || window.scrollY < 500;

  return (
    <AnimatePresence>
      {!isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-6 right-6 z-40 md:hidden"
        >
          <div className="glass-panel border border-white/20 rounded-2xl shadow-warm flex items-center justify-between p-2 overflow-hidden">
            <div className="flex flex-1">
              <button onClick={() => scrollTo('#reservations')} className="flex-1 flex flex-col items-center justify-center py-2 text-on-surface-variant hover:text-primary transition-colors">
                <MapPin className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Visit</span>
              </button>
              <button onClick={() => window.location.href = 'tel:+1234567890'} className="flex-1 flex flex-col items-center justify-center py-2 text-on-surface-variant hover:text-primary transition-colors">
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
              </button>
            </div>
            
            <button 
              onClick={() => serviceModal.open()}
              className="flex-1 bg-primary text-secondary flex items-center justify-center space-x-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              <span>Order Now</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
