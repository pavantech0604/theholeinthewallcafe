import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star, Filter, Package, ChevronDown, Coffee, Flame, Heart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { toast } from '../../components/ui/Toast';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category_id: string;
  tag: string;
  description: string;
  is_signature: boolean;
  is_available: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

const MenuManager: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: catData } = await supabase.from('categories').select('*').order('name');
      const { data: itemData } = await supabase.from('menu_items').select('*').order('name');
      
      console.log('Sanctum Sync: Fetched categories:', catData?.length);
      console.log('Sanctum Sync: Fetched items:', itemData?.length);
      
      setCategories(catData || []);
      setItems(itemData || []);
    } catch (err) {
      console.error('Operational Error: Menu Laboratory sync failed', err);
      toast.error('Laboratory synchronization failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id: string) => {
    if (!window.confirm('Purge this flavor from the inventory?')) return;
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) throw error;
      toast.success('Item purged from sanctuary.');
      fetchData();
    } catch (err) {
      toast.error('Deletion protocol failed.');
    }
  };

  const toggleSignature = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase.from('menu_items').update({ is_signature: !current }).eq('id', id);
      if (error) throw error;
      setItems(items.map(i => i.id === id ? { ...i, is_signature: !current } : i));
      toast.success('Signature status redefined.');
    } catch (err) {
      toast.error('Status update failed.');
    }
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || i.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Editorial Control Deck */}
      <div className="bg-white rounded-[3rem] p-10 border border-secondary/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col xl:flex-row xl:items-center justify-between gap-10">
        <div className="flex flex-wrap items-center gap-6 flex-1">
           <div className="relative group min-w-[320px] flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search the laboratory archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary/5 rounded-2xl py-5 pl-16 pr-8 text-sm font-bold text-secondary outline-none focus:border-primary/50 transition-all"
              />
           </div>
           
           <div className="relative bg-secondary/5 rounded-2xl flex items-center group">
              <div className="p-5 border-r border-black/5 text-secondary/30">
                 <Filter size={18} />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent pl-6 pr-12 py-5 text-[10px] font-black uppercase tracking-widest text-secondary outline-none appearance-none cursor-pointer"
              >
                 <option value="all">Full Inventory</option>
                 {categories.map(cat => (
                   <option key={cat.id} value={cat.id}>{cat.name}</option>
                 ))}
              </select>
              <ChevronDown size={14} className="absolute right-6 text-secondary/30 pointer-events-none" />
           </div>
        </div>

        <button className="flex items-center gap-4 bg-primary text-secondary px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 shadow-xl shrink-0">
           <Plus size={18} />
           <span>Add New Molecule</span>
        </button>
      </div>

      {/* Laboratory Gallery Grid */}
      {loading ? (
        <div className="p-24 text-center">
           <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8" />
           <p className="font-headline font-black text-2xl lowercase italic text-secondary/20 tracking-widest">Accessing records...</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
           <AnimatePresence mode="popLayout">
             {filteredItems.map((item, i) => (
               <motion.div
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ delay: i * 0.05, duration: 0.4 }}
                 key={item.id}
                 className={cn(
                   "group relative bg-white rounded-[3rem] p-8 border transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col",
                   item.is_signature ? "border-primary/30 shadow-lg shadow-primary/5" : "border-secondary/5"
                 )}
               >
                 {/* Visual Header */}
                 <div className="flex justify-between items-start mb-8">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner",
                      item.is_signature ? "bg-primary text-secondary" : "bg-secondary/5 text-secondary/30"
                    )}>
                       {item.category_id === '5' ? <Coffee size={24} /> : <Flame size={24} />}
                    </div>
                    {item.is_signature && (
                      <div className="px-4 py-1.5 bg-primary rounded-full text-[9px] font-black uppercase tracking-widest text-secondary shadow-lg shadow-primary/20 flex items-center gap-2">
                         <Heart size={10} fill="currentColor" />
                         <span>House Special</span>
                      </div>
                    )}
                 </div>

                 {/* Content */}
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary/20">{item.tag || 'Classic'}</span>
                       {item.is_signature && <div className="w-1 h-1 rounded-full bg-primary" />}
                    </div>
                    <h3 className="font-headline font-black text-2xl text-secondary lowercase italic leading-tight mb-4 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-xs text-secondary/40 font-medium leading-relaxed mb-8 line-clamp-3 italic">"{item.description}"</p>
                 </div>

                 {/* Price & Actions */}
                 <div className="pt-8 border-t border-secondary/5 flex items-end justify-between mt-auto">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-secondary/20 mb-1">Ritual Cost</p>
                       <p className="text-3xl font-headline font-black text-secondary tracking-tighter italic">{item.price}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="w-10 h-10 rounded-xl bg-secondary/5 text-secondary/20 hover:text-secondary hover:bg-secondary/10 transition-all flex items-center justify-center">
                          <Edit2 size={16} />
                       </button>
                       <button onClick={() => deleteItem(item.id)} className="w-10 h-10 rounded-xl bg-secondary/5 text-secondary/20 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center">
                          <Trash2 size={16} />
                       </button>
                    </div>
                 </div>

                 {/* Signature Toggle (Integrated) */}
                 <button 
                  onClick={() => toggleSignature(item.id, item.is_signature)}
                  className={cn(
                    "absolute -bottom-4 right-8 w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95",
                    item.is_signature ? "bg-primary text-secondary" : "bg-white text-secondary/20 hover:text-primary"
                  )}
                 >
                    <Star size={18} fill={item.is_signature ? "currentColor" : "none"} />
                 </button>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      ) : (
        <div className="p-32 text-center bg-secondary/5 rounded-[4rem] border-2 border-dashed border-secondary/10">
           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-secondary/10 mx-auto mb-8 shadow-inner">
              <Package size={32} />
           </div>
           <h4 className="font-headline font-black text-3xl lowercase italic text-secondary/20">The inventory is currently archived</h4>
           <p className="text-[10px] font-black uppercase tracking-widest text-secondary/30 mt-4 leading-relaxed max-w-xs mx-auto">No molecules matched your search queries within this laboratory module.</p>
        </div>
      )}

      {/* Protocol Guard */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-secondary text-primary px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-6 z-50 border border-white/10 backdrop-blur-xl bg-opacity-95">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
         <p className="text-[10px] font-black uppercase tracking-[0.3em] font-body">Sanctuary Sync Status: Active Protocol</p>
         <div className="h-4 w-px bg-white/10" />
         <button className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Mark Ritual Complete</button>
      </div>
    </div>
  );
};

export default MenuManager;
