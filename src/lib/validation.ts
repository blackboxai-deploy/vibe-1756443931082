import { z } from 'zod';

// Auth validation schemas
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation is required'),
  role: z.enum(['customer', 'seller'], {
    required_error: 'Please select a role',
  }),
  businessName: z.string().optional(),
  businessAddress: z.string().optional(),
  businessPhone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === 'seller') {
    return data.businessName && data.businessName.length >= 2;
  }
  return true;
}, {
  message: 'Business name is required for sellers',
  path: ['businessName'],
});

// Product validation schemas
export const addProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  originalPrice: z.number().optional(),
  categoryId: z.string().min(1, 'Please select a category'),
  subcategory: z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be 0 or greater'),
  specifications: z.record(z.string()).default({}),
  features: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export const editProductSchema = addProductSchema.partial().extend({
  id: z.string().min(1, 'Product ID is required'),
});

// Address validation schema
export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

// Checkout validation schema
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsBilling: z.boolean().default(false),
  paymentMethod: z.object({
    type: z.enum(['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay']),
    cardNumber: z.string().optional(),
    expiryMonth: z.number().min(1).max(12).optional(),
    expiryYear: z.number().min(new Date().getFullYear()).optional(),
    cvv: z.string().optional(),
    cardHolderName: z.string().optional(),
  }),
});

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

// Search and filter validation
export const productFiltersSchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  brand: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional(),
  inStock: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(['price-low', 'price-high', 'rating', 'newest', 'best-selling']).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Contact/Support form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Cart item validation
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').default(1),
  selectedVariant: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

// Type exports for form data
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type AddProductFormData = z.infer<typeof addProductSchema>;
export type EditProductFormData = z.infer<typeof editProductSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ProductFiltersData = z.infer<typeof productFiltersSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type AddToCartFormData = z.infer<typeof addToCartSchema>;
export type UpdateCartItemFormData = z.infer<typeof updateCartItemSchema>;