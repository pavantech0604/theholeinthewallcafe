import { motion } from 'framer-motion';
import { BurnishedButton } from '../ui/BurnishedButton';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const HeroSection = () => {
  const scrollTo = useSmoothScroll();
  return (
    <header className="relative w-full min-h-screen flex items-center overflow-hidden bg-surface">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0 scale-105">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=85&w=1920" 
          alt="Premium cafe ambiance" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/20" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full max-w-7xl pt-[110px] pb-10 lg:pt-[120px] lg:pb-16">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="max-w-4xl"
         >
           <h1 className="text-4xl md:text-5xl lg:text-[5rem] text-on-surface font-headline font-bold leading-[1.05] tracking-tight mb-8">
             Bengaluru's <br />
             <span className="marker-highlight text-secondary italic font-normal">Soulful</span> <br />
             Breakfast <span className="sticker-patch inline-block ml-2">Haven.</span>
           </h1>

           <div className="flex items-center space-x-6 mb-6 overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 40 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="h-[2px] bg-primary" 
             />
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-secondary whitespace-nowrap"
             >
               Est. 2009 • Koramangala Garage Original
             </motion.span>
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 40 }}
               transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
               className="h-[2px] bg-secondary/10 hidden md:block" 
             />
           </div>
           
           <p className="text-on-surface text-sm md:text-lg font-body max-w-xl leading-relaxed mb-10 border-l-2 border-primary pl-6 opacity-90">
             Step into the legendary home of sizzling pans and aromatic brews. Where every corner tells a story of passion, and every bite feels like home.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
             <BurnishedButton variant="primary" className="px-10 py-4 text-xs" onClick={() => scrollTo('#menu')}>
               View The Menu
             </BurnishedButton>
             <BurnishedButton variant="outline" className="px-10 py-4 text-xs" onClick={() => scrollTo('#reservations')}>
               Locate a Branch
             </BurnishedButton>
           </div>
         </motion.div>
      </div>

      {/* Hero Interactive Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 5 }}
        transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
        className="absolute bottom-32 right-10 md:right-24 hidden xl:flex flex-col items-center"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary border-4 border-primary flex items-center justify-center p-6 text-center text-white shadow-editorial relative">
           <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
           <div className="flex flex-col items-center">
             <span className="text-[8px] font-bold uppercase tracking-widest leading-tight text-primary">Voted Best</span>
             <span className="text-base md:text-lg font-headline italic">Breakfast</span>
             <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">In Town</span>
           </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-20 hidden md:flex">
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-secondary to-transparent" />
      </div>
    </header>
  );
};
