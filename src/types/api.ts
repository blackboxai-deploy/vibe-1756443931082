export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

import type { Product } from './product';
import type { Order } from './cart';

export interface ProductsApiResponse extends PaginatedResponse<any> {
  data: Product[];
}

export interface OrdersApiResponse extends PaginatedResponse<any> {
  data: Order[];
}

// Re-export types for easier imports
export type { Product } from './product';
export type { Order, CartItem } from './cart';
export type { User } from './auth';