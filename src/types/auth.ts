export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Seller extends User {
  role: 'seller';
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessDescription?: string;
  rating: number;
  totalSales: number;
  isVerified: boolean;
}

export interface Customer extends User {
  role: 'customer';
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'seller';
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}