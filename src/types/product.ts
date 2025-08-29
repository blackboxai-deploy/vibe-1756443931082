export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subcategory?: string;
  brand: string;
  images: ProductImage[];
  specifications: Record<string, string>;
  features: string[];
  inStock: boolean;
  stockQuantity: number;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  subcategories?: Category[];
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'best-selling';
  search?: string;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  filters: ProductFilters;
  suggestions?: string[];
}

export interface AddProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  subcategory?: string;
  brand: string;
  specifications: Record<string, string>;
  features: string[];
  stockQuantity: number;
  tags: string[];
  images: File[];
}