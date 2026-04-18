import { motion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionLabel';
import { ArrowRight } from 'lucide-react';
import { toast } from '../ui/Toast';

export const EditorialStory = () => {
  return (
    <section id="story" className="bg-surface py-20 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-20" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Left: Overlapping Images (Editorial Style) */}
        <div className="relative group">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="editorial-layer aspect-[4/5] overflow-hidden rounded-editorial p-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" 
              alt="The cozy ambiance of THITWC"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
          </motion.div>
          
          {/* Floating Detail Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -right-10 sticker-patch p-10 max-w-[340px] !rotate-[-2deg] hover:!rotate-0 transition-all"
          >
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-secondary mb-8 shadow-xl border-2 border-secondary/20">
              <span className="text-2xl font-headline font-black">09</span>
            </div>
            <h4 className="font-headline text-2xl mb-4 leading-tight text-primary italic">The Garage Legend</h4>
            <p className="text-white/80 text-sm font-body leading-relaxed mb-6">
              Founded in 2009 by Lynn Dcosta & Nathan Harris in a humble garage, we aimed to bring real homemade comfort to Bengaluru.
            </p>
            <div className="h-[2px] w-16 bg-primary" />
          </motion.div>
        </div>

        {/* Right: Copy */}
        <div className="lg:pl-12">
          <SectionLabel>Our Heritage</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-on-surface leading-[1.05] mb-12">
            A Journey of <br />
            <span className="text-secondary opacity-20 block text-4xl mt-2 tracking-[0.2em] font-body uppercase font-black">Passion & Love</span>
            <span className="text-gradient-gold">Authentic & Unfiltered.</span>
          </h2>
          
          <div className="space-y-10 font-body text-lg text-on-surface-variant leading-relaxed">
            <p className="relative">
              <span className="absolute -left-8 top-0 text-7xl font-headline text-primary/30 leading-none">“</span>
              Growing from a tiny 25-seater restaurant in a no-frills garage to an established 150-seater sanctuary, our mission has always been simple: <span className="text-secondary font-bold">Quality Continental Soul Food.</span>
            </p>
            <p>
              With outlets in Koramangala, Indiranagar, Kammanahalli, and Hyderabad, every dish we serve is a testament to the passion our team pours into every sizzle. From our innovative menu to the aromatic brews, we continue to spread love one plate at a time.
            </p>
          </div>

          <motion.button 
            onClick={() => toast.info('Loading our full heritage timeline...')}
            whileHover={{ x: 10 }}
            className="mt-16 flex items-center space-x-6 text-secondary font-bold tracking-[0.3em] uppercase text-[10px] group transition-all"
          >
            <span className="group-hover:text-primary">Trace Our Full History</span>
            <div className="w-12 h-12 rounded-full border border-secondary group-hover:border-primary flex items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:text-primary" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
