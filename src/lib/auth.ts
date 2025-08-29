'use client';

import type { User, SignInData, SignUpData } from '@/types/auth';

// Mock user data for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'customer@demo.com',
    name: 'John Customer',
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'seller@demo.com',
    name: 'Jane Seller',
    role: 'seller',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'auth_user';

  static async signIn(credentials: SignInData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In a real app, you'd verify the password here
    const token = this.generateToken(user);
    
    this.setToken(token);
    this.setUser(user);
    
    return user;
  }

  static async signUp(userData: SignUpData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    MOCK_USERS.push(newUser);
    
    const token = this.generateToken(newUser);
    
    this.setToken(token);
    this.setUser(newUser);
    
    return newUser;
  }

  static async signOut(): Promise<void> {
    this.removeToken();
    this.removeUser();
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    const user = this.getStoredUser();
    
    if (!token || !user) {
      return null;
    }

    // In a real app, you'd validate the token with the server
    return user;
  }

  static async refreshToken(): Promise<string | null> {
    const user = this.getStoredUser();
    
    if (!user) {
      return null;
    }

    const newToken = this.generateToken(user);
    this.setToken(newToken);
    
    return newToken;
  }

  private static generateToken(user: User): string {
    // In a real app, this would be a proper JWT from your backend
    return btoa(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 24 * 60 * 60 * 1000 }));
  }

  private static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  private static setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  private static getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  private static removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getStoredUser();
  }

  static hasRole(role: User['role']): boolean {
    const user = this.getStoredUser();
    return user?.role === role;
  }
}