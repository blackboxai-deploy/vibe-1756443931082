'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType, SignUpData } from '@/types/auth';
import { AuthService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await AuthService.signIn({ email, password });
      setUser(userData);
      console.log('Successfully signed in!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      console.error('Sign in error:', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: SignUpData) => {
    try {
      setIsLoading(true);
      const newUser = await AuthService.signUp(userData);
      setUser(newUser);
      console.log('Account created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      console.error('Sign up error:', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
      console.log('Successfully signed out!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign out failed';
      console.error('Sign out error:', message);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}