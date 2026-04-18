import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { serviceModal } from '../../hooks/useServiceModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#story' },
    { name: 'Reservations', href: '#reservations' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleOrder = () => {
    serviceModal.open();
  };

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md py-3 shadow-2xl border-b border-secondary/5' 
        : 'bg-transparent py-8'
    )}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center group">
          <div className="relative group/logo">
            <div className="absolute -inset-2 bg-primary animate-pulse rounded-2xl blur-lg opacity-0 group-hover/logo:opacity-30 transition duration-700" />
            <img 
              src={logo} 
              alt="The Hole in the Wall Cafe" 
              className="relative h-14 md:h-18 w-auto object-contain rounded-2xl shadow-xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] hover:text-primary transition-all duration-300 relative group drop-shadow-sm"
            >
              {link.name}
              <motion.span 
                className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-8">

          <motion.button 
            onClick={handleOrder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-secondary text-primary px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(74,30,30,0.3)] hover:shadow-primary/20 transition-all"
          >
            Sizzle & Order
          </motion.button>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-secondary p-2 bg-secondary/5 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-secondary p-10 z-[60] flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary p-2 bg-white/5 rounded-full"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-headline font-bold text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <button onClick={() => { handleOrder(); setIsMobileMenuOpen(false); }} className="w-full bg-primary text-secondary py-5 rounded-xl font-black tracking-[0.2em] uppercase shadow-2xl hover:brightness-110 transition-all">
                Order Now
              </button>
              <p className="text-white/40 text-[10px] text-center mt-6 uppercase tracking-widest font-bold">
                Bengaluru • Hyderabad
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
