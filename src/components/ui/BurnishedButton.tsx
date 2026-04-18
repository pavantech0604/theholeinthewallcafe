import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface BurnishedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const BurnishedButton = ({ 
  variant = 'primary', 
  children, 
  className, 
  ...props 
}: BurnishedButtonProps) => {
  const variants = {
    primary: 'bg-primary text-secondary shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95',
    secondary: 'bg-secondary text-primary shadow-xl hover:bg-secondary/90 transition-colors',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all',
    ghost: 'text-secondary hover:bg-secondary/5 transition-all'
  };

  // Extract non-HTML props if needed, but here we just need to ensure 
  // we're not passing conflicting types to motion.button if possible.
  // The error is specifically about AnimationEventHandler vs AnimationDefinition.
  // We can just cast to any or be very explicit.

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300',
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
