// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// App Configuration
export const APP_NAME = 'MarketPlace';
export const APP_DESCRIPTION = 'Your one-stop online marketplace for everything';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Product Configuration
export const MAX_PRODUCT_IMAGES = 8;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Cart Configuration
export const MAX_CART_ITEMS = 100;
export const MAX_ITEM_QUANTITY = 999;

// Order Status Configuration
export const ORDER_STATUS_LABELS = {
  pending: 'Order Pending',
  confirmed: 'Order Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: 'Payment Pending',
  paid: 'Payment Successful',
  failed: 'Payment Failed',
  refunded: 'Refunded',
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      'Smartphones & Tablets',
      'Laptops & Computers',
      'Audio & Headphones',
      'TV & Home Theater',
      'Gaming',
      'Cameras & Photography',
      'Smart Home',
      'Wearables',
    ],
  },
  {
    id: 'clothing',
    name: 'Clothing & Fashion',
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      'Shoes & Footwear',
      'Accessories',
      'Bags & Luggage',
      'Jewelry & Watches',
      'Activewear',
      "Kids' Clothing",
    ],
  },
  {
    id: 'home',
    name: 'Home & Garden',
    subcategories: [
      'Furniture',
      'Home Decor',
      'Kitchen & Dining',
      'Bedding & Bath',
      'Garden & Outdoor',
      'Tools & Hardware',
      'Lighting',
      'Storage & Organization',
    ],
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    subcategories: [
      'Skincare',
      'Makeup & Cosmetics',
      'Hair Care',
      'Health & Wellness',
      'Vitamins & Supplements',
      'Personal Care',
      'Fitness Equipment',
      'Medical Supplies',
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    subcategories: [
      'Exercise & Fitness',
      'Outdoor Recreation',
      'Sports Equipment',
      'Athletic Clothing',
      'Camping & Hiking',
      'Cycling',
      'Water Sports',
      'Winter Sports',
    ],
  },
  {
    id: 'books',
    name: 'Books & Media',
    subcategories: [
      'Books',
      'E-books',
      'Movies & TV Shows',
      'Music',
      'Video Games',
      'Magazines',
      'Educational Materials',
      'Art & Crafts',
    ],
  },
] as const;

// UI Configuration
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please sign in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SIGN_IN: 'Successfully signed in!',
  SIGN_UP: 'Account created successfully!',
  SIGN_OUT: 'Successfully signed out!',
  PRODUCT_ADDED: 'Product added successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!',
  CART_ADDED: 'Item added to cart!',
  CART_UPDATED: 'Cart updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  REVIEW_ADDED: 'Review submitted successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'marketplace_cart',
  WISHLIST: 'marketplace_wishlist',
  RECENT_SEARCHES: 'marketplace_recent_searches',
  USER_PREFERENCES: 'marketplace_preferences',
} as const;

// Feature Flags
export const FEATURES = {
  WISHLIST: true,
  REVIEWS: true,
  RECOMMENDATIONS: true,
  LIVE_CHAT: false,
  SOCIAL_LOGIN: false,
  MULTI_VENDOR: true,
  SUBSCRIPTION: false,
} as const;

// Rating Configuration
export const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
} as const;