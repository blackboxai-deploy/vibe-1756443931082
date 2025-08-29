'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Cart, CartItem, CartContextType } from '@/types/cart';
import { STORAGE_KEYS, MAX_CART_ITEMS, MAX_ITEM_QUANTITY } from '@/lib/constants';

// Mock product data for development
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    images: [{ url: 'https://placehold.co/400x400?text=Premium+Wireless+Headphones', alt: 'Premium Wireless Headphones' }],
    inStock: true,
    sellerId: '2',
    sellerName: 'TechStore Pro'
  },
  {
    id: '2', 
    name: 'Smart Fitness Watch',
    price: 299.99,
    images: [{ url: 'https://placehold.co/400x400?text=Smart+Fitness+Watch', alt: 'Smart Fitness Watch' }],
    inStock: true,
    sellerId: '2',
    sellerName: 'TechStore Pro'
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } else {
          // Initialize empty cart
          const emptyCart: Cart = {
            id: 'guest-cart',
            items: [],
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
            updatedAt: new Date(),
          };
          setCart(emptyCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        // Initialize empty cart on error
        const emptyCart: Cart = {
          id: 'guest-cart',
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          updatedAt: new Date(),
        };
        setCart(emptyCart);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart && !isLoading) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const calculateTotals = (items: CartItem[]): Pick<Cart, 'subtotal' | 'tax' | 'shipping' | 'total'> => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  const updateCart = (updater: (current: Cart) => Cart) => {
    setCart(current => {
      if (!current) return current;
      const updated = updater(current);
      const totals = calculateTotals(updated.items);
      return {
        ...updated,
        ...totals,
        updatedAt: new Date(),
      };
    });
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!cart) return;

    if (cart.items.length >= MAX_CART_ITEMS) {
      console.error(`Cart is full. Maximum ${MAX_CART_ITEMS} items allowed.`);
      return;
    }

    // Find product (in real app, this would be an API call)
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      console.error('Product not found');
      return;
    }

    if (!product.inStock) {
      console.error('Product is out of stock');
      return;
    }

    updateCart(currentCart => {
      const existingItem = currentCart.items.find(item => item.productId === productId);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, MAX_ITEM_QUANTITY);
        return {
          ...currentCart,
          items: currentCart.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}`,
          productId,
          product,
          quantity: Math.min(quantity, MAX_ITEM_QUANTITY),
          addedAt: new Date(),
        };

        return {
          ...currentCart,
          items: [...currentCart.items, newItem],
        };
      }
    });

    console.log('Item added to cart!');
  };

  const removeFromCart = async (itemId: string) => {
    if (!cart) return;

    updateCart(currentCart => ({
      ...currentCart,
      items: currentCart.items.filter(item => item.id !== itemId),
    }));

    console.log('Item removed from cart');
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return;

    if (quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      console.error(`Quantity must be between 1 and ${MAX_ITEM_QUANTITY}`);
      return;
    }

    updateCart(currentCart => ({
      ...currentCart,
      items: currentCart.items.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ),
    }));
  };

  const clearCart = async () => {
    updateCart(currentCart => ({
      ...currentCart,
      items: [],
    }));

    console.log('Cart cleared');
  };

  const getCartTotal = (): number => {
    return cart?.total || 0;
  };

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}