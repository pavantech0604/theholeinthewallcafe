import { useState, useEffect } from 'react';

export type ServicePath = 'selection' | 'delivery' | 'dinein' | 'checkout' | 'success';

type Listener = (state: ServiceState) => void;

interface ServiceState {
  isOpen: boolean;
  path: ServicePath;
}

let state: ServiceState = {
  isOpen: false,
  path: 'selection'
};

const listeners: Set<Listener> = new Set();
const notify = () => listeners.forEach(l => l({ ...state }));

export const serviceModal = {
  open: (initialPath: ServicePath = 'selection') => {
    state = { isOpen: true, path: initialPath };
    notify();
  },
  close: () => {
    state = { ...state, isOpen: false };
    notify();
  },
  setPath: (path: ServicePath) => {
    state = { ...state, path };
    notify();
  }
};

export const useServiceModal = () => {
  const [modalState, setModalState] = useState<ServiceState>(state);

  useEffect(() => {
    const listener: Listener = (val) => setModalState(val);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    ...modalState,
    open: serviceModal.open,
    close: serviceModal.close,
    setPath: serviceModal.setPath
  };
};
