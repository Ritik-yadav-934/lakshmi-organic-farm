import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cart shape: { [productId]: quantity }
  const [cart, setCart] = useState({});

  function changeQty(productId, delta) {
    setCart((prev) => {
      const next = { ...prev };
      const newQty = (next[productId] || 0) + delta;
      if (newQty <= 0) {
        delete next[productId];
      } else {
        next[productId] = newQty;
      }
      return next;
    });
  }

  function removeItem(productId) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  const itemCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const value = { cart, changeQty, removeItem, clearCart, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
