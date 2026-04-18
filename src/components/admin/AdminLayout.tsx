import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, UtensilsCrossed, Settings, LogOut, Bell, Search, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Sanctuary', path: '/admin' },
  { icon: CalendarDays, label: 'Bookings', path: '/admin/bookings' },
  { icon: UtensilsCrossed, label: 'Menu Room', path: '/admin/menu' },
  { icon: Settings, label: 'Atmosphere', path: '/admin/settings' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#FDFCFB] text-secondary selection:bg-primary/30 font-body overflow-hidden p-4 md:p-6 gap-4 md:gap-6">
      {/* Floating Sidebar */}
      <aside className="hidden lg:flex w-72 bg-secondary rounded-[2.5rem] flex-col relative z-20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden shrink-0">
        <div className="p-8 flex-1 flex flex-col">
          {/* Branding */}
          <Link to="/" className="block group mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl p-2.5 shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="overflow-hidden">
                <h1 className="font-headline font-black text-xl tracking-tight text-white leading-none">THE HOLE</h1>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mt-1 italic">Operations</p>
              </div>
            </div>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary text-secondary" 
                      : "text-white/30 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={16} className={cn("transition-transform duration-500", isActive && "scale-110")} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="absolute right-3 w-1.5 h-1.5 bg-secondary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer Card */}
          <div className="mt-auto pt-8">
            <div className="bg-white/5 rounded-3xl p-5 border border-white/5 group hover:border-primary/30 transition-all">
               <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary">Live Pulse</p>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
               </div>
               <p className="text-[10px] text-white/50 font-medium leading-relaxed italic">System Synchronized with Koramangala sanctuary.</p>
            </div>
          </div>
        </div>

        {/* Logout Action */}
        <div className="p-8 pt-0">
          <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all w-full">
            <LogOut size={16} />
            <span>Exit</span>
          </button>
        </div>

        {/* Chalk Texture Overlay */}
        <div className="absolute inset-0 chalk-texture opacity-5 pointer-events-none" />
      </aside>

      {/* Main Sanctuary Area */}
      <main className="flex-1 flex flex-col bg-white rounded-3xl md:rounded-[3.5rem] shadow-[0_10px_60px_-15px_rgba(0,0,0,0.05)] border border-secondary/5 overflow-hidden relative min-w-0">
        {/* Minimal Editorial Header */}
        <header className="h-24 px-6 md:px-12 flex items-center justify-between border-b border-secondary/5 shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="p-3 bg-secondary/5 rounded-xl text-secondary lg:hidden">
              <MenuIcon size={20} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-black text-secondary lowercase italic leading-none truncate max-w-[150px] md:max-w-none">
                 {navItems.find(n => n.path === location.pathname)?.label || 'dashboard'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-secondary/30">Management Sanctum</p>
                 <div className="hidden sm:block w-1 h-1 rounded-full bg-primary" />
                 <p className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-secondary/50">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-3">
              <button className="w-11 h-11 rounded-2xl bg-secondary/5 text-secondary/30 hover:text-secondary hover:bg-secondary/10 transition-all flex items-center justify-center">
                <Search size={18} />
              </button>
              <button className="w-11 h-11 rounded-2xl bg-secondary/5 text-secondary/30 hover:text-secondary hover:bg-secondary/10 transition-all flex items-center justify-center relative">
                <Bell size={18} />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-primary rounded-full border border-white" />
              </button>
            </div>
            
            <div className="hidden md:block h-10 w-px bg-secondary/10" />

            <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-secondary group-hover:text-primary transition-colors">Sanctuary Curator</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Lead Alchemist</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-secondary text-primary flex items-center justify-center font-headline font-black text-base md:text-lg italic shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                SC
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-6 md:p-10 xl:p-12">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="max-w-[1400px] mx-auto w-full"
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
