import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, PhoneCall } from 'lucide-react';
import { locations } from '../../data/locations';
import { SectionLabel } from '../ui/SectionLabel';
import { toast } from '../ui/Toast';

export const VisitSection = () => {

  const handleDirections = (locName: string, mapsUrl: string) => {
    toast.success(`Opening directions to ${locName}...`);
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = (locName: string, phone: string) => {
    toast.success(`Connecting you to ${locName}...`);
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  return (
    <section id="reservations" className="py-20 bg-surface px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel className="mx-auto">Our Locations</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight">
            Plan Your <span className="italic font-normal">Visit</span>
          </h2>
          <p className="text-on-surface-variant mt-6 max-w-xl mx-auto">
            We are primarily a walk-in establishment. Catch us early on weekends or visit our quieter brunches mid-week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface-container-low rounded-sm overflow-hidden border border-outline-variant/10 shadow-warm flex flex-col sm:flex-row h-full group paper-tear"
            >
              <div className="sm:w-2/5 relative overflow-hidden h-64 sm:h-auto">
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 p-8 flex flex-col">
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-6 group-hover:text-secondary transition-colors">
                  {loc.name}
                </h3>
                
                <div className="space-y-4 text-sm text-on-surface-variant mb-auto">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                    <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="hover:text-secondary transition-colors">{loc.phone}</a>
                  </div>
                </div>

                <div className="mt-10 flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDirections(loc.name, loc.mapsUrl)}
                    className="flex-1 bg-surface-container-highest text-on-surface text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCall(loc.name, loc.phone)}
                    className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer"
                    title={`Call ${loc.name}`}
                  >
                    <PhoneCall className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

