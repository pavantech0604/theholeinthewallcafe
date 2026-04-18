import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { toast } from '../ui/Toast';

const reviews = [
  {
    name: "Aman Gupta",
    text: "The Biker's Meat Platter is a legendary Bengaluru breakfast. The vibe is so chill, it's worth every minute of the queue.",
    rating: 5,
    role: "Regular Bruncher"
  },
  {
    name: "Sneha Reddy",
    text: "Pancakes like no other! The Blueberry Cheesecake waffle is pure indulgence. My favorite weekend spot in Koramangala.",
    rating: 5,
    role: "Dessert Lover"
  },
  {
    name: "Rohan Malhotra",
    text: "Pet-friendly and extremely welcoming. The 'Dirty Burger' is succulent and satisfied all my cravings. 10/10.",
    rating: 5,
    role: "Burger Connoisseur"
  }
];

export const ReviewsSection = () => {
  return (
    <section className="py-20 bg-surface-container-low px-6 md:px-12 lg:px-24 border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <SectionLabel>Customer Love</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              What the <span className="italic font-normal">Neighborhood</span> <br />Says About Us
            </h2>
          </div>
          <div className="mt-8 md:mt-0 bg-white/50 backdrop-blur rounded-full px-6 py-3 border border-outline-variant/20 flex items-center space-x-3 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-200" />
              ))}
            </div>
            <span className="text-xs font-bold text-on-surface">4.8 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-editorial shadow-[0_20px_60px_rgba(74,30,30,0.06)] border border-secondary/5 relative overflow-hidden group hover:shadow-editorial transition-all duration-700"
            >
              <Quote className="absolute -top-6 -right-6 w-32 h-32 text-secondary opacity-[0.04] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-[1.5s]" />
              
              <div className="flex space-x-1.5 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-on-surface text-xl font-headline italic leading-[1.6] mb-10 relative z-10">
                "{review.text}"
              </p>
              
              <div className="flex items-center space-x-5 pt-6 border-t border-secondary/5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-secondary/10 flex items-center justify-center font-headline font-bold text-secondary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-base">{review.name}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.info("Loading 2,400+ more reviews from Google and Zomato...")}
            className="flex items-center space-x-4 bg-secondary text-primary px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:shadow-primary/20 transition-all"
          >
            <span>See All 2,400+ Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
