import { useState, useEffect } from 'react';
import type { MenuItem } from '../data/menu';

export interface CartItem extends MenuItem {
  quantity: number;
}

type Listener = (items: CartItem[]) => void;
let cartItems: CartItem[] = [];
const listeners: Set<Listener> = new Set();

const notify = () => listeners.forEach(l => l([...cartItems]));

export const cartStore = {
  add: (item: MenuItem) => {
    const existing = cartItems.find((i) => i.name === item.name);
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      cartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    notify();
  },
  remove: (itemName: string) => {
    cartItems = cartItems.map((i) =>
      i.name === itemName ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i
    ).filter((i) => i.quantity > 0);
    notify();
  },
  clear: () => {
    cartItems = [];
    notify();
  },
  getItems: () => [...cartItems]
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(cartItems);

  useEffect(() => {
    const listener: Listener = (newItems) => setItems(newItems);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => {
    const priceNum = parseInt(i.price.replace('₹', ''));
    return acc + priceNum * i.quantity;
  }, 0);

  return { 
    items, 
    addToCart: cartStore.add, 
    removeFromCart: cartStore.remove, 
    clearCart: cartStore.clear, 
    totalItems, 
    totalPrice 
  };
};
