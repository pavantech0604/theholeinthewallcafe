import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollTo = useCallback((id: string, offset = 100) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return scrollTo;
};
