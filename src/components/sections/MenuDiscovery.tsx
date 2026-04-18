import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../lib/utils';
import { toast } from '../ui/Toast';
import { menuData, menuCategories } from '../../data/menu';
import { menuDownload } from '../../hooks/useMenuDownload';

// Data removed and moved to src/data/menu.ts

export const MenuDiscovery = () => {
  const [activeCategory, setActiveCategory] = useState("Recommended");

  return (
    <section id="menu" className="py-20 bg-surface px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <SectionLabel className="mx-auto">Menu Highlights</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-on-surface mt-4">
            Curated <span className="text-secondary italic font-normal">Sizzles.</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-24 max-w-4xl mx-auto">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden group",
                activeCategory === cat 
                  ? "text-primary shadow-2xl" 
                  : "bg-secondary/5 text-on-surface-variant hover:bg-secondary/10"
              )}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-secondary chalk-texture shadow-inner"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {menuData[activeCategory as keyof typeof menuData].map((item, i) => (
              <motion.div
                key={`${activeCategory}-${item.name}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => toast.success(`Added ${item.name} to your order.`)}
                className="group relative p-8 cursor-pointer flex flex-col min-h-[220px]"
              >
                {/* Background Layer with Paper Tear (Must be sibling to Badge to avoid clipping) */}
                <div className="absolute inset-0 bg-white border border-secondary/5 paper-tear transition-all duration-500 group-hover:border-primary/50 shadow-[0_10px_40px_rgba(74,30,30,0.03)] group-hover:shadow-editorial rounded-sm" />

                {/* Item Badge (Now safe to overlap the corner) */}
                <div className="absolute -top-3 right-6 bg-primary text-secondary text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg transform group-hover:scale-110 group-hover:-rotate-2 transition-transform z-20">
                  {item.tag}
                </div>

                {/* Card Content Layer */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-secondary transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-headline font-black text-secondary text-lg ml-4">{item.price}</span>
                  </div>
                  
                  <p className="text-on-surface-variant text-xs font-body leading-relaxed mb-6 opacity-60 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {item.desc}
                  </p>
                  
                  <div className="mt-auto pt-4 flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-secondary/20 group-hover:text-primary transition-colors">
                    <span className="w-6 h-[1px] bg-current" />
                    <span>The Hole Signature</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 text-center">
          <motion.button 
            onClick={() => menuDownload.open()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col items-center space-y-6 group"
          >
            <span className="text-secondary font-black text-[10px] tracking-[0.5em] uppercase opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">Download Curated Menu PDF</span>
            <div className="w-24 h-1 relative overflow-hidden rounded-full">
               <div className="absolute inset-0 bg-secondary/10" />
               <motion.div 
                 animate={{ x: [-100, 100] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute inset-0 bg-primary w-1/2"
               />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
