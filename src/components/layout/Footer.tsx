import { Coffee, Heart, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { toast } from '../ui/Toast';

export const Footer = () => {
  const scrollTo = useSmoothScroll();
  return (
    <footer className="w-full pt-20 pb-16 bg-secondary text-white relative overflow-hidden">
      {/* Decorative Texture/Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(141,22,20,0.15),_transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px] opacity-[0.03]" />
        
        {/* Garage Door Silhouette */}
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[400px] bg-black/20 -z-10 group/door origin-bottom skew-x-[-12deg]">
           <div className="absolute bottom-0 right-10 w-full h-full border-x-[12px] border-t-[12px] border-white/5 flex flex-col justify-end p-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-6 border-b-2 border-white/5 w-full mb-8 shadow-inner" />
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
        {/* Brand Column */}
        <div className="space-y-10">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src={logo} 
              alt="The Hole in the Wall Cafe" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-white/70 leading-relaxed font-body text-sm">
            Bengaluru's iconic breakfast institution since 2009. From a garage Original to a sanctuary of soulful flavors.
          </p>
          <div className="flex space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Opening Facebook...'); }} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-secondary hover:border-primary hover:scale-110 hover:-translate-y-1 transition-all duration-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Opening Instagram...'); }} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-secondary hover:border-primary hover:scale-110 hover:-translate-y-1 transition-all duration-500">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Loading Delivery Partners...'); }} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-secondary hover:border-primary hover:scale-110 hover:-translate-y-1 transition-all duration-500">
              <Coffee size={20} />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Loading Testimonials...'); }} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-secondary hover:border-primary hover:scale-110 hover:-translate-y-1 transition-all duration-500">
              <Heart size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-10">
          <h4 className="font-headline font-bold text-primary uppercase tracking-[0.4em] text-[10px]">The Journal</h4>
          <ul className="space-y-6 text-sm font-medium">
            {[
              { name: 'The Menu', href: '#menu' }, 
              { name: 'Our Heritage', href: '#story' }, 
              { name: 'Branch Gallery', href: '#reservations' }, 
              { name: 'Gift Cards', action: () => toast.info('Gift cards coming soon!') }, 
              { name: 'Careers', action: () => toast.info('No current openings. Check back later!') }
            ].map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href || '#'} 
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href) scrollTo(item.href);
                    else if (item.action) item.action();
                  }}
                  className="text-white/70 hover:text-primary transition-all flex items-center group"
                >
                  <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Head Office / Info */}
        <div className="space-y-10">
          <h4 className="font-headline font-bold text-primary uppercase tracking-[0.4em] text-[10px]">Headquarters</h4>
          <div className="space-y-8 text-sm text-white/70">
            <div className="flex items-start space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <MapPin size={18} />
              </div>
              <span className="pt-1">3, 8th Main road, Koramangala 4th Block, Bengaluru - 560034</span>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Phone size={18} />
              </div>
              <a href="tel:+918040949490" className="hover:text-primary transition-colors">+91 80 4094 9490</a>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                <Mail size={18} />
              </div>
              <a href="mailto:hello@thitwc.com" className="hover:text-primary transition-colors">hello@thitwc.com</a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-10">
          <h4 className="font-headline font-bold text-primary uppercase tracking-[0.4em] text-[10px]">Stay Sizzling</h4>
          <p className="text-white/60 text-xs leading-relaxed">Join 15,000+ breakfast enthusiasts for seasonal drops and early access.</p>
          <div className="space-y-4 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-primary/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="relative w-full bg-white/[0.03] backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 focus:border-primary/50 text-sm text-white outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <button 
              onClick={() => toast.success('Subscribed! Keep an eye on your inbox.')}
              className="px-8 py-3 bg-primary text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:scale-[1.05] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
        <p>© 2026 The Hole in the Wall Cafe • Heritage Group</p>
        <div className="flex space-x-12 mt-6 md:mt-0">
          {['Privacy', 'Terms', 'Allergens'].map((item) => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); toast.info(`${item} details will be available soon.`); }} className="hover:text-primary transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};
