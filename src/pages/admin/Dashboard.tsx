import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, Utensils, TrendingUp, ArrowUpRight, Activity, Clock, MapPin, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState([
    { id: 'bookings', label: 'Total Bookings', value: '0', change: 'Live', icon: CalendarCheck, color: 'text-secondary', bg: 'bg-primary/20' },
    { id: 'menu', label: 'Menu Items', value: '0', change: 'Menu', icon: Utensils, color: 'text-primary', bg: 'bg-secondary' },
    { id: 'waitlist', label: 'Waitlist', value: '0', change: 'Active', icon: Users, color: 'text-secondary', bg: 'bg-primary/20' },
    { id: 'health', label: 'System Health', value: 'UP', change: 'Online', icon: TrendingUp, color: 'text-primary', bg: 'bg-secondary' },
  ]);

  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      const { count: bookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: menuCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true });
      const { data: latest } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(3);

      setStats([
        { id: 'bookings', label: 'Total Bookings', value: (bookingsCount || 0).toString(), change: 'Live', icon: CalendarCheck, color: 'text-secondary', bg: 'bg-primary/20' },
        { id: 'menu', label: 'Menu Items', value: (menuCount || 0).toString(), change: 'Menu', icon: Utensils, color: 'text-primary', bg: 'bg-secondary' },
        { id: 'waitlist', label: 'Waitlist', value: (pendingCount || 0).toString(), change: 'Active', icon: Users, color: 'text-secondary', bg: 'bg-primary/20' },
        { id: 'health', label: 'System Health', value: 'UP', change: 'Online', icon: TrendingUp, color: 'text-primary', bg: 'bg-secondary' },
      ]);
      setRecentBookings(latest || []);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    
    const channel = supabase.channel('dashboard-sync-pulse')
      .on('postgres_changes' as any, { event: '*', table: 'bookings' }, () => fetchStats())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-12 pb-12 overflow-x-hidden">
      {/* Top Ledger: Stats Grid (Dynamic Masonry Flow) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Large Pulse Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-12 xl:col-span-7 p-8 md:p-12 bg-secondary text-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10 md:mb-12">
               <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Activity size={28} strokeWidth={2.5} />
               </div>
               <div className="bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">Sanctum Synchronized</span>
               </div>
            </div>
            
            <h3 className="font-headline font-black text-3xl md:text-4xl mb-4 md:mb-6 italic leading-none">The Sizzle Alert</h3>
            <p className="text-xs md:text-sm font-medium leading-[1.6] md:leading-[1.8] text-white/50 mb-10 md:mb-12 max-w-sm">Every booking from the Sanctuary landing page is live. Your kitchen is synced and ready for the legacy flow.</p>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
               <div>
                  <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-white/30 mb-2">Total Engagement</p>
                  <p className="text-6xl md:text-7xl font-headline font-black italic text-primary leading-none">
                    {stats.find(s => s.id === 'bookings')?.value}
                  </p>
               </div>
               <button className="px-6 md:px-8 py-4 md:py-5 bg-primary text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all shadow-xl w-fit">
                 Sync Now
               </button>
            </div>
          </div>
          
          {/* Abstract Sizzle Texture */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Medium Grid Stats */}
        <div className="lg:col-span-12 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 md:gap-8">
           {stats.filter(s => s.id !== 'bookings').map((stat, i) => (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={stat.id}
               className="group relative p-8 md:p-10 bg-white rounded-3xl md:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(74,30,30,0.05)] border border-secondary/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-w-0"
             >
               <div className="flex justify-between items-start">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500", stat.bg, stat.color)}>
                    <stat.icon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-secondary bg-primary/20 px-3 py-1 rounded-lg uppercase italic">
                    {stat.change}
                  </span>
               </div>
               
               <div className="mt-8">
                  <h3 className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
                  <div className="flex items-end gap-3">
                     <p className="text-5xl font-headline font-black italic text-secondary tracking-tighter leading-none">{stat.value}</p>
                     <ArrowUpRight size={20} className="text-primary mb-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>

               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
             </motion.div>
           ))}
        </div>
      </div>

      {/* Operational Stream: Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Activity Stream */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-5">
                 <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(255,166,0,0.4)]" />
                 <div>
                    <h4 className="text-2xl font-headline font-black text-secondary lowercase italic leading-none">The Operational Pulse</h4>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary/30 mt-2">Latest engagements from your sanctuaries</p>
                 </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">View All Ledger</button>
           </div>
           
           <div className="grid gap-4">
              {recentBookings.length > 0 ? recentBookings.map((b, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={b.id} 
                  className="group flex items-center gap-8 p-8 bg-white rounded-[2.5rem] border border-secondary/5 hover:border-primary/50 transition-all hover:shadow-xl relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-secondary text-primary flex items-center justify-center font-headline font-black text-2xl italic group-hover:scale-110 transition-all shadow-lg">
                    {b.customer_name?.charAt(0) || 'G'}
                  </div>
                  <div className="flex-1">
                    <p className="font-headline font-black text-xl text-secondary mb-1 lowercase italic">{b.customer_name}</p>
                    <div className="flex items-center gap-4 text-[9px] text-secondary/40 uppercase font-black tracking-widest">
                       <span className="flex items-center gap-1"><MapPin size={10} className="text-primary" /> {b.branch}</span>
                       <span className="w-1 h-1 rounded-full bg-secondary/20" />
                       <span className="flex items-center gap-1"><Clock size={10} /> {b.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="px-5 py-2 rounded-xl bg-secondary/5 text-secondary text-[9px] font-black uppercase tracking-widest italic">
                        {b.guests} Guests
                     </span>
                     <span className="text-[8px] font-black uppercase tracking-widest text-primary">Pending confirmation</span>
                  </div>
                </motion.div>
              )) : (
                <div className="p-16 bg-secondary/5 rounded-[3rem] border-2 border-dashed border-secondary/10 text-center">
                   <p className="text-sm font-black uppercase tracking-widest text-secondary/20 font-headline italic">The pulse is currently calm...</p>
                </div>
              )}
           </div>
        </div>

        {/* Quick Sanctuary Tools */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[3rem] p-10 border border-secondary/5 shadow-xl relative overflow-hidden h-full">
              <div className="relative z-10 flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-secondary">
                       <Star size={24} />
                    </div>
                    <div>
                       <h4 className="font-headline font-black text-xl text-secondary lowercase italic">Quick Sanctuary Access</h4>
                       <p className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Immediate laboratory controls</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 flex-1">
                    {['Bookings', 'Inventory', 'Shifts', 'Ledger', 'Kitchen', 'Settings'].map(tool => (
                      <div key={tool} className="p-6 bg-secondary/5 rounded-[2rem] text-center hover:bg-secondary hover:text-primary transition-all cursor-pointer group flex flex-col items-center justify-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-sm">
                            <TrendingUp size={14} />
                         </div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40 group-hover:text-primary transition-colors">{tool}</p>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-10 pt-8 border-t border-secondary/5">
                    <p className="text-[10px] text-secondary/30 leading-relaxed font-medium italic">Your sanctuary operations are protected by 256-bit encryption and Supabase Auth protocols.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
