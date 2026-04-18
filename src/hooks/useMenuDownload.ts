import { useState, useEffect } from 'react';

type Listener = (isOpen: boolean) => void;
let isOpenState = false;
const listeners: Set<Listener> = new Set();

const notify = () => listeners.forEach(l => l(isOpenState));

export const menuDownload = {
  open: () => { 
    isOpenState = true; 
    notify(); 
  },
  close: () => { 
    isOpenState = false; 
    notify(); 
  },
};

export const useMenuDownload = () => {
  const [isOpen, setIsOpen] = useState(isOpenState);

  useEffect(() => {
    const listener: Listener = (val) => setIsOpen(val);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { 
    isOpen, 
    open: menuDownload.open, 
    close: menuDownload.close 
  };
};
