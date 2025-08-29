'use client';

import type { 
  ApiResponse, 
  PaginatedResponse, 
  RequestOptions 
} from '@/types/api';
import { API_BASE_URL } from './constants';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      params
    } = options;

    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, value);
        }
      });
    }

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Get auth token if available
    const token = this.getAuthToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
      
      // Remove Content-Type header for FormData (let browser set it)
      if (body instanceof FormData) {
        delete requestHeaders['Content-Type'];
      }
    }

    try {
      const response = await fetch(url.toString(), requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.code,
          errorData.details
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Auth endpoints
  async signIn(email: string, password: string): Promise<ApiResponse> {
    return this.makeRequest('/auth/signin', {
      method: 'POST',
      body: { email, password },
    });
  }

  async signUp(userData: any): Promise<ApiResponse> {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: userData,
    });
  }

  async signOut(): Promise<ApiResponse> {
    return this.makeRequest('/auth/signout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<ApiResponse> {
    return this.makeRequest('/auth/me');
  }

  // Product endpoints
  async getProducts(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest('/products', { params });
  }

  async getProduct(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/products/${id}`);
  }

  async searchProducts(query: string, filters?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest('/products/search', {
      params: { q: query, ...filters },
    });
  }

  async createProduct(productData: any): Promise<ApiResponse> {
    return this.makeRequest('/products', {
      method: 'POST',
      body: productData,
    });
  }

  async updateProduct(id: string, productData: any): Promise<ApiResponse> {
    return this.makeRequest(`/products/${id}`, {
      method: 'PUT',
      body: productData,
    });
  }

  async deleteProduct(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Category endpoints
  async getCategories(): Promise<ApiResponse> {
    return this.makeRequest('/products/categories');
  }

  // Cart endpoints
  async getCart(): Promise<ApiResponse> {
    return this.makeRequest('/cart');
  }

  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse> {
    return this.makeRequest('/cart', {
      method: 'POST',
      body: { productId, quantity },
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<ApiResponse> {
    return this.makeRequest(`/cart/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    });
  }

  async removeFromCart(itemId: string): Promise<ApiResponse> {
    return this.makeRequest(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<ApiResponse> {
    return this.makeRequest('/cart', {
      method: 'DELETE',
    });
  }

  // Order endpoints
  async getOrders(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest('/orders', { params });
  }

  async getOrder(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/orders/${id}`);
  }

  async createOrder(orderData: any): Promise<ApiResponse> {
    return this.makeRequest('/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<ApiResponse> {
    return this.makeRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
  }

  // Review endpoints
  async getReviews(productId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest(`/reviews`, {
      params: { productId, ...params },
    });
  }

  async createReview(reviewData: any): Promise<ApiResponse> {
    return this.makeRequest('/reviews', {
      method: 'POST',
      body: reviewData,
    });
  }

  // Seller endpoints
  async getSellerProducts(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest('/seller/products', { params });
  }

  async getSellerOrders(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
    return this.makeRequest('/seller/orders', { params });
  }

  async getSellerStats(): Promise<ApiResponse> {
    return this.makeRequest('/seller/stats');
  }

  // File upload endpoint
  async uploadFile(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/upload', {
      method: 'POST',
      body: formData,
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export async function handleApiError(error: unknown): Promise<string> {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}