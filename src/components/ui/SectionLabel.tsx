import { cn } from '../../lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel = ({ children, className }: SectionLabelProps) => {
  return (
    <span className={cn(
      'block text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-secondary mb-6',
      className
    )}>
      {children}
    </span>
  );
};
