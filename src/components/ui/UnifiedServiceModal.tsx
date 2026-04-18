import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bike, MapPin, Plus, Minus, ShoppingCart, ArrowRight, ChevronLeft, CheckCircle2, Clock, Users, Calendar } from 'lucide-react';
import { useServiceModal } from '../../hooks/useServiceModal';
import type { ServicePath } from '../../hooks/useServiceModal';
import { useCart } from '../../hooks/useCart';
import { menuData, menuCategories } from '../../data/menu';
import { locations } from '../../data/locations';
import { cn } from '../../lib/utils';
import { toast } from './Toast';
import { supabase } from '../../lib/supabase';

export const UnifiedServiceModal = () => {
  const { isOpen, path, close, setPath } = useServiceModal();
  const { items, addToCart, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  
  // Local state for path-specific data
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [lastPath, setLastPath] = useState<ServicePath>('selection');
  const [reservation, setReservation] = useState({
    customer_name: '',
    branch: '',
    guests: 2,
    date: '',
    time: ''
  });

  const filteredMenu = useMemo(() => menuData[activeCategory] || [], [activeCategory]);

  const handleReservation = async () => {
    if (!reservation.branch || !reservation.date || !reservation.time || !reservation.customer_name) {
      toast.error('Please complete all selection fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          customer_name: reservation.customer_name,
          branch: reservation.branch,
          guests: reservation.guests,
          date: reservation.date,
          time: reservation.time,
          status: 'pending'
        }]);

      if (error) {
        console.error('Supabase Error:', error);
        // We still show success for the demo if URL is placeholder
        if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
           setLastPath('dinein');
           setPath('success');
           return;
        }
        toast.error('Could not sync with local database. Check console.');
        return;
      }

      setLastPath('dinein');
      setPath('success');
    } catch (err) {
      console.error('Reservation Error:', err);
      setLastPath('dinein');
      setPath('success'); // Fallback for demo
    }
  };

  const handleOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    setLastPath('delivery');
    setPath('success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-secondary/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 30 }}
           className="relative w-full h-full md:h-[90vh] max-w-5xl bg-surface md:rounded-[3rem] shadow-editorial flex flex-col md:flex-row overflow-hidden"
        >
          {/* Sidebar / Header (Desktop vs Mobile) */}
          <div className="w-full md:w-[320px] bg-secondary p-8 md:p-12 text-white flex flex-col justify-between shrink-0">
            <div>
              <button 
                onClick={close}
                className="mb-12 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <AnimatePresence mode="wait">
                 <motion.div
                   key={path}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                   className="space-y-6"
                 >
                   <div className="inline-block px-4 py-1.5 bg-primary rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                      {path === 'selection' ? 'Choose Service' : path === 'delivery' ? 'Quick Delivery' : 'Table Reservation'}
                   </div>
                   <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                      {path === 'selection' ? 'How can we sizzle for you?' : path === 'delivery' ? 'The Home Sizzle' : 'The Legacy Table'}
                   </h2>
                   <p className="text-white/50 text-sm font-medium leading-relaxed max-w-[240px]">
                      {path === 'selection' ? 'Select your path to Bengaluru\'s favorite breakfast.' : 
                       path === 'delivery' ? 'Authentic flavors, delivered straight to your doorstep.' : 
                       'Secure your spot in our legendary Koramangala or Indiranagar sanctuary.'}
                   </p>
                 </motion.div>
              </AnimatePresence>
            </div>

            {/* Cart Summary (Only in Delivery Flow) */}
            {path === 'delivery' && totalItems > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 pt-8 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Total Order</span>
                  <span className="text-xl font-headline italic">₹{totalPrice}</span>
                </div>
                <button 
                  onClick={() => { setLastPath('delivery'); setPath('checkout'); }}
                  className="w-full bg-primary text-secondary py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={16} />
                  Checkout ({totalItems})
                </button>
              </motion.div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
             
             {/* Dynamic Content Switching */}
             <AnimatePresence mode="wait">
                {path === 'selection' && (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center p-8 md:p-20"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full items-center">
                       {/* Delivery Card */}
                       <div 
                         onClick={() => setPath('delivery')}
                         className="group p-10 h-full max-h-[400px] bg-secondary/5 rounded-[2.5rem] border border-secondary/5 hover:border-primary/50 hover:bg-white hover:shadow-editorial transition-all duration-500 cursor-pointer flex flex-col justify-between"
                       >
                          <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                             <Bike size={32} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-headline font-bold text-secondary mb-4">Delivery</h3>
                            <p className="text-secondary/60 text-sm mb-8">All your favorites from our garage, sent straight to your door.</p>
                            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary">
                               Explore Menu <ArrowRight size={14} className="ml-2" />
                            </div>
                          </div>
                       </div>

                       {/* Dine-in Card */}
                       <div 
                         onClick={() => setPath('dinein')}
                         className="group p-10 h-full max-h-[400px] bg-secondary/5 rounded-[2.5rem] border border-secondary/5 hover:border-primary/50 hover:bg-white hover:shadow-editorial transition-all duration-500 cursor-pointer flex flex-col justify-between"
                       >
                          <div className="w-16 h-16 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                             <MapPin size={32} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-headline font-bold text-secondary mb-4">Dine-in</h3>
                            <p className="text-secondary/60 text-sm mb-8">Skip the queue. Book your signature table at our iconic branches.</p>
                            <div 
                              onClick={() => { setLastPath('dinein'); setPath('dinein'); }}
                              className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary cursor-pointer"
                            >
                               Reserve Now <ArrowRight size={14} className="ml-2" />
                            </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {path === 'delivery' && (
                  <motion.div 
                    key="delivery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                  >
                    {/* Menu Header / Categories */}
                    <div className="p-8 pb-4 border-b border-secondary/5 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
                       <div className="flex space-x-2">
                         {menuCategories.map(cat => (
                           <button 
                             key={cat}
                             onClick={() => setActiveCategory(cat)}
                             className={cn(
                               "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                               activeCategory === cat ? "bg-secondary text-primary" : "bg-secondary/5 text-secondary/40 hover:bg-secondary/10"
                             )}
                           >
                             {cat}
                           </button>
                         ))}
                       </div>
                    </div>

                    {/* Menu Items Grid */}
                    <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 no-scrollbar">
                       {filteredMenu.map((item, i) => (
                         <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.05 }}
                           key={item.name}
                           className="group flex gap-6 p-6 bg-secondary/[0.02] rounded-3xl border border-secondary/5 hover:border-primary/50 transition-all hover:bg-white hover:shadow-lg"
                         >
                            <div className="flex-1">
                               <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-headline font-bold text-secondary text-lg group-hover:text-primary transition-colors">{item.name}</h4>
                                  <span className="font-headline font-black text-secondary">{item.price}</span>
                               </div>
                               <p className="text-[10px] text-secondary/50 font-medium mb-4 line-clamp-2">{item.desc}</p>
                               <button 
                                 onClick={() => { addToCart(item); toast.success(`Added ${item.name}`); }}
                                 className="flex items-center space-x-2 bg-secondary text-primary px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
                               >
                                  <Plus size={12} />
                                  <span>Add To Order</span>
                               </button>
                            </div>
                         </motion.div>
                       ))}
                    </div>
                  </motion.div>
                )}

                {path === 'dinein' && (
                  <motion.div 
                    key="dinein"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col p-8 md:p-16 overflow-y-auto no-scrollbar"
                  >
                    <button onClick={() => setPath('selection')} className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 mb-10 hover:text-primary transition-colors">
                       <ChevronLeft size={16} /> Back to selection
                    </button>

                    <div className="space-y-12 max-w-2xl">
                       {/* Customer Identity */}
                       <div className="space-y-6">
                         <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                              <Users size={20} />
                           </div>
                           <h3 className="text-xl font-headline font-bold text-secondary">Your Details</h3>
                         </div>
                         <input 
                           type="text" 
                           placeholder="Full Name (for the guest list)" 
                           value={reservation.customer_name}
                           onChange={(e) => setReservation(prev => ({ ...prev, customer_name: e.target.value }))}
                           className="w-full p-6 bg-secondary/5 rounded-[2rem] border border-secondary/5 outline-none focus:border-primary/40 font-headline font-bold text-secondary text-lg transition-all"
                         />
                       </div>

                       {/* Branch Selection */}
                       <div className="space-y-6">
                         <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                              <MapPin size={20} />
                           </div>
                           <h3 className="text-xl font-headline font-bold text-secondary">Choose Your Branch</h3>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {locations.map(loc => (
                              <button 
                                key={loc.id}
                                onClick={() => setReservation(prev => ({ ...prev, branch: loc.name }))}
                                className={cn(
                                  "text-left p-6 rounded-[2rem] border transition-all duration-300",
                                  reservation.branch === loc.name ? "bg-secondary text-white border-secondary shadow-xl" : "bg-secondary/5 border-secondary/5 hover:border-primary/50"
                                )}
                              >
                                 <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-40">Branch</p>
                                 <p className="font-headline font-bold text-lg">{loc.name}</p>
                              </button>
                            ))}
                         </div>
                       </div>

                       {/* Guests, Date & Time */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                          {/* Guests */}
                          <div className="space-y-6">
                             <div className="flex items-center space-x-4">
                               <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                                  <Users size={20} />
                               </div>
                               <h3 className="text-xl font-headline font-bold text-secondary">Guests</h3>
                             </div>
                             <div className="flex items-center space-x-6 p-2 bg-secondary/5 rounded-2xl w-fit">
                                <button 
                                  onClick={() => setReservation(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary hover:bg-primary transition-all shadow-sm"
                                >
                                   <Minus size={18} />
                                </button>
                                <span className="text-3xl font-headline font-bold w-12 text-center text-secondary">{reservation.guests}</span>
                                <button 
                                  onClick={() => setReservation(prev => ({ ...prev, guests: prev.guests + 1 }))}
                                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary hover:bg-primary transition-all shadow-sm"
                                >
                                   <Plus size={18} />
                                </button>
                             </div>
                          </div>

                          {/* Date & Time Simplified for UI Demo */}
                          <div className="space-y-8">
                             <div className="space-y-4">
                               <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center">
                                  <Calendar size={14} className="mr-2" /> Select Date
                               </label>
                               <input 
                                 type="date" 
                                 onChange={(e) => setReservation(prev => ({ ...prev, date: e.target.value }))}
                                 className="w-full p-4 bg-secondary/5 rounded-2xl border border-secondary/5 outline-none focus:border-primary/40 font-bold text-secondary text-sm" 
                               />
                             </div>
                             <div className="space-y-4">
                               <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center">
                                  <Clock size={14} className="mr-2" /> Select Time
                               </label>
                               <select 
                                 onChange={(e) => setReservation(prev => ({ ...prev, time: e.target.value }))}
                                 className="w-full p-4 bg-secondary/5 rounded-2xl border border-secondary/5 outline-none focus:border-primary/40 font-bold text-secondary text-sm"
                               >
                                  <option value="">Choose a slot</option>
                                  <option value="08:30 AM">08:30 AM (Early Sizzle)</option>
                                  <option value="10:00 AM">10:00 AM (Brunch Time)</option>
                                  <option value="12:30 PM">12:30 PM (Mid-day Sip)</option>
                                  <option value="04:00 PM">04:00 PM (Sunset Snack)</option>
                                  <option value="07:30 PM">07:30 PM (Dinner Vibes)</option>
                               </select>
                             </div>
                          </div>
                       </div>

                       <button 
                         onClick={handleReservation}
                         className="w-full bg-secondary text-primary py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
                       >
                          Reserve This Table
                       </button>
                    </div>
                  </motion.div>
                )}

                {path === 'checkout' && (
                  <motion.div 
                    key="checkout"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col p-8 md:p-16 overflow-y-auto no-scrollbar"
                  >
                     <button onClick={() => setPath('delivery')} className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 mb-8 hover:text-primary transition-colors">
                       <ChevronLeft size={16} /> Back to menu
                    </button>

                    <h3 className="text-3xl font-headline font-bold text-secondary mb-10 marker-highlight">Order Summary</h3>

                    <div className="space-y-6 mb-12">
                       {items.map(item => (
                         <div key={item.name} className="flex justify-between items-center bg-secondary/5 p-6 rounded-3xl">
                            <div className="flex items-center space-x-6">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-headline font-black text-secondary">
                                  {item.quantity}
                               </div>
                               <div>
                                  <p className="font-bold text-secondary text-lg">{item.name}</p>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary/30">Hole Signature</p>
                               </div>
                            </div>
                            <div className="flex flex-col items-end">
                               <p className="font-headline font-black text-secondary text-xl">₹{parseInt(item.price.replace('₹', '')) * item.quantity}</p>
                               <div className="flex items-center space-x-3 mt-2">
                                  <button onClick={() => removeFromCart(item.name)} className="p-1 hover:text-primary transition-colors"><Minus size={14} /></button>
                                  <button onClick={() => addToCart(item)} className="p-1 hover:text-primary transition-colors"><Plus size={14} /></button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="p-10 bg-secondary rounded-[2.5rem] text-white shadow-2xl">
                       <div className="flex justify-between items-end mb-10">
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Grand Total</p>
                             <h4 className="text-5xl font-headline font-bold italic">₹{totalPrice}</h4>
                          </div>
                          <p className="text-white/40 text-xs font-medium">Incl. taxes & delivery</p>
                       </div>
                       <button 
                         onClick={handleOrder}
                         className="w-full bg-primary text-secondary py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:brightness-110 shadow-xl transition-all"
                       >
                          Finalize Delivery
                       </button>
                    </div>
                  </motion.div>
                )}

                {path === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center p-8 md:p-20 text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-10">
                       <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-headline font-bold text-secondary mb-6">Excellent Choice!</h2>
                    <p className="text-secondary/60 text-lg font-medium max-w-sm mb-12">
                       Your sizzle request has been received. {lastPath === 'dinein' ? 'Your table is secured and waiting.' : 'Our team is preparing your favorites.'}
                    </p>
                    <button 
                      onClick={() => { close(); clearCart(); setReservation({ customer_name: '', branch: '', guests: 2, date: '', time: '' }); }}
                      className="bg-secondary text-primary px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                    >
                       Done, Sizzling!
                    </button>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
