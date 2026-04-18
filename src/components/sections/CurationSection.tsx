import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { SteamAnimation } from '../ui/SteamAnimation';
import { toast } from '../ui/Toast';

const dishes = [
  {
    name: "The All-English Breakfast",
    category: "Legendary Platter",
    price: "₹380",
    description: "Fried eggs, baked beans, mashed potatoes, sausages, bacon, and grilled tomatoes. The ultimate morning fuel.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80"
  },
  {
    name: "Tiramisu Pancakes",
    category: "Signature Sweet",
    price: "₹280",
    description: "Coffee-soaked fluffy pancakes layered with creamy mascarpone and dusted with rich cocoa.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80"
  },
  {
    name: "Funky Monkey Waffles",
    category: "Fan Favorite",
    price: "₹260",
    description: "Crispy waffles topped with caramelized bananas, melted chocolate, and roasted nuts.",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80"
  },
  {
    name: "Eggs of Zorro",
    category: "House Special",
    price: "₹240",
    description: "Our signature spicy eggs served in a skillet with chicken pepperoni and melted cheese.",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80"
  }
];

export const CurationSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 bg-surface px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <SectionLabel>Today's Curation</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">Signature <span className="italic font-normal">Plates</span></h2>
      </div>

      {/* Infinite Scroll Container */}
      <div 
        className="relative w-full overflow-hidden pb-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex space-x-8 w-max px-8"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {[...dishes, ...dishes, ...dishes].map((dish, i) => (
            <div
              key={`${dish.name}-${i}`}
              className="w-[340px] md:w-[480px] group cursor-pointer"
              onClick={() => toast.success(`Added ${dish.name} to your order.`)}
            >
              <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-editorial overflow-hidden mb-10 shadow-xl border border-secondary/5">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute top-8 left-8 flex items-center space-x-4">
                  <span className="bg-primary px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-2xl transform">
                    {dish.category}
                  </span>
                  <SteamAnimation />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="px-2">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface group-hover:text-secondary transition-colors duration-500">
                    {dish.name}
                  </h3>
                  <div className="h-[1px] flex-grow mx-4 md:mx-6 bg-secondary/10" />
                  <span className="text-xl md:text-2xl font-headline font-black text-secondary">{dish.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-[420px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

