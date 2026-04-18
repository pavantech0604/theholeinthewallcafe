import { motion } from 'framer-motion';

export const SteamAnimation = () => {
  return (
    <div className="flex space-x-2 opacity-50">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: [-10, -40],
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.5, 2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
          className="w-1 h-3 bg-primary/40 rounded-full blur-[2px]"
        />
      ))}
    </div>
  );
};
