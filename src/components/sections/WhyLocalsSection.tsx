import { motion } from 'framer-motion';
import { Heart, Home, Clock, Coffee } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';

const reasons = [
  {
    icon: Clock,
    title: "The Weekend Ritual",
    description: "Our legendary queues are a badge of honor. Good things take time, especially our sourdough pancakes.",
    theme: "bg-primary/10 text-secondary"
  },
  {
    icon: Home,
    title: "Homely & No-Frills",
    description: "We traded the luxury marble for garage warmth. It's cozy, pet-friendly, and feels like your own living room.",
    theme: "bg-secondary/5 text-secondary"
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "Started by Lynn & Nathan out of a passion for real continental food. Every plate is personal.",
    theme: "bg-primary text-secondary shadow-lg"
  },
  {
    icon: Coffee,
    title: "Artisanal Soul",
    description: "Small-batch roasting and homemade ingredients. We don't just cook; we curate moments.",
    theme: "bg-secondary text-primary"
  }
];

export const WhyLocalsSection = () => {
  return (
    <section className="py-20 bg-surface px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <SectionLabel className="mx-auto">Our Identity</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight">
            Why Bengaluru <br /><span className="italic font-normal">Loves Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-editorial bg-white shadow-[0_10px_40px_rgba(74,30,30,0.03)] hover:shadow-editorial transition-all duration-500 border border-secondary/5"
            >
              <div className={`w-16 h-16 rounded-2xl ${reason.theme} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                <reason.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-6 group-hover:text-secondary transition-colors">
                {reason.title}
              </h3>
              <p className="text-on-surface-variant text-base font-body leading-relaxed opacity-80">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
