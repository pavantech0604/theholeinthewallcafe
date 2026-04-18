import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, CheckCircle2, XCircle, Search, Mail, Filter, MoreVertical, Smartphone, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { toast } from '../../components/ui/Toast';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  guests: number;
  date: string;
  time: string;
  branch: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

const BookingManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
         setBookings([
            { id: '1', customer_name: 'Rahul Sharma', customer_email: 'rahul@example.com', branch: 'Koramangala', guests: 4, date: '2026-04-20', time: '10:30 AM', status: 'pending', created_at: '' },
            { id: '2', customer_name: 'Ananya Iyer', customer_email: 'ananya@example.com', branch: 'Indiranagar', guests: 2, date: '2026-04-21', time: '12:30 PM', status: 'confirmed', created_at: '' }
         ]);
      } else {
         toast.error('Failed to sync sanctuary records.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const channel = supabase.channel('bookings-mgmt')
      .on('postgres_changes' as any, { event: '*', table: 'bookings' }, () => fetchBookings())
      .subscribe();

    fetchBookings();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Reservation ${newStatus}`);
      fetchBookings();
    } catch (err) {
      toast.error('Protocol update failed.');
    }
  };

  const deleteRecord = async (id: string) => {
    if (!window.confirm('Erase this reservation record from the ledger?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      toast.success('Record purged.');
      fetchBookings();
    } catch (err) {
      toast.error('Purge failed.');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.branch?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || b.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Header Ledger Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(255,166,0,0.4)]" />
              <h2 className="text-5xl font-headline font-black text-secondary lowercase italic leading-none">Reservations</h2>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30 ml-6">Orchestrating the table pulse across all branches</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
           <div className="relative group min-w-[380px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search curators or sanctuary branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-secondary/5 rounded-3xl py-5 pl-16 pr-8 text-sm font-bold text-secondary outline-none focus:border-primary/50 transition-all shadow-sm group-hover:shadow-md"
              />
           </div>
           <div className="flex bg-secondary/5 p-1.5 rounded-[1.75rem] border border-secondary/5 shadow-inner">
              {['all', 'pending', 'confirmed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={cn(
                    "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                    activeFilter === f 
                      ? "bg-secondary text-primary shadow-xl" 
                      : "text-secondary/40 hover:text-secondary hover:bg-secondary/10"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>
           <button className="p-5 bg-white border border-secondary/5 rounded-[1.75rem] text-secondary/40 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm">
              <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] border border-secondary/5 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scroll-smooth">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary text-primary">
                <th className="px-12 py-8 text-left text-[11px] font-black uppercase tracking-[0.4em] border-r border-white/5">Guest Curator</th>
                <th className="px-12 py-8 text-left text-[11px] font-black uppercase tracking-[0.4em] border-r border-white/5">Sanctuary Branch</th>
                <th className="px-12 py-8 text-left text-[11px] font-black uppercase tracking-[0.4em] border-r border-white/5">Scheduling</th>
                <th className="px-12 py-8 text-left text-[11px] font-black uppercase tracking-[0.4em] border-r border-white/5">Status</th>
                <th className="px-12 py-8 text-right text-[11px] font-black uppercase tracking-[0.4em]">Refine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/5">
              <AnimatePresence mode="popLayout">
                {filteredBookings.map((booking, i) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    key={booking.id} 
                    className="group hover:bg-primary/5 transition-all duration-500"
                  >
                    <td className="px-12 py-10">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[1.75rem] bg-secondary text-primary flex items-center justify-center font-headline font-black text-3xl italic shadow-xl transform group-hover:rotate-6 transition-all duration-500">
                             {booking.customer_name?.charAt(0) || 'G'}
                          </div>
                          <div>
                             <p className="font-headline font-black text-2xl text-secondary lowercase italic tracking-tight leading-none mb-2">{booking.customer_name}</p>
                             <div className="flex items-center gap-4">
                                <span className="text-[10px] text-secondary/30 flex items-center gap-2 font-black uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
                                   <Mail size={12} className="text-primary/40" /> {booking.customer_email?.split('@')[0] || 'anonymous'}
                                </span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-10">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary">
                             <MapPin size={18} strokeWidth={2.5} />
                          </div>
                          <div>
                             <p className="font-bold text-secondary text-lg leading-none mb-1">{booking.branch}</p>
                             <span className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Primary Location</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-10">
                       <div className="space-y-3">
                          <div className="flex items-center gap-4 text-secondary/60">
                             <Calendar size={16} className="text-primary" />
                             <span className="font-bold text-sm tracking-tight">{new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-4 text-secondary/60">
                             <Clock size={16} className="text-primary" />
                             <span className="font-bold text-sm tracking-tight">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-4 text-secondary/60 bg-secondary/5 w-fit px-3 py-1.5 rounded-lg border border-secondary/5">
                             <Users size={14} className="text-secondary/40" />
                             <span className="font-black text-[10px] uppercase tracking-widest leading-none">{booking.guests} Guests</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-10">
                       <div className="flex flex-col gap-2">
                         <span className={cn(
                            "w-fit px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm",
                            booking.status === 'confirmed' ? "bg-green-50 text-green-700 border-green-200" :
                            booking.status === 'cancelled' ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-primary/20 text-secondary border-primary/20"
                         )}>
                            {booking.status}
                         </span>
                         {booking.status === 'pending' && <span className="text-[8px] font-black uppercase tracking-widest text-primary animate-pulse ml-1">Requires Ritual</span>}
                       </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                       <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                          {booking.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateStatus(booking.id, 'confirmed')}
                                className="p-4 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-[1.25rem] transition-all shadow-sm active:scale-95"
                                title="Approve"
                              >
                                 <CheckCircle2 size={20} />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking.id, 'cancelled')}
                                className="p-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-[1.25rem] transition-all shadow-sm active:scale-95"
                                title="Decline"
                              >
                                 <XCircle size={20} />
                              </button>
                            </>
                          )}
                          <button className="p-4 bg-secondary/5 text-secondary/30 hover:text-secondary hover:bg-secondary/10 rounded-[1.25rem] transition-all active:scale-95">
                             <Smartphone size={20} />
                          </button>
                          <button 
                            onClick={() => deleteRecord(booking.id)}
                            className="p-4 bg-secondary/5 text-secondary/30 hover:text-secondary hover:bg-secondary/10 rounded-[1.25rem] transition-all active:scale-95"
                          >
                             <Trash2 size={20} />
                          </button>
                       </div>
                       <button className="p-4 bg-secondary/5 text-secondary/20 rounded-[1.25rem] group-hover:hidden outline-none">
                          <MoreVertical size={20} />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredBookings.length === 0 && !loading && (
             <div className="p-24 text-center">
                <div className="w-24 h-24 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-secondary/10">
                   <Calendar size={32} className="text-secondary/10" />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary/20 italic">The ledger records no matches for this search query.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManager;
